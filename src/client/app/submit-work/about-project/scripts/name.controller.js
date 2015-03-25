/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitNameController', SubmitNameController);

  SubmitNameController.$inject = ['logger'];
  /* @ngInject */
  function SubmitNameController(logger) {
    var vm = this;
    vm.title = 'Name';

    function activate() {
      logger.info('Activated Name View');
    }
  }
})();
