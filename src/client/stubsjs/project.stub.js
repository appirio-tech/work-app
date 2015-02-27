(function () {
  'use strict';

  angular.module('projectMock', [
    'ngMockE2E'
  ])
    .run(function ($httpBackend) {

      var projects = [
        {
          id: 1,
          cratedAt: '',
          createdBy: '',
          updatedAt: '',
          updatedBy: '',
          type: '',
          description: '',
          website: 'http://google.com',
          styleMinimalComplex: '',
          styleModernClassic: '',
          stylePlayfulSerious: '',
          styleLoudSubtle: '',
          styleLuxuryBudget: '',
          styleIdeas: '',
          name: '',
          screens: '',
          duration: '',
          links: [
            {
              id: 1,
              url: 'http://www.google.com'
            }
          ],
          additionalDetails: '',
          files: [
            {
              id: 1,
              path: 'projects/1/files/test.pdf'
            }
          ],
          status: ''
        }
      ];

      var response = {
        result: {
          success: true,
          status: 200
        }
      };

      var projectsResponse = response;
      projectsResponse.content = projects;

      // projects
      $httpBackend.whenGET('/projects').respond(projectsResponse);

      var projectsPOSTResponse = response;
      projectsPOSTResponse.id = 2;
      $httpBackend.whenPOST('/projectds').respond(projectsPOSTResponse);


      var projectResponse = response;
      projectResponse.content = projects[0];

      // project/{id}
      $httpBackend.whenGET('/projects/*').respond(projectResponse);
    })
});

