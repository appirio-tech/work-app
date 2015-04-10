/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitFeaturesController', SubmitFeaturesController);

  SubmitFeaturesController.$inject = ['$rootScope', 'logger', '$state', 'SubmitWorkService', 'FeatureService'];
  /* @ngInject */
  function SubmitFeaturesController($rootScope, logger, $state, SubmitWorkService, FeatureService) {
    var vm = this;
    vm.title = 'Features';
    vm.work = {};
    vm.add = add;
    vm.newFeatureName = '';
    vm.newFeatureExplanation = '';
    vm.nextState = 'estimate';

    vm.showExample = function (example) {
      $rootScope.$emit('submit-work-show-example', example);
    };

    vm.hideExample = function () {
      $rootScope.$emit('submit-work-hide-example');
    };


    activate();

    function activate() {
      logger.log('Activated Features View');
      vm.work = SubmitWorkService.work;
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
    }

  }
})();
