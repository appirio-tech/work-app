(function () {
  'use strict';

  angular
    .module('ap-file-upload')
    .factory('File', File);

  File.$inject = ['$q', '$http'];

  function File($q, $http) {

    function File(data, options) {
      var file = this;
      options = angular.copy(options);

      file.data = data;
      file.newFile = options.newFile !== false;
      file.locked = options.locked || false;
      file.allowCaptions = options.allowCaptions || false;
      file.isImage = data.type.match('image.*');

      file.presign = options.presign || null;
      file.query = options.query || null;
      file.createRecord = options.createRecord || null;
      file.removeRecord = options.removeRecord || null;


      if (file.newFile) {
        if (file.isImage) {
          getDataUrl(data).then(function(src) {
            file.data.src = src;
          })
        }
      } else {
        file.uploading = false;
        file.hasErrors = false;
      }

      return file;
    }

    //
    // Public methods
    //

    File.prototype.start = function() {
      this._upload();
    };

    File.prototype.retry = function() {
      this._upload();
    };

    File.prototype.cancel = function() {
      if (this._xhr) {
        this._xhr.abort();
      }

      this.onRemove(this);
    };

    File.prototype.remove = function() {
      var file = this;
      var $promise = file._deleteFileRecord();

      return $promise.then(function(){
        file.onRemove(file);
      });
    };

    File.prototype.setCaption = function(caption) {
      var file = this;

      file.data.caption = caption;

      file.onCaptionChange({
        caption: file.data.caption,
        id:   file.data.id,
        name: file.data.name,
        path: file.data.path,
        size: file.data.size,
        type: file.data.type
      });
    };

    File.prototype.onStart = function() { /* noop */ };
    File.prototype.onRemove = function() { /* noop */ };
    File.prototype.onProgress = function() { /* noop */ };
    File.prototype.onSuccess = function() { /* noop */ };
    File.prototype.onFailure = function() { /* noop */ };
    File.prototype.onCaptionChange = function() { /* noop */ };

    //
    // Private methods
    //

    File.prototype._upload = function() {
      var file = this;

      file.uploading = true;
      file.hasErrors = false;
      file.progress = 0;

      file.onStart();

      file._getPresignedUrl()
        .then(transformResponse)
        .then(storeFilePath.bind(file))
        .then(storeFileId.bind(file))
        .then(storePresignedUrl.bind(file))
        .then(uploadToS3.bind(file))
        .then(checkSuccessCode.bind(file))
        .then(transformXhrResponse.bind(file))
        .then(createFileRecord.bind(file))
        .then(fileRecordSuccess.bind(file))
        .catch(function(err) {
          file._failed(err);
        });
    };

    File.prototype._deleteFileRecord = function() {
      var params = this.removeRecord.params || {};
      params.fileId = this.data.id;

      return this.removeRecord.resource.delete(params).$promise;
    };

    File.prototype._getPresignedUrl = function() {
      var params = {
        param: this.presign.params || {}
      };

      params.param.fileName = this.data.name;
      params.param.fileType = this.data.type;
      params.param.fileSize = this.data.size;

      return this.presign.resource.save(params).$promise;
    };

    File.prototype._onProgress = function(e) {
      var progress = Math.round(e.lengthComputable ? e.loaded * 100 / e.total : 0);
      this.onProgress(progress);
    };

    File.prototype._failed = function(err) {
      var file = this;
      file.hasErrors = true;
      file.uploading = false;
      file.onFailure(err);
    };

    //
    // Helper methods
    //

    function transformResponse(response) {
      return response.result.content;
    }

    function storeFilePath(content) {
      var file = this;

      file.data.path = content.filePath;
      return content;
    }

    function storeFileId(content) {
      var file = this;

      if (!file.createRecord) {
        file.data.id = content.fileId;
      }

      return content;
    }

    function storePresignedUrl(content) {
      var deferred = $q.defer();
      var preSignedURL = content.preSignedURL;

      if (preSignedURL) {
        this.preSignedURL = preSignedURL;
        deferred.resolve()
      } else {
        deferred.reject('Response from presigned URL request had no presigned URL');
      }

      return deferred.promise;
    }

    function uploadToS3() {
      var file = this;
      var deferred = $q.defer();
      var xhr = file._xhr = new XMLHttpRequest();

      xhr.upload.onprogress = file._onProgress.bind(file);

      xhr.onload = function() {
        deferred.resolve();
      };

      xhr.onerror = function() {
        deferred.reject();
      };

      xhr.open('PUT', file.preSignedURL, true);
      xhr.setRequestHeader('Content-Type', file.data.type);
      xhr.send(file.data);

      return deferred.promise;
    }

    function checkSuccessCode() {
      var deferred = $q.defer();
      var status = this._xhr.status;

      if ((status >= 200 && status < 300) || status === 304) {
        deferred.resolve()
      } else {
        deferred.reject('File upload to S3 failed: ' + status);
      }

      return deferred.promise;
    }

    function transformXhrResponse() {
      var xhr = this._xhr;
      var headers = parseHeaders(xhr.getAllResponseHeaders());
      var response = xhr.response;
      var headersGetter = makeHeadersGetter(headers);

      angular.forEach($http.defaults.transformResponse, function(transformFn) {
        response = transformFn(response, headersGetter);
      });

      return response;
    }

    function createFileRecord() {
      if (this.createRecord) {
        var params = {
          param: this.createRecord.params || {}
        };

        params.param.fileName = this.data.name;
        params.param.filePath = this.data.path;
        params.param.fileType = this.data.type;
        params.param.fileSize = this.data.size;

        return this.createRecord.resource.save(params).$promise;
      } else {
        return this.data;
      }
    }

    function fileRecordSuccess(response) {
      var file = this;

      if (response.result) {
        file.data.id = response.result.content.fileId;
      } else {
        file.data.id = response.id
      }

      var filedata = {
        id: file.data.id,
        name: file.data.name,
        path: file.data.path,
        size: file.data.size,
        type: file.data.type
      }

      file.hasErrors = false;
      file.uploading = false;
      file.onSuccess(response, filedata);
    }

    function parseHeaders(headers) {
      var parsed = {}, key, val, i;

      if (!headers) return parsed;

      angular.forEach(headers.split('\n'), function(line) {
        i = line.indexOf(':');
        key = line.slice(0, i).trim().toLowerCase();
        val = line.slice(i + 1).trim();

        if (key) {
          parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
      });

      return parsed;
    }

    function makeHeadersGetter(parsedHeaders) {
      return function(name) {
        if (name) {
          return parsedHeaders[name.toLowerCase()] || null;
        }
        return parsedHeaders;
      };
    }

    function getDataUrl(fileData) {
      var deferred = $q.defer();
      var reader   = new FileReader();

      reader.onload = function(){
        deferred.resolve(reader.result);
      };

      reader.onerror = function() {
        deferred.reject();
      }

      reader.readAsDataURL(fileData);

      return deferred.promise;
    }

    return File;

  }
})();
