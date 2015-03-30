(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .factory('SubmitWorkService', SubmitWorkService);

  SubmitWorkService.$inject = ['$q', '$http', '$location', 'exception', 'logger', '$state', 'ApiResource'];
  /* @ngInject */
  function SubmitWorkService($q, $http, $location, exception, logger, $state, ApiResource) {
    var defaultWork = {
      name: '',
      type: false,
      usersDescription: '',
      elevatorPitch: '',
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
