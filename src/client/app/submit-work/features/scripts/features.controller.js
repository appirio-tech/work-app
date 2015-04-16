/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitFeaturesController', SubmitFeaturesController);

  SubmitFeaturesController.$inject = ['$scope', 'logger', 'SubmitWorkService', 'FeatureService'];
  /* @ngInject */
  function SubmitFeaturesController($scope, logger, SubmitWorkService, FeatureService) {
    var vm                   = this;
    vm.title                 = 'Features';
    vm.work                  = SubmitWorkService.work;
    vm.add                   = add;
    vm.newFeatureName        = '';
    vm.newFeatureExplanation = '';
    vm.newFeature            = false;
    vm.showExample           = false;

    vm.clickExample = function () {
      $scope.showExample = true;
    };

    vm.submit = function () {
      if ($scope.featureForm.$valid) {
        SubmitWorkService.setNextState();
      }
    };

    $scope.$watch('featureForm', function(featureForm) {
      if (featureForm) {
        SubmitWorkService.findState('features').form = featureForm;
      }
    });

    function add() {
      vm.work.features.push({
        id         : vm.newFeatureName,
        name       : vm.newFeatureName,
        explanation: vm.newFeatureExplanation,
        description: '',
        selected   : true
      });

      vm.newFeatureName        = '';
      vm.newFeatureExplanation = '';
      vm.newFeature            = false;
    }

    (function() {
      logger.log('Activated Features View');

      if (vm.work.features.length === 0) {
        FeatureService.getFeatures().then(function(features) {
          vm.work.features = features;
        });
      }
    })();
  }
})();
