/*global form:true */
(function () {
  'use strict';

  angular
    .module('app.submit-work')
    .controller('SubmitDesignsController', SubmitDesignsController);

  SubmitDesignsController.$inject = ['$scope', 'logger', '$state', 'SubmitWorkService'];
  /* @ngInject */
  function SubmitDesignsController($scope, logger, $state, SubmitWorkService) {
    var vm            = this;
    vm.title          = 'Designs';
    vm.work           = SubmitWorkService.work;
    vm.imageFilenames = [];
    vm.filename       = '';
    vm.add            = add;
    var i             = 1;

    logger.log('Activated Designs View');

    function add() {
      vm.imageFilenames.push('file ' + i++);
      vm.filename = '';
    }

    $scope.submit = function () {
      if ($scope.designForm.$valid) {
        SubmitWorkService.setNextState();
      }
    };

    $scope.$watch('designForm', function(designForm) {
      if (designForm) {
        SubmitWorkService.findState('designs').form = designForm;
      }
    });

  }
})();
