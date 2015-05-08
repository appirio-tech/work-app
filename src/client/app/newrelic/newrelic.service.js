(function () {
  "use strict";

  angular
    .module("newrelic")
    .factory("NewRelicService", NewRelicService);

  NewRelicService.$inject = ["$location"];

  /* @ngInject */
  function NewRelicService($location) {

    var noop = function () {};
    var actionName = "routeChange";
    var service = {
      reportCurrentRoute: noop
    };

    if (window.newrelic) {

      service.reportCurrentRoute = function () {
        newrelic.addPageAction(actionName, {
          url: $location.url()
        });
      }

    }

    return service;
  }
})();
