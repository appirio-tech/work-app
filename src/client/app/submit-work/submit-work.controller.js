/*global form:true */
(function () {
  'use strict';

  /* @ngInject */
  function SubmitWorkController($scope, SubmitWorkService) {
    $scope.activeState = SubmitWorkService.activeState;
    $scope.work        = SubmitWorkService.work;

    $scope.$watch('activeState', function(state) {
      if (state) {
        SubmitWorkService.setActiveState(state);
      }
    });

    $scope.launch = function () {
      // angular.forEach(SubmitWorkService.states, function(state, key) {
      //   if (!state.form.$valid) {
      //     $document.scrollToElementAnimated(stateElement, 150);
      //   }
      // });
    };
  }

  SubmitWorkController.$inject = ['$scope', 'SubmitWorkService'];

  angular.module('app.submit-work').controller('SubmitWorkController', SubmitWorkController);

})();
