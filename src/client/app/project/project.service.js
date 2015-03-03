(function () {
  'use strict';

  angular
    .module('app.project.core')
    .factory('ProjectService', ProjectService);

  ProjectService.$inject = ['$q', '$http', '$location', 'exception', 'logger'];
  /* @ngInject */
  function ProjectService($q, $http, $location, exception, logger) {
    return {
      getProject: getProject,
      getProjects: getProjects,
      createProject: createProject
    };

    function getProject(id) {
      return $http.get('/api/v3/projects/' + id)
        .then(getProjectComplete)
        .catch(function(message) {
          exception.catcher('XHR Failed for getProject')(message);
          $location.url('/');
        });

      function getProjectComplete(data, status, headers, config) {
        logger.info('project data', data);
        return data.data.content;
      }
    }

    function getProjects() {
      return $http.get('/api/v3/projects')
        .then(getProjectsComplete)
        .catch(function(message) {
          exception.catcher('XHR Failed for getProjects')(message);
          $location.url('/');
        });

      function getProjectsComplete(data, status, headers, config) {
        logger.info('project data', data.data.content);
        return data.data.content;
      }
    }

    function createProject(project) {
      project.projectCreatedDate = moment().format('MM/DD/YYYY hh:mm');
      project.projectLastUpdatedDate = project.projectCreatedDate;
      project.billings = [];
      return $http.post('/api/v3/projects', project)
        .then(postProjectReport)
        .catch(function(message) {
          exception.catcher('XHR Failed for createProject')(message);
          $location.url('/');
        });

      function postProjectReport(data, status, headers, config) {
        logger.info('project data', data.data.content);
        return data;
      }

      //mockData.addMockProject(project);
      //return $q.when(true);
    }

  }
})();
