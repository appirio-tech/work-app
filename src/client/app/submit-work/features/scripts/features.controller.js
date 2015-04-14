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

    $scope.showExample       = false;

    $scope.clickExample = function () {
      $scope.showExample = true;
    };

    activate();

    $scope.submit = function () {
      if ($scope.featureForm.$valid) {
        SubmitWorkService.setNextState();
      }
    };

    // can create ngEnter for this
    $scope.onPress= function (e) {
      if (e.which == 13) {
        vm.add();

        e.preventDefault();

        return false;
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

  }
})();
