/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitDesignsController', SubmitDesignsController);

  SubmitDesignsController.$inject = ['$scope', 'logger', '$state', 'SubmitWorkService', 'NavService'];
  /* @ngInject */
  function SubmitDesignsController($scope, logger, $state, SubmitWorkService, NavService) {
    var vm            = this;
    vm.title          = 'Designs';
    vm.work           = SubmitWorkService.work;
    vm.imageFilenames = [];
    vm.filename       = '';
    vm.add;
    vm.submit;

    var i = 1;

    logger.log('Activated Designs View');

    vm.add = function() {
      vm.imageFilenames.push('file ' + i++);
      vm.filename = '';
    }

    vm.submit = function () {
      if ($scope.designForm.$valid) {
        NavService.setNextState();
      }
    };

    $scope.$watch('designForm', function(designForm) {
      if (designForm) {
        NavService.findState('designs').form = designForm;
      }
    });

  }
})();
