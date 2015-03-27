(function() {
  'use strict';

  angular
    .module('app.workRequest')
    .factory('WorkRequest', WorkRequest);

  WorkRequest.$inject = ['ApiResource'];

  function WorkRequest(ApiResource) {
    var config = {
      url: '/app-work-requests',
      resoruce: 'work-request'
    };

    api.add(config);
  }
});
