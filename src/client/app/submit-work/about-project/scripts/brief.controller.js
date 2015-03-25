/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitBriefController', SubmitBriefController);

  SubmitBriefController.$inject = ['logger', '$state'];
  /* @ngInject */
  function SubmitBriefController(logger, $state) {
    var vm = this;
    vm.title = 'Brief';
    vm.description = '';
    vm.next = next;

    activate();

    function activate() {
      logger.info('Activated Brief View');
    }

    function next() {
      $state.go('about-competitors');
    }
  }
})();
