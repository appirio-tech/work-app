(function () {
  'use strict';

  angular
    .module('app.projects')
    .controller('ProjectsTabController', ProjectsTabController);

  ProjectsTabController.$inject = [];
  function ProjectsTabController() {
    var vm = this;
    vm.highlightAssignedButton = true;
    vm.highlightOpenButton = false;

    vm.assignedButtonSelected = function() {
      vm.highlightOpenButton = false;
      vm.highlightAssignedButton = true;
    }

    vm.openButtonSelected = function() {
      vm.highlightAssignedButton = false;
      vm.highlightOpenButton = true;
    }

  }
})();