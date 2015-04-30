(function () {
  "use strict";

  angular
    .module("app.core")
    .factory("NewRelicService", NewRelicService);

  NewRelicService.$inject = ["$location"];

  /* @ngInject */
  function NewRelicService($location) {

    var service = {
      reportRoute: noop,
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

      service.reportPseudoRoute = function (route) {
        var pseudoRoute = [$location.url(), route].join("+");
        newrelic.addPageAction(actionName, {
          url: pseudoRoute
        });
      }

    }

    window.s = service;
    return service;
  }
})();
