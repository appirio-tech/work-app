(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .factory('SubmitWorkService', SubmitWorkService);

  SubmitWorkService.$inject = ['$anchorScroll', '$q', '$location', 'data', '$state'];
  /* @ngInject */
  function SubmitWorkService($anchorScroll, $q, $location, data, $state) {
    // local used by "save" function
    var created = false;

    var service = {
      work           : {},
      completed      : {},
      states         : [],
      activeState    : null,
      setActiveState : setActiveState,
      findState      : findState,
      setNextState   : setNextState,
      save           : save,
      getEstimate    : getEstimate
    };

    service.work = {
      name             : null,
      requestType      : null,
      usageDescription : null,
      summary          : null,
      competitorApps   : [],
      features         : [],
      costEstimate     : { low: 0, high: 0 },
      acceptedTerms    : false
    };

    // these are all the fields we'll actually submit on
    // a POST or PUT. everything else is filtered.
    var requiredFields = [
      'name',
      'requestType',
      'usageDescription',
      'summary',
      'competitorApps',
      'features'
    ];

    service.completed = {
      aboutProject : false,
      users        : false,
      features     : false,
      design       : false,
      launch       : false
    };

    service.states = [
      { 'key': 'name' },
      { 'key': 'type' },
      { 'key': 'brief' },
      { 'key': 'competitors' },
      { 'key': 'users' },
      { 'key': 'features' },
      { 'key': 'designs' },
      { 'key': 'estimate' }
    ];


    function setCompleted () {
      var aboutProjectStates = ['name', 'type', 'brief', 'competitors'];

      service.completed.aboutProject = true;

      angular.forEach(aboutProjectStates, function (aboutProjectState, i) {
        var state = findState(aboutProjectState);

        service.completed.aboutProject = service.completed.aboutProject && state.form.$valid && state.visited;
      });

      service.completed.aboutProject = service.completed.aboutProject && findState('users').visited;
      service.completed.users        = findState('users').form.$valid && findState('features').visited;
      service.completed.features     = findState('features').form.$valid && findState('designs').visited;
      service.completed.design       = findState('designs').form.$valid && findState('estimate').visited;
      service.completed.launch       = findState('estimate').form.$valid;
    }

    function getActiveStateIndex () {
      var index = 0;

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

      findState(key).visited = true;

      setCompleted();

      save();
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

      setActiveState(nextState);

      return service.activeState;
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

      // delete all non-required fields before doing a POST or PUT
      for (var key in work) {
        if (requiredFields.indexOf(key) < 0) {
          delete work[key];
        }
      }

      if (!created) {
        data.create('work-request', work).then(function(data) {
          created = true;
          service.id = data.result.content;
          savePrice();
          promise.resolve(data);
        }).catch(function(e) {
          $q.reject(e);
        });
      } else {
        work.id = service.id;
        data.update('work-request', work).then(function(data) {
          // do nothing
        }).catch(function(e) {
          $q.reject(e);
        });
      }
    }

    function getEstimate() {
      var work = service.work;
      if (work.requestType) {
        // this is a calculation of the estimate
        var estimate = work.features.reduce(function(x, y) {
          if (y.selected) {
            x.low += 800;
            x.high += 1200;
          }
          return x;
        }, {low: 2000, high: 2000});
        if (work.costEstimate && work.costEstimate.low > estimate.low) {
          return work.costEstimate;
        } else {
          return estimate;
        }
      } else {
        return {low: 0, high: 0};
      }
    }

    function savePrice() {
      data.get('work-request', {id: service.id}).then(function(data) {
        service.work.costEstimate = data.result.content.costEstimate;
      });
    }

    return service;

  }
})();
