angular.module( 'app.login', [
  'auth0'
])
.controller( 'LoginCtrl', function HomeController( $scope, auth, $location, store ) {

  $scope.login = function() {
    auth.signin({
    username: $scope.username,
    password: $scope.password,
    connection: ['Username-Password-Authentication']
  }, function() {
    // All good
    $location.path('/');
  }, function(error) {
    // Error
  })
  }

});
