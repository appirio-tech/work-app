var proj;
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .factory('SubmitWorkService', SubmitWorkService);

  SubmitWorkService.$inject = ['$q', '$http', '$location', 'exception', 'logger', 'apiUrl', '$state'];
  /* @ngInject */
  function SubmitWorkService($q, $http, $location, exception, logger, apiUrl, $state) {
    var defaultWork = {
      name: '',
      type: false,
      description: '',
      competitors: [],
      features: [
        {name: "Email/Username Login", explanation: "", description: "Description"},
        {name: "Social Login", explanation: "", description: "Description"},
        {name: "Profiles", explanation: "", description: "Description"},
        {name: "Accept Payments", explanation: "", description: "Description"},
        {name: "Ratings/Reviews", explanation: "", description: "Description"},
        {name: "Location-based or Navigation Element", explanation: "", description: "Description"},
        {name: "Sharing Functions", explanation: "", description: "Description"},
        {name: "An API", explanation: "", description: "Description"},
        {name: "Search", explanation: "", description: "Description"}
      ]
    };
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
