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
    var ob = {
      current: defaultWork,
      getCurrent: getCurrent,
      setCurrent: setCurrent,
      setName: setName,
      setType: setType,
      setDescription: setDescription,
      setCompetitors: setCompetitors
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

    function setType(type) {
      ob.current.type = type;
    }

    function setDescription(description) {
      ob.current.description = description;
    }

    function setCompetitors(competitors) {
      ob.current.competitors = competitors;
    }

  }
})();
