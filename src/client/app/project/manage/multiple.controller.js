(function () {
  'use strict';

  angular
    .module('app.project.manage')
    .controller('MultipleProjectController', MultipleProjectController);

  MultipleProjectController.$inject = ['logger', 'ProjectService'];
  /* @ngInject */
  function MultipleProjectController(logger, ProjectService) {
    var vm = this;
    vm.title = 'Manage your projects';

    activate();

    function activate() {
      logger.info('Activated Projects View');
      ProjectService.getProjects().then(function(data) {
        vm.projects = data;
      });
    }
  }
})();
