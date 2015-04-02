(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .factory('SubmitWorkService', SubmitWorkService);

  SubmitWorkService.$inject = ['exception', '$state', 'ApiResource', '$q', 'data'];
  /* @ngInject */
  function SubmitWorkService(exception, $state, ApiResource, $q, data) {
    var defaultWork = {
      name: '',
      requestType: false,
      usageDescription: '',
      summary: '',
      competitorApps: [],
      features: []
    };

    var service = {
      current: defaultWork,
      getCurrent: getCurrent,
      setCurrent: setCurrent,
      next: next,
      save: save,
      validateName: validateName,
      validateSummary: validateSummary,
      validateUsageDescription: validateUsageDescription
    };

    return service;

    function getCurrent() {
      return service.current;
    }

    function setCurrent(workRequest) {
      service.current = workRequest;
      return service.current;
    }

    function next(state) {
      return function() {
        $state.go(state);
      };
    }

    function save() {
      var promise = $q.defer();
      service.current.features = service.current.features.filter(function(x) {
        return x.selected;
      });
      data.create('work-request', service.current)
      .then(function(newWorkRequest) {
        service.setCurrent(newWorkRequest);
        promise.resolve(newWorkRequest);
      })
      .catch(function(e) {
        $q.reject(e);
      });
    }

    function validateName(name) {
      var res = {
        valid: false,
        reason: ''
      };
      if (name.length < 3) {
        res.reason = 'minlength';
      } else if (name.charAt(0).match(/\d/)) {
        res.reason = 'letter';
      } else {
        res.valid = true;
      }
      return res;
    }

    function validateSummary(summary) {
      var res = {
        valid: false,
        reason: ''
      };
      if (summary.length < 200) {
        res.reason = 'minlength';
      } else {
        res.valid = true;
      }
      return res;
    }
  }

  function validateUsageDescription(usageDescription) {
    var res = {
      valid: false,
      reason: ''
    };
    if (usageDescription.length < 200) {
      res.reason = 'minlength';
    } else {
      res.valid = true;
    }
    return res;
  }
})();
