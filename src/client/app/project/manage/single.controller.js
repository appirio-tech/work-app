(function () {
  'use strict';

  angular
    .module('app.project.manage')
    .controller('SingleProjectController', SingleProjectController);

  SingleProjectController.$inject = ['logger', 'projectData', 'isNew'];
  /* @ngInject */
  function SingleProjectController(logger, projectData, isNew) {
    var vm = this;
    vm.title = 'Manage';
    vm.project = projectData;
    vm.isNew = isNew;

    activate();

    function activate() {
      logger.info('Activated Single Project View');
    }
  }
})();
