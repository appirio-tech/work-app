(function () {
  'use strict';

  angular
    .module('app.user')
    .factory('UserService', UserService);

  UserService.$inject = ['$q', 'data', 'logger', 'TokenService'];
  /* @ngInject */
  function UserService($q, data, logger, TokenService) {
    var service = {
      getUser: null,
      user: null,
      removeUser: null,
      getCurrentUser: null,
      createUser: null
    };

    service.getCurrentUser = function() {
      var deferred = $q.defer();
      var decodedToken = TokenService.decodeToken();

      if (decodedToken.userId) {
        service.getUser(decodedToken.userId).then(function(data) {
          if (data && data.result) {
            deferred.resolve(data.result.content);
          } else {
            deferred.reject('API Issue');
          }
        });
      } else {
        deferred.reject('No User Id');
      }

      return deferred.promise;
    };

    service.removeUser = function() {
      service.user = null;
    };

    service.getUser = function(id) {
      var promise = data.get('user', {id: id});
      promise.then(getUserComplete);

      return promise;

      function getUserComplete(data) {
        service.user = data.result.content;
      }
    };

    /**
     * Create a User
     *
     * @param options
     *   array with the following properties:
     *   - handle
     *   - password
     *   - email
     *   - firstname
     *   - lastname
     *   - utmSource
     *   - utmMedium
     *   - utmCampaign
     */
    service.createUser = function(options) {
      var deferred = $q.defer();

      if (!options.handle || !options.email || !options.password) {
        deferred.reject('Required Fields not filled out');
      }

      var userData = {
        param: {
          handle: options.handle,
          email: options.email,
          utmSource: options.utmSource || 'asp',
          utmMedium: options.utmMedium || '',
          utmCampaign: options.utmCampaign || '',
          firstName: options.firstname,
          lastName: options.lastname,
          credential: {
            password: options.password
          }
        }
      };

      data.create('user', userData)
        .then(createUserCompleted, createUserError);

      function createUserCompleted(res) {
        logger.log('user created', res);
        deferred.resolve(res);
      }

      function createUserError(res) {
        logger.log('User Creation Error', res);
        deferred.reject(res.data.result.content);
      }

      return deferred.promise;
    };

    return service;
  }
})();
