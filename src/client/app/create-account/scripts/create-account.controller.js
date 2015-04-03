/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.create-account')
    .controller('CreateAccountController', CreateAccountController);

  CreateAccountController.$inject = ['logger'];
  /* @ngInject */
  function CreateAccountController(logger) {
    var vm = this;
    vm.title = 'Create Account';

    function activate() {
      logger.log('Activated Create Account View');
    }
  }
})();
