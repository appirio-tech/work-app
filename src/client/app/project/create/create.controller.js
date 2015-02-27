(function () {
  'use strict';

  angular
    .module('app.project.create')
    .controller('ProjectCreateController', ProjectCreateController);

  ProjectCreateController.$inject = ['logger', 'ProjectService'];
  /* @ngInject */
  function ProjectCreateController(logger, ProjectService) {
    var vm = this;
    vm.title = 'Create';
    vm.newProject = {};
    vm.create = create;

    activate();

    function create(project) {
      ProjectService.createProject(project);
      vm.newProject = {};
    }

    function activate() {
      logger.info('Activated Create View');
    }
  }
})();
