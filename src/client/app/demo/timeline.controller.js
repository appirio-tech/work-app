/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.demo')
    .controller('TimelineController', TimelineController);

  TimelineController.$inject = ['logger', '$state'];
  /* @ngInject */
  function TimelineController(logger, $state) {
    var vm = this;
    vm.title = 'Timeline';

    activate();

    function activate() {
      logger.log('Activated Timelin View');
    }

  }
})();
