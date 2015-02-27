(function () {
  'use strict';

  angular
    .module('app.project.create')
    .controller('ProjectHomeController', ProjectHomeController);

  ProjectHomeController.$inject = ['logger', 'ProjectService'];
  /* @ngInject */
  function ProjectHomeController(logger, ProjectService) {
    var vm = this;
    vm.title = 'Home';
    vm.newProject = {};

    activate();

    function activate() {
      logger.info('Activated Home View');
    }
  }
})();
