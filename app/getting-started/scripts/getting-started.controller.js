/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.getting-started')
    .controller('GettingStartedController', GettingStartedController);

  GettingStartedController.$inject = ['logger'];
  /* @ngInject */
  function GettingStartedController(logger) {
    var vm = this;
    vm.title = 'Getting Started';

    function activate() {
      logger.log('Activated Getting Started View');
    }
  }
})();
