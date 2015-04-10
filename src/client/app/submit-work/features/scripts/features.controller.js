/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitFeaturesController', SubmitFeaturesController);

  SubmitFeaturesController.$inject = ['$rootScope', '$scope', 'logger', 'SubmitWorkService', 'FeatureService'];
  /* @ngInject */
  function SubmitFeaturesController($rootScope, $scope, logger, SubmitWorkService, FeatureService) {
    var vm                   = this;
    vm.title                 = 'Features';
    vm.work                  = SubmitWorkService.work;
    vm.add                   = add;
    vm.newFeatureName        = '';
    vm.newFeatureExplanation = '';

    vm.showExample = function (example) {
      $rootScope.$emit('submit-work-show-example', example);
    };

    vm.hideExample = function () {
      $rootScope.$emit('submit-work-hide-example');
    };

    activate();

    $scope.submit = function () {
      if ($scope.featureForm.$valid) {
        SubmitWorkService.setNextState();
      }
    };

    $scope.$watch('featureForm', function(featureForm) {
      if (featureForm) {
        SubmitWorkService.findState('features').form = featureForm;
      }
    });

    function activate() {
      logger.log('Activated Features View');

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
