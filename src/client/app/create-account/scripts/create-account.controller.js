/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.create-account')
    .controller('CreateAccountController', CreateAccontController);

  CreateAccontController.$inject = ['logger'];
  /* @ngInject */
  function CreateAccontController(logger) {
    var vm = this;
    vm.title = 'Create Account';

    function activate() {
      logger.info('Activated Create Account View');
    }
  }
})();
