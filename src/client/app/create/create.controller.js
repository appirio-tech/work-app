(function () {
  'use strict';

  angular
    .module('app.create')
    .controller('CreateController', CreateController);

  CreateController.$inject = ['logger', 'dataservice'];
  /* @ngInject */
  function CreateController(logger, dataservice) {
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
