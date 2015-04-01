var work;
var serv;
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .factory('SubmitWorkService', SubmitWorkService);

  SubmitWorkService.$inject = ['exception', '$state', 'ApiResource', '$q', 'data'];
  /* @ngInject */
  function SubmitWorkService(exception, $state, ApiResource, $q, data) {
    var defaultWork = work = {
      name: '',
      type: false,
      usersDescription: '',
      elevatorPitch: '',
      competitors: [],
      features: []
    };

    var service = serv = {
      current: defaultWork,
      getCurrent: getCurrent,
      setCurrent: setCurrent,
      next: next,
      save: save
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
        throw e;
      });
    }
  }
})();
