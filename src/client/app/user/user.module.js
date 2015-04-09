(function () {
  'use strict';

  angular
    .module('app.user', [
      'blocks.exception', 'blocks.logger',
      'app.resource',
      'app.constants'
    ])
    .run(WorkRequest);

  WorkRequest.$inject = ['ApiResource'];

  function WorkRequest(ApiResource) {
    var config = {
      url: 'user',
      resource: 'user'
    };

    ApiResource.add(config);
  }
})();
