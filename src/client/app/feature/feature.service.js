(function () {
  'use strict';

  angular
    .module('app.feature')
    .factory('FeatureService', FeatureService);

  FeatureService.$inject = ['$q'];
  /* @ngInject */
  function FeatureService($q) {
    var features = [
      {
        id: 'login',
        name: 'Login',
        explanation: '',
        description: 'Users can login / register for your app',
        selected: false
      },
      {
        id: 'social-login',
        name: 'Social',
        explanation: '',
        description: 'Users can see data from social networks (FB, Twitter etc.) in your app',
        selected: false
      },
      {
        id: 'profiles',
        name: 'Profiles',
        explanation: '',
        description: 'Users can create profiles with personal info',
        selected: false
      },
      {
        id: 'map',
        name: 'Map',
        explanation: '',
        description: 'A map with a user\'s GPS location that helps them get to places',
        selected: false
      },
      {
        id: 'forms',
        name: 'Forms',
        explanation: '',
        description: 'Users send specific information to you via forms ',
        selected: false
      },
      {
        id: 'listing',
        name: 'Listing',
        explanation: '',
        description: 'Display list of products, images, items that the user can browse or search through',
        selected: false
      }
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
