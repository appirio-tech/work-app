(function () {
  'use strict';

  angular
    .module('app.workRequest', [
      'blocks.exception', 'blocks.logger',
      'app.resource',
      'app.constants'
    ])
    .run(WorkRequest);

  WorkRequest.$inject = ['ApiResource'];

  function WorkRequest(ApiResource) {
    // open projects
    var config = {
      url: 'app-work-requests',
      resource: 'work-request'
    };

    // assigned projects
    var configCopilot = {
      url: 'app-work-requests/:id',
      resource: 'copilot-work-request'
    }

    ApiResource.add(config);
    ApiResource.add(configCopilot);
  }
})();
