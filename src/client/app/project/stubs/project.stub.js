(function () {
  'use strict';

  angular.module('projectMock', [
    'ngMockE2E'
  ])
    .run(function ($httpBackend) {

      var projects = [
        {
          'id': '30000007',
          'name': 'Billing Account 3 Web API Project 1',
          'projectStatusId': 3,
          'projectStatusName': 'Cancelled',
          'createdAt': '12/25/2014 07:12',
          'updatedAt': '12/25/2014 07:12',
          'createdBy': 132458,
          'updatedBy': 132458,
          'type': 'design',
          'description': 'Lorem ipsum',
          'website': 'http://example.com',
          'styleMinimalComplex': 3,
          'styleModernClassic': 3,
          'stylePlayfulSerious': 3,
          'styleLoudSubtle': 3,
          'styleLuxuryBudget': 3,
          'styleIdeas': 'I have several ideas',
          'screens': 6,
          'duration': 15,
          'links': ['http://example.com/pic.jpg', 'http://example.com/pic2.jpg'],
          'additionalDetails': 'here are more details',
          'status': 'Project submitted',
          'files': [],
          'billings': [
            {
              'id': '30000003',
              'name': 'Client 30000001 Secret Billing Account 3'
            }
          ]
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

      var projectsPostResponse = {
        result: {success: true, status: 200}
      };

      // projects
      $httpBackend.whenGET('/api/v3/projects').respond(projectsResponse);
      $httpBackend.whenPOST('/api/v3/projects', function(data) {
        console.log('project POST');
        console.log(data);
        projects.push(JSON.parse(data));
        return true;
      }).respond(projectsPostResponse);

      var projectResponse = response;
      projectResponse.content = projects[0];

      $httpBackend.whenGET('/api/v3/projects/30000007').respond(projectResponse);


      // @TODO needs a better way to catch passthroughs
      $httpBackend.whenGET(/.+\.html?/).passThrough();
    })
})();

