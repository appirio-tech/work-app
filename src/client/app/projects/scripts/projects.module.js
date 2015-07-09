(function () {
  'use strict';

  angular
    .module('app.projects', [
      'app.core',
      'app.resource',
      'app.user',
      'app.workRequest',
      'ngSanitize'
    ])
    .run(Projects);

    Projects.$inject = ['ApiResource'];

    function Projects(ApiResource) {
      var config = {
      url: 'copilots/:copilotId/projects/',
      resource: 'copilot-assigned-projects',
      apiUrl: 'https://api.topcoder-dev.com/v3/'
    };

      ApiResource.add(config);
    }
})();
