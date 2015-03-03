var glo;
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
    vm.newProject = ProjectService.getCurrent();
    vm.next = next;
    vm.newUrl = '';
    vm.addUrl = addUrl;
    vm.newFile = '';
    vm.addFile = addFile;
    vm.createProject = createProject;
    vm.getProjects = getProjects;

    activate();

    function createProject() {
      return ProjectService.createProject(vm.newProject);
    }

    function getProjects() {
      return ProjectService.getProjects();
    }

    function addUrl() {
      vm.newProject.links.push(vm.newUrl);
      vm.newUrl = '';
    }

    function addFile() {
      vm.newProject.files.push(vm.newFile);
      vm.newFile = '';
    }

    function next() {
      ProjectService.setCurrent(vm.newProject);
    }

    function activate() {
      logger.info('Activated Create View');
    }
  }
})();
