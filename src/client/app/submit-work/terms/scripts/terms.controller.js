/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('TermsController', TermsController);

  TermsController.$inject = ['logger', '$state'];
  /* @ngInject */
  function TermsController(logger, $state) {
    var vm = this;
    vm.title = 'Terms & Conditions';

    activate();

    function activate() {
      logger.log('Activated Terms and Conditions View');
    }
  }
})();
