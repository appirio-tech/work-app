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
    var config = {
      url: 'work',
      resource: 'work-request'
    };

        //assigned projects
    var configCopilot = {
      url: 'work/:id',
      resource: 'copilot-work-request'
    }

    ApiResource.add(config);
    ApiResource.add(configCopilot);
  }
})();
