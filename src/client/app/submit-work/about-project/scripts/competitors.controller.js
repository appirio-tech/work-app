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
    vm.project = {};
    vm.add = add;
    vm.nextState = 'users';

    activate();

    function activate() {
      logger.log('Activated Competitors View');
      vm.project = SubmitWorkService.getCurrent();
    }

    function add() {
      vm.project.competitorApps.push(vm.appName);
      vm.appName = '';
    }

  }
})();
