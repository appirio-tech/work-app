(function () {
  'use strict';

  angular
    .module('ap-file-upload')
    .factory('UploaderService', UploaderService);

  UploaderService.$inject = ['$q', 'File', '$resource'];
  /* @ngInject */
  function UploaderService($q, File, $resource) {

    // This registry allows us to have multiple uploaders sharing this service
    // Each uploader should have a unique name
    var uploaderRegistry = {};

    function getUploader(name) {
      if (uploaderRegistry[name]) {
        return uploaderRegistry[name];
      } else {
        var uploader = new Uploader();
        uploaderRegistry[name] = uploader;
        return uploader;
      }
    }

    function Uploader() {
      this.files = [];
      this.uploading = false;
      this.hasErrors = false;
      this.hasFiles = false;
    }

    Uploader.prototype.onCaptionChange = function() { /* noop */ };

    Uploader.prototype.onUploadSuccess = function() { /* noop */ };

    Uploader.prototype.onFileRemoval = function() { /* noop */ };

    Uploader.prototype.config = function(options) {
      options = options || {};

      this.allowMultiple = options.allowMultiple || false;
      this.allowDuplicates = options.allowDuplicates || false;
      this.allowCaptions = options.allowCaptions || false;

      this.presign = options.presign || null;
      this.query = options.query || null;
      this.createRecord = options.createRecord || null;
      this.removeRecord = options.removeRecord || null;

      if (options.onCaptionChange) {
        this.onCaptionChange = options.onCaptionChange;
      }

      if (options.onUploadSuccess) {
        this.onUploadSuccess = options.onUploadSuccess;
      }

      if (options.onFileRemoval) {
        this.onFileRemoval = options.onFileRemoval;
      }

      if (options.presign) {
        this.presign.resource = $resource(options.presign.url);
      }

      if (options.query) {
        this.query.resource = $resource(options.query.url);
      }

      if (options.createRecord) {
        this.createRecord.resource = $resource(options.createRecord.url);
      }

      if (options.removeRecord) {
        this.removeRecord.resource = $resource(options.removeRecord.url);
      }
    };

    Uploader.prototype.populate = function() {
      this._populate();
    };

    Uploader.prototype.add = function(files, options) {
      var uploader = this;
      files = filelistToArray(files);

      // Fail if we're trying to add multiple files to a single upload
      if (files.length > 1 && uploader.allowMultiple === false) {
        deferred.reject('NOTMULTI');
      }

      return $q.all(files.map(function(file){
        return uploader._add(file, options);
      }));
    };

    Uploader.prototype.onUpdate = function() {
      var uploader = this;
      var uploading = false;
      var hasErrors = false;

      uploader.files.forEach(function(file) {
        if (file.uploading === true) {
          uploading = true;
        } else if (file.hasErrors === true) {
          hasErrors = true;
        }
      });
      uploader.uploading = uploading;
      uploader.hasErrors = hasErrors;
      uploader.hasFiles = uploader.files.length > 0
    };

    Uploader.prototype._add = function(fileData, options) {
      var deferred = $q.defer();
      var uploader = this;

      // TODO: Prompt user to confirm replacing file
      var replace = true;
      var dupePosition = uploader._indexOfFilename(fileData.name);
      var dupe = dupePosition >= 0;

      var newFile = uploader._newFile(fileData, options);

      if (dupe) {
        if (replace) {
          uploader.files[dupePosition].remove().then(function() {
            uploader.files[dupePosition] = newFile;
            uploader.onUpdate();
          });
        } else {
          deferred.reject('DUPE');
        }
      } else {
        if (uploader.allowMultiple) {
          uploader.files.push(newFile);
        } else {
          if (uploader.files[0]) {
            uploader.files[0].remove().then(function() {
              uploader.files[0] = newFile;
            });
          } else {
            uploader.files[0] = newFile;
          }
        }
      }

      if (newFile.newFile) {
        newFile.start();
      } else {
        uploader.onUpdate();
      }

      deferred.resolve();

      return deferred.promise;
    };

    Uploader.prototype._populate = function() {
      var uploader = this;
      var $promise = uploader.query.resource.get(uploader.query.params).$promise;

      $promise.then(function(data) {
        var files = data.result.content || [];

        files.forEach(function(file) {
          uploader._add({
            id: file.fileId,
            name: file.fileName,
            path: file.filePath,
            size: file.fileSize,
            type: file.fileType,
            url: file.preSignedURL
          }, {
            newFile: false,
          });
        });
      });
    };

    Uploader.prototype._newFile = function(file, options) {
      var uploader = this;
      options = options || {}

      options.presign = uploader.presign || null;
      options.query = uploader.query || null;
      options.createRecord = uploader.createRecord || null;
      options.removeRecord = uploader.removeRecord || null;
      options.allowCaptions = uploader.allowCaptions || false;

      file = new File(file, options);

      file.onStart = function(response) {
        uploader.onUpdate();
      };

      file.onProgress = function(response) {
        uploader.onUpdate();
      };

      file.onSuccess = function(response, filedata) {
        uploader.onUploadSuccess(filedata);
        uploader.onUpdate();
      };

      file.onFailure = function(response) {
        uploader.onUpdate();
      };

      file.onRemove = function(file) {
        uploader._remove(file);
      };

      file.onCaptionChange = function(fileData) {
        uploader.onCaptionChange(fileData)
        uploader.onUpdate();
      }

      return file;
    };

    Uploader.prototype._remove = function(file) {
      this.files.splice(this._indexOfFilename(file.data.name), 1);
      this.onFileRemoval(this._indexOfFilename(file.data.name))
      this.onUpdate();

      return $q.when(true);
    };

    Uploader.prototype._indexOfFilename = function(name) {
      var uploader = this;

      for (var i = 0; i < uploader.files.length; i++) {
        if (uploader.files[i].data.name === name) return i;
      }

      return -1;
    };

    function filelistToArray(collection) {
      var array = [];
      for (var i = 0; i < collection.length; i++) {
        array[i] = collection[i];
      }
      return array;
    }

    return {
      get: getUploader
    };

  }
})();
