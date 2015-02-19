/* jshint -W079 */
var mockData = (function () {
  return {
    getMockPeople: getMockPeople,
    getMockStates: getMockStates,
    getMockProjects: getMockProjects
  };

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
    return [
      {
        "id": "30000007",
        "projectName": "Client 30000001 Billing Account 3 Web API Project 1",
        "projectStatusId": 3,
        "projectStatusName": "Cancelled",
        "projectCreatedDate": "12/25/2014 07:12",
        "projectCreatedBy": 132458,
        "projectLastUpdatedDate": "12/27/2014 01:18",
        "billings": [
          {
            "id": "30000003",
            "name": "Client 30000001 Secret Billing Account 3"
          }
        ]
      },
      {
        "id": "30000001",
        "projectName": "Client 30000001 Billing Account 1 Web Application Project 1",
        "projectStatusId": 2,
        "projectStatusName": "Inactive",
        "projectCreatedDate": "12/31/2014 01:12",
        "projectCreatedBy": 132458,
        "projectLastUpdatedDate": "12/31/2014 07:18",
        "billings": [
          {
            "id": "30000001",
            "name": "Client 30000001 Major Billing Account 1"
          },
          {
            "id": "30000002",
            "name": "Client 30000001 Minor Billing Account 2"
          },
          {
            "id": "30000003",
            "name": "Client 30000001 Secret Billing Account 3"
          }
        ]
      }
    ];
  }

})();
