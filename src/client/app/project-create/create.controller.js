(function () {
  'use strict';

  angular
    .module('app.project-create')
    .controller('ProjectCreateController', ProjectCreateController);

  ProjectCreateController.$inject = ['logger', 'dataservice'];
  /* @ngInject */
  function ProjectCreateController(logger, dataservice) {
    var vm = this;
    vm.title = 'Create';
    vm.newProject = {};
    vm.create = create;

    activate();

    function create(project) {
      dataservice.createProject(project);
      vm.newProject = {};
    }

    function activate() {
      logger.info('Activated Create View');
    }
  }
})();
