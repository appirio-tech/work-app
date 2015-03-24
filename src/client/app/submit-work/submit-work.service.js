(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .factory('SubmitWorkService', SubmitWorkService);

  SubmitWorkService.$inject = ['$q', '$http', '$location', 'exception', 'logger', 'apiUrl'];
  /* @ngInject */
  function SubmitWorkService($q, $http, $location, exception, logger, apiUrl) {
    var defaultWork = {
      name: ''
    }
    var ob = {
      getCurrent: getCurrent,
      setCurrent: setCurrent,
      setName: setName,
      current: defaultWork
    };
    return ob;

    function getCurrent() {
      return ob.current;
    }

    function setCurrent(work) {
      ob.current = work;
      return ob.current;
    }

    function setName(name) {
      ob.current.name = name;
    }

  }
})();
