(function () {
  'use strict';

  angular
    .module('app.project.manage')
    .controller('SingleProjectController', SingleProjectController);

  SingleProjectController.$inject = ['logger', 'ProjectService', '$routeParams'];
  /* @ngInject */
  function SingleProjectController(logger, ProjectService, $routeParams) {
    var vm = this;
    vm.title = 'Manage';

    activate();

    function activate() {
      logger.info('Activated Single Project View');
      ProjectService.getProject($routeParams.id).then(function(data) {
        vm.project = data;
      });
    }
  }
})();
