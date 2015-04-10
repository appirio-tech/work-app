(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .factory('SubmitWorkService', SubmitWorkService);

  SubmitWorkService.$inject = ['$anchorScroll', '$q', '$location', 'data', '$state'];
  /* @ngInject */
  function SubmitWorkService($anchorScroll, $q, $location, data, $state) {
    var work = {
      name            : null,
      requestType     : null,
      price           : null,
      usageDescription: null,
      elevator        : null,
      competitorApps  : [],
      features        : [],
      costEstimate    : { low: 0 },
      acceptedTerms   : false
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
        { 'key': 'estimate' }
      ],
      activeState   : null,
      setActiveState: setActiveState,
      findState     : findState,
      setNextState  : setNextState,
      updatePrice   : updatePrice,
      save          : save,
    };

    return service;

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
    }

    function updatePrice() {
      service.work.price = '$' + getPrice();
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

      work.submitAttempted = undefined;

      data.create('work-request', work).then(function(data) {
        service.id = data.result.content;
        savePrice();
        promise.resolve(data);
      }).catch(function(e) {
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

    function savePrice() {
      data.get('work-request', {id: service.id}).then(function(data) {
        work.costEstimate = data.result.content.costEstimate;
      });
    }
  }
})();
