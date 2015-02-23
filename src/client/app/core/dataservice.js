(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$q'];
  /* @ngInject */
  function dataservice($q) {
    var service = {
      getPeople: getPeople,
      getMessageCount: getMessageCount,
      getProjects: getProjects,
      createProject: createProject
    };

    return service;

    function getMessageCount() {
      return $q.when(72);
    }

    function getPeople() {
      var people = [
        {firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida'},
        {firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California'},
        {firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York'},
        {firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota'},
        {firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota'},
        {firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina'},
        {firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming'}
      ];
      return $q.when(people);
    }

    function getProjects() {
      var p = mockData.getMockProjects();
      return $q.when(p);
    }

    function createProject(project) {
      project.projectCreatedDate = moment().format('MM/DD/YYYY hh:mm');
      project.projectLastUpdatedDate = project.projectCreatedDate;
      project.billings = [];
      mockData.addMockProject(project);
      return $q.when(true);
    }

  }
})();
