/* jshint -W117, -W030 */
describe('User', function() {
  'use strict';

  var flush;

  beforeEach(function() {
    bard.inject(this, '$q', '$rootScope', 'UserService', 'ApiResource', 'data', 'TokenService');
    flush = function() { $rootScope.$apply(); };

    bard.mockService(ApiResource['user'], {
      get: $.when(mockUser.getResponse('UserRequest')),
      create: $.when(userCreate)
    });

    bard.mockService(data, {
      get: $.when(mockUser.getResponse('UserRequest')),
      create: $.when(userCreate)
    });
  });

  var userCreate = function(options) {
    var deferred = $q.defer();

    if (options.handle !== '1234' ||
      options.email !== 'person@address.com') {

      deferred.reject('ERROR IN CREATION');
    }
    else {
      deferred.resolve('success');
    }

    return deferred.promise;
  };

  bard.verifyNoOutstandingHttpRequests();

  describe('User Service', function() {
    it('should be created successfully', function() {
      expect(UserService).to.be.defined;
      expect(ApiResource['user']).to.be.defined;
    });

    it('should remove a user', function() {
      UserService.removeUser();

      expect(UserService.user).to.be.null;
    });

    it('should get the current user', function() {
      sinon.stub(TokenService, 'decodeToken').returns({userId: 40135392});
      var promise = UserService.getCurrentUser();

      promise.then(function(userObject) {
        expect(userObject).to.be.eql(mockUser.getMockUserRequest());
      });

      flush();
    });

    it('should error out with no user id getting current user', function() {
      sinon.stub(TokenService, 'decodeToken').returns({});

      var promise = UserService.getCurrentUser();

      promise.then(null, function(reason) {
        expect(reason).to.be.eq('No User Id');
      });

      flush();
    });

    it('should get a User', function() {
      $q.when(UserService.getUser(40135392).then(function(res) {
        expect(UserService.user).to.be.eql(mockUser.getMockUserRequest());
        expect(res).to.be.eql(mockUser.getResponse('UserRequest'));
      }));

      flush();
    });

    it('should create a User', function() {
      var options = {
        handle: '1234',
        email: 'person@address.com'
      };

      $q.when(UserService.createUser(options)).then(function(res) {
        expect(res).to.be.eq('success');
      });

      flush();
    });

    it('should handle user creation errors', function() {
      var options = {
        handle: '1234',
        email: 'WRONG'
      };
      var promise = UserService.createUser(options);

      promise.then(null, function(res) {
        expect(res).to.be.eq('Required Fields not filled out');
      });

      flush();
    });
  });
});
