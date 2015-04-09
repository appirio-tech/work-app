/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitCompetitorsController', SubmitCompetitorsController);

  SubmitCompetitorsController.$inject = ['logger', '$state', 'SubmitWorkService'];
  /* @ngInject */
  function SubmitCompetitorsController(logger, $state, SubmitWorkService) {
    var vm = this;
    vm.title = 'Competitors';
    vm.appName = '';
    vm.work = {};
    vm.add = add;
    vm.nextState = 'users';

    activate();

    function activate() {
      logger.log('Activated Competitors View');
      vm.work = SubmitWorkService.getCurrent();
    }

    function add() {
      if (!(vm.appName.trim().length === 0)) {
        vm.work.competitorApps.push(vm.appName);
        vm.appName = '';
      }
    }

  }
})();
