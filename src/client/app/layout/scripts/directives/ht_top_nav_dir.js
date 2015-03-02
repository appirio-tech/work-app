(function () {
  'use strict';

  angular
    .module('app.layout')
    .directive('htTopNav', htTopNav);

  /* @ngInject */
  function htTopNav() {
    var directive = {
      bindToController: true,
      controller: TopNavController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {
        'navline': '='
      },
      templateUrl: 'layout/views/ht_top_nav.html'
    };

    /* @ngInject */
    function TopNavController() {
      var vm = this;
    }

    return directive;
  }
})();
