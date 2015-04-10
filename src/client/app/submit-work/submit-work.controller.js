/*global form:true */
(function () {
  'use strict';

  /* @ngInject */
  function SubmitWorkController($scope, SubmitWorkService, $state) {
    $scope.activeState = SubmitWorkService.activeState;
    $scope.work        = SubmitWorkService.work;

    $scope.$watch('activeState', function(state) {
      if (state) {
        SubmitWorkService.setActiveState(state);
      }
    });

    $scope.$watch(function () {
       return SubmitWorkService.activeState;
     }, function (activeState) {
      $scope.activeState = activeState;
    }, true);

    $scope.launch = function () {
      var activateState = false;

      angular.forEach(SubmitWorkService.states, function(state, key) {
        if (state.form && !state.form.$valid) {
          state.form.$setDirty();

          if (!activateState) {
            activateState = state;
          }
        }
      });

      if (activateState) {
        SubmitWorkService.setActiveState(activateState);
      }
      else {
        $state.go('launch-success');
      }
    };
  }

  SubmitWorkController.$inject = ['$scope', 'SubmitWorkService', '$state'];

  angular.module('app.submit-work').controller('SubmitWorkController', SubmitWorkController);

})();
