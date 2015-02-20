(function () {
  'use strict';

  angular
    .module('app.projects')
    .controller('ProjectController', ProjectController);

  ProjectController.$inject = ['logger'];
  /* @ngInject */
  function ProjectController(logger) {
    var vm = this;
    vm.title = 'Projects';

    activate();

    function activate() {
      logger.info('Activated Admin View');
    }
  }
})();
