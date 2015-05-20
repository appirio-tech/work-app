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
      promise.catch(userError);

      return promise;

      function getUserComplete(data) {
        service.user = data.result.content;
      }

      function userError(error) {
        logger.log(error);
      }
    };

    /**
     * Create a User
     *
     * @param data
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
    service.createUser = function(data) {
      var deferred = $q.defer();

      if (!data.handle || !data.email || !data.password) {
        deferred.reject('Required Fields not filled out');
      }

      var userData = {
        param: {
          handle: data.handle,
          email: data.email,
          utmSource: data.utmSource || 'asp',
          utmMedium: data.utmMedium || '',
          utmCampaign: data.utmCampaign || '',
          firstName: data.firstname,
          lastName: data.lastname,
          credential: {
            password: data.password
          }
        }
      };

      data.create('user', userData)
        .then(createUserCompleted)
        .catch(createError);

      function createUserCompleted(data) {
        if (data && data.result && data.result.state === 200) {
          logger.log('user created', data);
          deferred.resolve(data.result.content);
        } else {
          logger.error('User Creation Error', data.result.content);
          deferred.reject(data.result.content);
        }
      }

      function createError(error) {
        logger.log(error);
      }

      return deferred.promise;
    };

    return service;
  }
})();
