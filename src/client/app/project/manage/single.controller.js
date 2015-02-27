(function () {
  'use strict';

  angular
    .module('app.project.manage')
    .controller('SingleProjectController', SingleProjectController);

  SingleProjectController.$inject = ['logger', 'dataservice', '$routeParams'];
  /* @ngInject */
  function SingleProjectController(logger, dataservice) {
    var vm = this;
    vm.title = 'Manage';

    activate();

    function activate() {
      logger.info('Activated Single Project View');
      dataservice.getProject($routeParams.id).then(function(data) {
        vm.project = data;
      });
    }
  }
})();
