(function () {
  'use strict';

  angular
    .module('app.project.create')
    .controller('ProjectCreateController', ProjectCreateController);

  ProjectCreateController.$inject = ['logger', 'ProjectService', '$location', '$scope', '$window'];
  /* @ngInject */
  function ProjectCreateController(logger, ProjectService, $location, $scope, $window) {
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

    $scope.$watch('form', function(form) {
      vm.form = form;
    });

    activate();

    function createProject() {
      return ProjectService.createProject(vm.newProject);
    }

    function getProjects() {
      return ProjectService.getProjects();
    }

    function addUrl() {
      if (vm.newUrl.length > 0) {
        vm.newProject.links.push(vm.newUrl);
        vm.newUrl = '';
      }
    }

    function addFile() {
      if (vm.newFile.length > 0) {
        vm.newProject.files.push(vm.newFile);
        vm.newFile = '';
      }
    }

    function next() {
      $window.scrollTo(0, 0);
      if (!vm.form || (vm.form.$pristine && form.description.length == 0)) {
        vm.emptyError = true;
        return;
      }
      if (!vm.form.$valid) {
        vm.form.$submitted = true;
      } else {
        ProjectService.setCurrent(vm.newProject);
        $location.url('/create/submit');
      }
    }

    function activate() {
      logger.info('Activated Create View');
    }
  }
})();
