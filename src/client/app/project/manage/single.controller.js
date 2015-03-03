(function () {
  'use strict';

  angular
    .module('app.project.manage')
    .controller('SingleProjectController', SingleProjectController);

  SingleProjectController.$inject = ['logger', 'projectData'];
  /* @ngInject */
  function SingleProjectController(logger, projectData) {
    var vm = this;
    vm.title = 'Manage';
    vm.project = projectData;

    activate();

    function activate() {
      logger.info('Activated Single Project View');
    }
  }
})();
