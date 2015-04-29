'use strict'

init = ($rootScope, $location) ->
  setPageClass = (e, data) ->
    if $location.$$url == '/'
      $rootScope.pageClass = 'getting-started';
    else
      $rootScope.pageClass = $location.$$path.replace /\//g, ' '

  $rootScope.$on '$locationChangeStart', setPageClass

init.$inject = ['$rootScope', '$location']

angular.module('app.layout', []).run init

