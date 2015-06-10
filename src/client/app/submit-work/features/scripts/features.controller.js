/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitFeaturesController', SubmitFeaturesController);

  SubmitFeaturesController.$inject = ['$scope', 'SubmitWorkService', 'NavService'];
  /* @ngInject */
  function SubmitFeaturesController($scope, SubmitWorkService, NavService) {
    var vm                   = this;
    vm.title                 = 'Features';
    vm.work                  = SubmitWorkService.work;
    vm.newFeatureName        = '';
    vm.newFeatureExplanation = '';
    vm.newFeature            = false;
    vm.showExample           = false;

    vm.clickExample = function () {
      $scope.showExample = true;
    };

    vm.submit = function () {
      if ($scope.featureForm.$valid) {
        NavService.setNextState();
      }
    };

    $scope.$watch('featureForm', function(featureForm) {
      if (featureForm) {
        NavService.findState('features').form = featureForm;
      }
    });

    vm.add = function() {
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
