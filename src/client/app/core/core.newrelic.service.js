(function () {
  "use strict";

  angular
    .module("app.core")
    .factory("NewRelicService", NewRelicService);

  NewRelicService.$inject = ["$location"];

  /* @ngInject */
  function NewRelicService($location) {

    var service = {
      reportCurrentRoute: noop
    };

    function noop () {};

    var actionName = "routeChange";
    
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
