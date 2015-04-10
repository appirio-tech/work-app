(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .factory('SubmitWorkService', SubmitWorkService);

  SubmitWorkService.$inject = ['$anchorScroll', '$q', '$location', 'data', '$state'];
  /* @ngInject */
  function SubmitWorkService($anchorScroll, $q, $location, data, $state) {
    var work = {
      name            : '',
      requestType     : false,
      usageDescription: '',
      summary         : '',
      competitorApps  : [],
      features        : [],
      costEstimate    : { low: 0 }
    };

    var service = {
      work: work,
      states: [
        { 'key': 'name' },
        { 'key': 'type' },
        { 'key': 'brief' },
        { 'key': 'competitors' },
        { 'key': 'users' },
        { 'key': 'features' },
        { 'key': 'designs' },
        { 'key': 'designs' }
      ],
      activeState        : null,
      getActiveStateIndex: getActiveStateIndex,
      setActiveState     : setActiveState,
      findState          : findState,
      setNextState       : setNextState,

      next: next,
      save: save,
      getPrice: getPrice,
      updatePrice: updatePrice,
      validateName: validateName,
      validateSummary: validateSummary,
      validateUsageDescription: validateUsageDescription,
      globalValidate: globalValidate
    };

    return service;

    function getActiveStateIndex () {
      var index = -1;

      angular.forEach(service.states, function(state, i) {
        if (state.key == service.activeState) {
          index = i;
        }
      });

      return index;
    }

    function setActiveState (key) {
      if (typeof key != 'string') {
        key = key.key;
      }

      service.activeState = key;
    }

    function findState (key) {
      var found;

      angular.forEach(service.states, function(state, i) {
        if (state.key == key) {
          found = state;
        }
      });

      return found;
    }

    function setNextState () {
      var activeIndex = getActiveStateIndex();
      var nextState = service.states[activeIndex + 1];

      setActiveState(nextState)

      save();
    }

    // NEED TO DELETE THIS
    function next(state) {
      return function() {
        save();
        $state.go(state);
      };
    }

    function save() {
      var promise = $q.defer();
      var work = angular.copy(service.work);
      work.features = work.features.filter(function(x) {
        return x.selected;
      }).map(function(x) {
        x.id = undefined;
        x.description = x.explanation;
        x.explanation = undefined;
        x.selected = undefined;
      });
      work.submitAttempted = undefined;
      data.create('work-request', work)
      .then(function(data) {
        service.id = data.result.content;
        updatePrice();
        promise.resolve(data);
      })
      .catch(function(e) {
        $q.reject(e);
      });
    }

    function getPrice() {
      if (work.requestType) {
        var calcPrice = work.features.reduce(function(x, y) {
          return y.selected ? x + 800 : x;
        }, 2000);
        if (work.costEstimate && work.costEstimate.low > calcPrice) {
          return work.costEstimate.low;
        } else {
          return calcPrice;
        }
      } else {
        return 0;
      }
    }

    function updatePrice() {
      data.get('work-request', {id: service.id}).then(function(data) {
        work.costEstimate = data.result.content.costEstimate;
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
        required: false
      };
      if (typeof usageDescription === 'undefined' || usageDescription.length === 0) {
        res.required = true;
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
