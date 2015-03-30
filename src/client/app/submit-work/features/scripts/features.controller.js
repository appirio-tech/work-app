/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitFeaturesController', SubmitFeaturesController);

  SubmitFeaturesController.$inject = ['logger', '$state', 'SubmitWorkService', 'FeatureService'];
  /* @ngInject */
  function SubmitFeaturesController(logger, $state, SubmitWorkService, FeatureService) {
    var vm = this;
    vm.title = 'Features';
    vm.work = {};
    vm.next = SubmitWorkService.next('launch-estimate');

    activate();

    function activate() {
      logger.info('Activated Features View');
      vm.work = SubmitWorkService.getCurrent();
      FeatureService.getFeatures().then(function(features) {
        vm.work.features = features;
      });
    }
  }
})();
