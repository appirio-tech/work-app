/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitSuccessController', SubmitSuccessController);

  SubmitSuccessController.$inject = ['logger', '$state', 'SubmitWorkService'];
  /* @ngInject */
  function SubmitSuccessController(logger, $state, SubmitWorkService) {
    var vm   = this;
    vm.title = 'Success';

  }
})();
