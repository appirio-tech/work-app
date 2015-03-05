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
          'styleMinimalComplex': 2,
          'styleModernClassic': 3,
          'stylePlayfulSerious': 4,
          'styleLoudSubtle': 4,
          'styleLuxuryBudget': 1,
          'styleIdeas': 'I have several ideas',
          'screens': 3,
          'screenFlow': 'Lorem ipsum',
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

      var postResponse = {
        result: {
          success: true,
          status: 200
        }
      };

      var getResponse = {
        result: {
          success: true,
          status: 200,
          content: projects
        }
      };

      var getOneResponse = {
        result: {
          success: true,
          status: 200,
          content: projects[0]
        }
      };

      $httpBackend.whenPOST('/api/v3/projects', function(data) {
        console.log('project POST');
        console.log(data);
        projects.push(JSON.parse(data));
        return true;
      }).respond(postResponse);

      // projects
      $httpBackend.whenGET('/api/v3/projects/30000007').respond(getOneResponse);
      $httpBackend.whenGET('/api/v3/projects').respond(getResponse);

      $httpBackend.whenGET(/.+\.html?/).passThrough();
    })
})();

