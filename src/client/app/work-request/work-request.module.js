(function () {
  'use strict';

  angular
    .module('app.workRequest', [
      'blocks.exception', 'blocks.logger',
      'app.resource',
      'app.constants'
    ])
    .config(WorkRequestConfig)
    .run(WorkRequest);

  WorkRequest.$inject = ['ApiResource'];

  function WorkRequest(ApiResource) {
    var config = {
      url: '/app-work-requests',
      resource: 'work-request'
    };

    ApiResource.add(config);
  }

  WorkRequestConfig.$inject = ['$httpProvider', 'apiToken'];
  function WorkRequestConfig($httpProvider, apiToken) {
    $httpProvider.defaults.headers.common.Authorization = 'Bearer ' + apiToken;
  }
})();
