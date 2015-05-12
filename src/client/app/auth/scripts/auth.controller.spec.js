/* jshint -W117, -W030 */
describe('LoginController', function () {
  var controller, scope, flush;

  beforeEach(function () {
    bard.inject(this, '$q', '$controller', '$rootScope', 'AuthService', 'data', 'auth', '$location');
    flush = function() { $rootScope.$apply(); };

    bard.mockService(data, {
      get: $.when(mockAuthRequest.getAuth()),
      create: $.when(mockAuthRequest.getAuth()),
      remove: $q.when([])
    });

    bard.mockService(AuthService, {
      login: mockAuthRequest.login
    });

    scope = $rootScope.$new();
    controller = $controller('LoginController', {$scope: scope});
    flush();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Login controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    describe('after activate', function () {
      it('should have title of Login', function () {
        expect(controller.title).to.equal('Login');
      });
    });

    describe('Logged In', function() {
      it('should be able to login with the correct credentials', function() {
        controller.username = '1234';
        controller.password = '1234';
        controller.submit();

        expect(controller.error).to.not.be.ok;

        flush();
      });

      it('should be an error with incorrect credentials', function() {
        controller.username = '1234';
        controller.password = '12345';
        controller.submit();

        expect(controller.error).to.be.ok;
        expect(AuthService.isAuthenticated()).to.not.be.ok;
        flush();
      });
    })
  });
});
