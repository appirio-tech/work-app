var proj;
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .factory('SubmitWorkService', SubmitWorkService);

  SubmitWorkService.$inject = ['$q', '$http', '$location', 'exception', 'logger', '$state'];
  /* @ngInject */
  function SubmitWorkService($q, $http, $location, exception, logger, $state) {
    var defaultWork = {
      name: '',
      type: false,
      description: '',
      competitors: []
    }
    var service = {
      current: defaultWork,
      getCurrent: getCurrent,
      setCurrent: setCurrent,
      next: next
    };
    return service;

    function getCurrent() {
      return proj = service.current;
    }

    function setCurrent(work) {
      service.current = work;
      return service.current;
    }

    function next(state) {
      return function() {
        $state.go(state);
      };
    }

  }
})();
