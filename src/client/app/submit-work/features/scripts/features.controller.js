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
    vm.add = add;
    vm.newFeatureName = '';
    vm.newFeatureExplanation = '';
    vm.nextState = 'estimate';

    activate();

    function activate() {
      logger.log('Activated Features View');
      vm.work = SubmitWorkService.getCurrent();
      if (vm.work.features.length === 0) {
        FeatureService.getFeatures().then(function(features) {
          vm.work.features = features;
        });
      }
    }

    function add() {
      vm.work.features.push({
        id: vm.newFeatureName,
        name: vm.newFeatureName,
        explanation: vm.newFeatureExplanation,
        description: '',
        selected: true
      });
      vm.newFeatureName = '';
      vm.newFeatureExplanation = '';
      SubmitWorkService.updatePrice();
    }

  }
})();
