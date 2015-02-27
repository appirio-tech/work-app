(function () {
  'use strict';

  angular
    .module('app.project-create')
    .controller('ProjectHomeController', ProjectHomeController);

  ProjectHomeController.$inject = ['logger', 'dataservice'];
  /* @ngInject */
  function ProjectHomeController(logger, dataservice) {
    var vm = this;
    vm.title = 'Home';
    vm.newProject = {};

    activate();

    function activate() {
      logger.info('Activated Home View');
    }
  }
})();
