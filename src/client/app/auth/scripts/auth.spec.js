/* jshint -W117, -W030 */
describe('Auth', function() {
  'use strict';

  var flush;
  var LoginController

  beforeEach(function() {
    bard.inject(this, '$q', '$rootScope', 'ApiResource', 'jwtHelper', 'TokenService', 'auth0TokenName', 'AuthService', 'auth', '$controller', '$rootScope');
    flush = function() { $rootScope.$apply(); };
  });

  beforeEach(function() {
    bard.mockService(ApiResource['auth'], {
      create: $.when(mockAuthRequest.getAuth()),
      get: $.when(mockAuthRequest.getAuth()),
      default: $q.when([])
    });

    bard.mockService(auth, {
      authenticate: {},
      signin: mockAuthRequest.signin
    });

    var scope = $rootScope.$new();
    LoginController = $controller('SubmitNameController', {$scope: scope});

    flush();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Token Service', function() {
    beforeEach(function() {
      localstorage.removeItem(auth0TokenName);
    });

    it('should be created successfully', function() {
      expect(ApiResource).to.be.defined;
      expect(ApiResource['token']).to.be.defined;
    });

    it('should save a token successfully', function() {
      var token = '123456';

      TokenService.setToken(token);

      var newToken = localstorage.getItem(auth0TokenName);

      expect(newToken).to.be.ok;
      expect(newToken).to.be.a.('string');
      expect(newToken).to.equal(token);
    });

    it('should get a token successfully', function() {
      var token = '123456';
      var gotToken;

      localStorage.setItem(auth0TokenName, token);

      gotToken = TokenService.getToken();

      expect(newToken).to.be.ok;
      expect(gotToken).to.be.a('string');
      expect(gotToken).to.equal(token);
    });

    it('should delete a token successfully', function() {
      var token = '123456';
      var gotToken;

      localStorage.setItem(auth0TokenName, token);

      TokenService.deleteToken();

      gotToken = localStorage.getItem(auth0TokenName);

      expect(gotToken).to.be.undefined;
    });
  });

  describe('Authorization Service', function() {
    beforeEach(function() {
      localstorage.removeItem(auth0TokenName);
    });

    it('should be created successfully', function() {
      expect(ApiResource).to.be.defined;
      expect(ApiResource['auth']).to.be.defined;
    });

    it('should refresh an expired token', function() {
      TokenService.refreshToken().then(function() {
        var expectedToken = mockAuthRequest.getAuth();

        expect(localStorage.getItem(auth0TokenName))
          .to.equal(expectedToken.result.content.token);
      });

      flush();
    });

    it('should correctly determine if the user is authenticated', function() {
      var loggedIn;

      loggedIn = Auth.isAuthenticated();
      expect(loggedIn).to.not.be.ok;

      localStorage.setItem(auth0TokenName, '2341');
      loggedIn = Auth.isAuthenticated();
      expect(loggedIn).to.be.ok;

      flush();
    });

    it('should exchange a auth0 token with the correct token', function() {
      var expectedToken = mockAuthRequest.getAuth();

      AuthService.exchangeToken('123', '456').then(function() {
        expect(localStorage.getItem(auth0TokenName))
          .to.be(expectedToken.result.content.token);
      });

      flush();
    });

    it('should logout successfully', function() {
      localStorage.setItem(auth0TokenName, '1234');

      AuthService.logout().then(function() {
        expect(localStorage.getItem(auth0TokenName)).to.be.undefined;
      });

      flush();
    });

    it('should login successfully', function() {
      var options = {
        success: function() {
          var expectedToken = mockAuthRequest.getAuth();

          expect(localStorage.getItem(auth0TokenName))
            .to.be(expectedToken.result.content.token);

          expect(localStorage.getItem('auth0IdToken')).to.equal('idToken');
          expect(localStorage.getItem('auth0Profile')).to.equal('profileReturn');
          expect(localStorage.getItem('auth0RefreshToken')).to.equal('refreshToken');
          expect(localStorage.getItem('auth0AccessToken')).to.equal('accessToken');
        }
      };

      AuthService.login(options);

      flush();
    });

  });
});
