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
        name: 'Email/Username Login',
        explanation: '',
        description: 'Login with an email or username',
        selected: false
      },
      {
        id: 'social-login',
        name: 'Social Login',
        explanation: '',
        description: 'Login with Twitter, Facebook, LinkedIn, or Google',
        selected: false
      },
      {
        id: 'profiles',
        name: 'Profiles',
        explanation: '',
        description: 'People can enter information about themselves',
        selected: false
      },
      {
        id: 'accept-payments',
        name: 'Accept Payments',
        explanation: '',
        description: 'Accept credit cards, PayPal, Bitcoin',
        selected: false
      },
      {
        id: 'ratings',
        name: 'Ratings/Reviews',
        explanation: '',
        description: 'People leave reviews and/or rate things',
        selected: false
      },
      {
        id: 'location',
        name: 'Location-based or Navigation Element',
        explanation: '',
        description: 'Location-based or Navigation Element',
        selected: false
      },
      {
        id: 'sharing',
        name: 'Sharing Functions',
        explanation: '',
        description: 'Share on Twitter, Facebook, Email',
        selected: false
      },
      {
        id: 'api',
        name: 'An API',
        explanation: '',
        description: 'Data can be connected with a website or other',
        selected: false
      },
      {id: 'search', name: 'Search', explanation: '', description: 'People can search/browse/filter', selected: false}
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
