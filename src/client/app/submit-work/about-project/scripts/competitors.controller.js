/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitCompetitorsController', SubmitCompetitorsController);

  SubmitCompetitorsController.$inject = ['logger'];
  /* @ngInject */
  function SubmitCompetitorsController(logger) {
    var vm = this;
    vm.title = 'Competitors';

    function activate() {
      logger.info('Activated Competitors View');
    }
  }
})();
