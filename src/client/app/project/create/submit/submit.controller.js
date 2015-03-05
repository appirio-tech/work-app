(function () {
  'use strict';

  angular
    .module('app.project.create')
    .controller('ProjectSubmitController', ProjectSubmitController);

  ProjectSubmitController.$inject = ['logger', 'ProjectService'];
  /* @ngInject */
  function ProjectSubmitController(logger, ProjectService) {
    var vm = this;
    vm.title = 'Submit';
    vm.newProject = ProjectService.getCurrent();
    vm.submit = submit;

    activate();

    function submit() {
      return ProjectService.createProject(vm.newProject);
    }

    function activate() {
      logger.info('Activated Submit View');
    }
  }
})();
