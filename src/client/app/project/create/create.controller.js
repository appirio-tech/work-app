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
    vm.newProject = glo = newProject();
    vm.create = create;
    vm.newUrl = '';
    vm.addUrl = addUrl;
    vm.newFile = '';
    vm.addFile = addFile;

    activate();

    function newProject() {
      return {
        links: [],
        files: []
      };
    }

    function addUrl() {
      vm.newProject.links.push(vm.newUrl);
      vm.newUrl = '';
    }

    function addFile() {
      vm.newProject.files.push(vm.newFile);
      vm.newFile = '';
    }

    function create(project) {
      ProjectService.createProject(project);
      vm.newProject = {};
    }

    function activate() {
      logger.info('Activated Create View');
    }
  }
})();