(function () {
  'use strict';

  angular
    .module('app.feature')
    .factory('FeatureService', FeatureService);

  FeatureService.$inject = ['$q'];
  /* @ngInject */
  function FeatureService($q) {
    var features= [
      {name: "Email/Username Login", explanation: "", description: "Description"},
      {name: "Social Login", explanation: "", description: "Description"},
      {name: "Profiles", explanation: "", description: "Description"},
      {name: "Accept Payments", explanation: "", description: "Description"},
      {name: "Ratings/Reviews", explanation: "", description: "Description"},
      {name: "Location-based or Navigation Element", explanation: "", description: "Description"},
      {name: "Sharing Functions", explanation: "", description: "Description"},
      {name: "An API", explanation: "", description: "Description"},
      {name: "Search", explanation: "", description: "Description"}
    ];

    var service = {
      getFeatures: getFeatures
    };

    return service;

    function getFeatures() {
      var deferred = $q.defer();

      _getFeatures(deferred);

      return deferred.promise;
    }

    function _getFeatures(deferred) {
      deferred.resolve(features);
    }
  }
})();
