/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitTypeController', SubmitTypeController);

  SubmitTypeController.$inject = ['logger'];
  /* @ngInject */
  function SubmitTypeController(logger) {
    var vm = this;
    vm.title = 'Type';

    function activate() {
      logger.info('Activated Type View');
    }
  }
})();
