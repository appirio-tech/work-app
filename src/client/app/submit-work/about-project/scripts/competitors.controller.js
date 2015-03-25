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
    vm.appNames = [];
    vm.add = add;
    vm.next = next;

    activate();

    function activate() {
      logger.info('Activated Competitors View');
    }

    function add() {
      vm.appNames.push(vm.appName);
      vm.appName = '';
    }

    function next() {
      SubmitWorkService.setCompetitors(vm.appNames);
      $state.go('users');
    }
  }
})();
