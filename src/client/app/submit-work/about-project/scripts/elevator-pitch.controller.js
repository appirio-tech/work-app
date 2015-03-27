/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitElevatorPitchController', SubmitElevatorPitchController);

  SubmitElevatorPitchController.$inject = ['logger'];
  /* @ngInject */
  function SubmitElevatorPitchController(logger) {
    var vm = this;
    vm.title = 'Elevator Pitch';

    function activate() {
      logger.info('Activated Elevator Pitch View');
    }
  }
})();
