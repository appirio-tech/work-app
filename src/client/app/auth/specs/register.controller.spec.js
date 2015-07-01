// Need to adjust tests to UserV3Service instead of UserService
//
/* jshint -W117, -W030 */
// describe('RegisterController', function () {
//   var controller, scope, flush;

//   beforeEach(function () {
//     bard.inject(this, '$q', '$controller', '$rootScope', 'AuthService', 'UserService', 'data', 'auth', '$location', '$state');
//     flush = function() { $rootScope.$apply(); };

//     bard.mockService(data, {
//       get: $q.when(mockAuthRequest.getAuth()),
//       create: $q.when(mockAuthRequest.getAuth()),
//       remove: $q.when([])
//     });

//     var registerMock = function(options) {
//       var deferred = $q.defer();

//       if (options.handle !== '1234' ||
//         options.email !== 'person@address.com' ||
//         options.password !== '1234') {

//         deferred.reject('ERROR IN REGISTRATION');
//       }
//       else {
//         deferred.resolve();
//       }

//       return deferred.promise;
//     };

//     bard.mockService(AuthService, {
//       login: mockAuthRequest.login
//     });

//     bard.mockService(UserService, {
//       createUser: registerMock
//     });

//     scope = $rootScope.$new();
//     controller = $controller('RegisterController', {$scope: scope});
//     flush();
//   });

//   bard.verifyNoOutstandingHttpRequests();

//   describe('Register controller', function () {
//     it('should be created successfully', function () {
//       expect(controller).to.be.defined;
//     });

//     describe('after activate', function () {
//       it('should have title of Register', function () {
//         expect(controller.title).to.equal('Register');
//       });
//     });

//     describe('Register', function() {
//       var wrongAuth;
//       var rightAuth;

//       function register(authVars) {
//         controller.username = authVars.username;
//         controller.password = authVars.password;
//         controller.email = authVars.email;
//         controller.submit();
//         flush();
//       }

//       beforeEach(function() {
//         wrongAuth = {
//           username: '1234',
//           password: '12345',
//           email: 'person@address.com'
//         };

//         rightAuth = {
//           username: '1234',
//           password: '1234',
//           email: 'person@address.com'
//         };
//       });

//       it('should be able to register for a user', function() {
//         register(rightAuth);


//         expect(controller.error).to.not.be.ok;
//       });

//       it('should be logged in after registering a user', function() {
//         sinon.spy(AuthService, 'login');

//         register(rightAuth);

//         expect(AuthService.login).to.have.been.called;
//       });

//       it('should be on the view-work-multiple state after registration', function() {
//         sinon.spy($state, 'go');

//         register(rightAuth);

//         expect($state.go).to.have.been.calledWith('view-work-multiple');
//       });

//       it('should display an error message relieved from the service', function() {
//         register(wrongAuth);

//         expect(controller.error).to.be.ok;
//         expect(controller.errorMessage).to.be.eq('ERROR IN REGISTRATION');
//       });
//     })
//   });
// });
