/* jshint -W117, -W030 */
describe('LoginController', function () {
  var controller, scope, flush;

  beforeEach(function () {
    bard.inject(this, '$q', '$controller', '$rootScope', 'AuthService', 'data', 'auth', '$location', '$state');
    flush = function() { $rootScope.$apply(); };

    bard.mockService(data, {
      get: $q.when(mockAuthRequest.getAuth()),
      create: $q.when(mockAuthRequest.getAuth()),
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
      var wrongAuth;
      var rightAuth;

      function login(authVars) {
        controller.username = authVars.username;
        controller.password = authVars.password;
        controller.submit();
      }

      beforeEach(function() {
        wrongAuth = {
          username: '1234',
          password: '12345'
        };

        rightAuth = {
          username: '1234',
          password: '1234'
        };
      });

      it('should be able to login with the correct credentials', function() {
        login(rightAuth);

        expect(controller.error).to.not.be.ok;

        flush();
      });

      it('should be an error with incorrect credentials', function() {

        login(wrongAuth);

        expect(controller.error).to.be.ok;
        flush();
      });

      it('should redirect to default state on login', function() {

        sinon.spy($state, 'go');

        login(rightAuth);

        expect($state.go).to.have.been.calledWith('view-work-multiple');
        flush();
      });

      it('should redirect to retState on login', function() {
        sinon.stub($location, 'search').returns({retState: 'home'});
        sinon.stub($state, 'go');

        login(rightAuth);

        expect($state.go).to.have.been.calledWith('home');
        flush();
      });

      it('should redirect to retUrl on login', function() {
        sinon.stub($location, 'search').returns({retUrl: 'http://google.com'});
        sinon.spy($location, 'path');

        login(rightAuth);

        expect($location.path).to.have.been.calledWith('http://google.com');
        flush();
      });

      it('should returnt to the last state on login', function() {
        sinon.stub($location, 'search').returns({});

        $rootScope.preAuthState = 'view-work-multiple';
        sinon.spy($state, 'go');

        login(rightAuth);

        expect($state.go).to.have.been.calledWith('view-work-multiple');
        flush();
      });
    })
  });
});
