(function () {
  'use strict';

  angular
    .module('app.project.create')
    .controller('ProjectSubmitController', ProjectSubmitController);

  ProjectSubmitController.$inject = ['logger', 'ProjectService', '$location'];
  /* @ngInject */
  function ProjectSubmitController(logger, ProjectService, $location) {
    var vm = this;
    vm.title = 'Submit';
    vm.newProject = ProjectService.getCurrent();
    vm.submit = submit;

    activate();

    function submit() {
      ProjectService.createProject(vm.newProject);
      $location.url('/projects?new');
    }

    function activate() {
      logger.info('Activated Submit View');
    }
  }
})();
