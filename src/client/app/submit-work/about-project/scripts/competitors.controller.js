/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitCompetitorsController', SubmitCompetitorsController);

  SubmitCompetitorsController.$inject = ['logger', '$state'];
  /* @ngInject */
  function SubmitCompetitorsController(logger, $state) {
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
      logger.info('hello!');
      vm.appNames.push(vm.appName);
      vm.appName = '';
    }

    function next() {
      $state.go('users');
    }
  }
})();
