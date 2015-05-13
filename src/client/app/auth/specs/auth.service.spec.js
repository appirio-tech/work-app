/* jshint -W117, -W030 */
describe('Auth', function() {
  'use strict';

  var flush;

  beforeEach(function() {
    bard.inject(this, '$q', '$rootScope', 'ApiResource', 'data', 'auth0TokenName', 'auth', 'store', 'TokenService', 'AuthService', 'jwtHelper');
    flush = function() { $rootScope.$apply(); };

    bard.mockService(ApiResource['auth'], {
      create: $.when(mockAuthRequest.getAuth()),
      get: $.when(mockAuthRequest.getAuth()),
      remove: $q.when([])
    });

    bard.mockService(data, {
      get: $.when(mockAuthRequest.getAuth()),
      create: $.when(mockAuthRequest.getAuth()),
      remove: $q.when([])
    });

    bard.mockService(auth, {
      authenticate: {},
      signin: mockAuthRequest.signin
    });

    // We fake the decoding of hte token since we dontt have real tokens
    bard.mockService(jwtHelper, {
      isTokenExpired: function() { return false }
    })
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Token Service', function() {
    var token;

    beforeEach(function() {
      token = '12.34.56';

      store.remove(auth0TokenName);
    });

    afterEach(function() {
      store.remove(auth0TokenName);
    });

    it('should be created successfully', function() {
      expect(ApiResource).to.be.defined;
      expect(ApiResource['token']).to.be.defined;
    });

    it('should save a token successfully', function() {
      TokenService.setToken(token);

      var newToken = store.get(auth0TokenName);

      expect(newToken).to.be.ok;
      expect(newToken).to.be.a('string');
      expect(newToken).to.equal(token);
    });

    it('should get a token successfully', function() {
      var gotToken;

      store.set(auth0TokenName, token);

      gotToken = TokenService.getToken();

      expect(gotToken).to.be.ok;
      expect(gotToken).to.be.a('string');
      expect(gotToken).to.equal(token);
    });

    it('should delete a token successfully', function() {
      var gotToken;

      store.set(auth0TokenName, token);

      TokenService.deleteToken();

      gotToken = store.get(auth0TokenName);

      expect(gotToken).to.not.be.ok;
    });
  });

  describe('Authorization Service', function() {
    beforeEach(function() {
      store.remove(auth0TokenName);
    });

    afterEach(function() {
      store.remove(auth0TokenName);
    });

    it('should be created successfully', function() {
      expect(ApiResource).to.be.defined;
      expect(ApiResource['auth']).to.be.defined;
    });

    it('should refresh an expired token', function() {
      AuthService.refreshToken().then(function() {
        var expectedToken = mockAuthRequest.getAuth();

        expect(store.get(auth0TokenName))
          .to.equal(expectedToken.result.content.token);
      });

      flush();
    });

    it('should correctly determine if the user is authenticated', function() {
      var loggedIn;

      loggedIn = AuthService.isAuthenticated();
      expect(loggedIn).to.not.be.ok;

      store.set(auth0TokenName, '23.45.67');
      loggedIn = AuthService.isAuthenticated();
      expect(loggedIn).to.be.ok;

      flush();
    });

    it('should exchange a auth0 token with the correct token', function() {
      var expectedToken = mockAuthRequest.getAuth();

      AuthService.exchangeToken('123', '456').then(function() {
        expect(store.get(auth0TokenName))
          .to.equal(expectedToken.result.content.token);

        expect(AuthService.isAuthenticated()).to.be.ok;
      });

      flush();
    });

    it('should logout successfully', function() {
      store.set(auth0TokenName, '1234');

      AuthService.logout().then(function() {
        expect(store.get(auth0TokenName)).to.not.be.ok;
      });

      flush();
    });

    it('should login successfully', function() {
      var options = {
        success: function() {
          var expectedToken = mockAuthRequest.getAuth();

          expect(store.get(auth0TokenName))
            .to.equal(expectedToken.result.content.token);
        }
      };

      AuthService.login(options);

      flush();
    });

  });
});
