login/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['logger'];
  /* @ngInject */
  function LoginController(logger) {
    var vm = this;
    vm.title = 'Login';

    function activate() {
      logger.info('Activated Login View');
    }
  }
})();
