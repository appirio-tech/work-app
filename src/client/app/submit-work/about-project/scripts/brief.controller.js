/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitBriefController', SubmitBriefController);

  SubmitBriefController.$inject = ['logger'];
  /* @ngInject */
  function SubmitBriefController(logger) {
    var vm = this;
    vm.title = 'Brief';

    function activate() {
      logger.info('Activated Brief View');
    }
  }
})();
