(function () {
  'use strict';

  angular.module('app.login', [
	'auth0',
	'angular-storage',
	'angular-jwt'
  ]).config(function (authProvider) {
	  authProvider.init({
		    domain: 'YOUR_NAMESPACE',
		    clientID: 'YOUR_CLIENT_ID'
		  });
	  
	  // We're annotating this function so that the `store` is injected correctly when this file is minified
	  jwtInterceptorProvider.tokenGetter = function(store) {
		  	// Return the saved token
		    return store.get('token');
		  }

	  // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
	  // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
	  // want to check the delegation-token example
	  $httpProvider.interceptors.push('jwtInterceptor');
	  
	}).run(function($rootScope, auth, store, jwtHelper, $location) {
		  // This events gets triggered on refresh or URL change
		  $rootScope.$on('$locationChangeStart', function() {
		    if (!auth.isAuthenticated) {
		      var token = store.get('token');
		      if (token) {
		        if (!jwtHelper.isTokenExpired(token)) {
		          auth.authenticate(store.get('profile'), token);
		        } else {
		          // Either show Login page or use the refresh token to get a new idToken
		          $location.path('/');
		        }
		      }
		    }
		  });
	  });

})();
