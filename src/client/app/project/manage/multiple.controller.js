(function () {
  'use strict';

  angular
    .module('app.project.manage')
    .controller('MultipleProjectController', MultipleProjectController);

  MultipleProjectController.$inject = ['logger', 'dataservice'];
  /* @ngInject */
  function MultipleProjectController(logger, dataservice) {
    var vm = this;
    vm.title = 'Projects';

    activate();

    function activate() {
      logger.info('Activated Projects View');
      dataservice.getProjects().then(function(data)  {
        vm.projects = data;
      });
    }
  }
})();
