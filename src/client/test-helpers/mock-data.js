/* jshint -W079 */
var glo;
var mockData = (function () {
  var ans = {
    getMockPeople: getMockPeople,
    getMockStates: getMockStates,
    getMockProjects: getMockProjects,
    addMockProject: addMockProject
  };

  var data = {id:0};
  data.projects = [
    {
      'id': '30000007',
      'name': 'Client 30000001 Billing Account 3 Web API Project 1',
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
      'files': [],
      'billings': [
        {
          'id': '30000003',
          'name': 'Client 30000001 Secret Billing Account 3'
        }
      ]
    }//,
//    {
//      'id': '30000001',
//      'name': 'Client 30000001 Billing Account 1 Web Application Project 1',
//      'projectStatusId': 2,
//      'projectStatusName': 'Inactive',
//      'createdAt': '12/31/2014 01:12',
//      'updatedAt': '12/31/2014 01:12',
//      'createdBy': 132458,
//      'updatedBy': 132458,
//      'billings': [
//        {
//          'id': '30000001',
//          'name': 'Client 30000001 Major Billing Account 1'
//        },
//        {
//          'id': '30000002',
//          'name': 'Client 30000001 Minor Billing Account 2'
//        },
//        {
//          'id': '30000003',
//          'name': 'Client 30000001 Secret Billing Account 3'
//        }
//      ]
//    }
  ];

  return ans;

  function getMockStates() {
    return [
      {
        state: 'dashboard',
        config: {
          url: '/',
          templateUrl: 'app/dashboard/dashboard.html',
          title: 'dashboard',
          settings: {
            nav: 1,
            content: '<i class="fa fa-dashboard"></i> Dashboard'
          }
        }
      }
    ];
  }

  function getMockPeople() {
    return [
      {firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida'},
      {firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California'},
      {firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York'},
      {firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota'},
      {firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota'},
      {firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina'},
      {firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming'}
    ];
  }

  function getMockProjects() {
    return data.projects;
  }

  function addMockProject(project) {
    project.id = data.id++;
    project.projectStatusName = 'Draft';
    project.projectStatusId = 0;
    data.projects.push(project);
    return true;
  }

})();
