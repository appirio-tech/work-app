(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .factory('SubmitWorkService', SubmitWorkService);

  SubmitWorkService.$inject = ['$anchorScroll', '$q', '$location', 'data', '$state'];
  /* @ngInject */
  function SubmitWorkService($anchorScroll, $q, $location, data, $state) {
    var work = {
      name: '',
      requestType: false,
      usageDescription: '',
      summary: '',
      competitorApps: [],
      features: []
    };

    var service = {
      current: work,
      getCurrent: getCurrent,
      setCurrent: setCurrent,
      next: next,
      save: save,
      validateName: validateName,
      validateSummary: validateSummary,
      validateUsageDescription: validateUsageDescription,
      globalValidate: globalValidate
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
        save();
        $state.go(state);
      };
    }

    function save() {
      var promise = $q.defer();
      service.current.features = service.current.features.filter(function(x) {
        return x.selected;
      });
      service.current.submitAttempted = undefined;
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
        minlength: false,
        letter: false,
        required: false
      };
      if (typeof name === 'undefined' || name.length === 0) {
        res.required = true;
      } else if (name.length < 3) {
        res.minlength = true;
      } else if (!name.charAt(0).match(/[\w\d]/)) {
        res.letter = true;
      } else {
        res.valid = true;
      }
      return res;
    }

    function validateSummary(summary) {
      var res = {
        valid: false,
        minlength: false,
        required: false
      };
      if (typeof summary === 'undefined' || summary.length === 0) {
        res.required = true;
      } else if (summary.length < 200) {
        res.minlength = true;
      } else {
        res.valid = true;
      }
      return res;
    }

    function validateUsageDescription(usageDescription) {
      var res = {
        valid: false,
        minlength: false,
        required: false
      };
      if (typeof usageDescription === 'undefined' || usageDescription.length === 0) {
        res.required = true;
      } else if (usageDescription.length < 200) {
        res.minlength = true;
      } else {
        res.valid = true;
      }
      return res;
    }

    function globalValidate() {
      var name = validateName(work.name).valid;
      var summary = validateSummary(work.summary).valid;
      var usageDescription = validateUsageDescription(work.usageDescription).valid;
      var res = {
        name: name,
        summary: summary,
        usageDescription: usageDescription,
        valid: name && summary && usageDescription
      };
      work.submitAttempted = true;
      return res;
    }
  }
})();
