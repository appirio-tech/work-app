(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .factory('SubmitWorkService', SubmitWorkService);

  SubmitWorkService.$inject = ['exception', '$state', 'ApiResource'];
  /* @ngInject */
  function SubmitWorkService(exception, $state, ApiResource) {
    var defaultWork = {
      name: '',
      type: false,
      usersDescription: '',
      competitors: [],
      features: []
    };

    var service = {
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

    function save(cb) {
      ApiResource.save('workRequest', service.current)
        .then(function(newWorkRequest) {
          service.setCurrent(newWorkRequest);
          cb(newWorkRequest);
        })
        .catch(function(e) {
          exception(e);
        });
    }
  }
})();
