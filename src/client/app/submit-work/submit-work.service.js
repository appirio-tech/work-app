var proj;
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .factory('SubmitWorkService', SubmitWorkService);

  SubmitWorkService.$inject = ['$q', '$http', '$location', 'exception', 'logger', 'apiUrl'];
  /* @ngInject */
  function SubmitWorkService($q, $http, $location, exception, logger, apiUrl) {
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
    };
    return service;

    function getCurrent() {
      return proj = service.current;
    }

    function setCurrent(work) {
      service.current = work;
      return service.current;
    }

  }
})();
