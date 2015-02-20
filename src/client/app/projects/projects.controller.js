(function () {
  'use strict';

  angular
    .module('app.projects')
    .controller('ProjectController', ProjectController);

  ProjectController.$inject = ['logger', 'dataservice'];
  /* @ngInject */
  function ProjectController(logger, dataservice) {
    var vm = this;
    vm.title = 'Projects';

    activate();

    function activate() {
      logger.info('Activated Projects View');
      dataservice.getProjects().then(function(data) {
        vm.projects = data;
      });
    }
  }
})();
