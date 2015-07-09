(function () {
  'use strict';

  angular
    .module('app.project-details')
    .factory('ProjectDetailsService', ProjectDetailsService);

  ProjectDetailsService.$inject = ['$rootScope', '$http', '$q', 'data', 'UserService', 'apiUrl', 'UserV3Service'];

  function ProjectDetailsService($rootScope, $http, $q, data, UserService, apiUrl, UserV3Service) {
    var service = {

      // variables
      work           : null,
      claimedProjectId: null,
      currentUserId: null,
      workDetails: {},

      // functions
      initializeCopilotWork : null,
      submitClaim: null,
      submitChallenges: null,
      projectAvailable: null,
      showStatusComponent: null,
      openCreateChallenges: null
    };

   service.initializeCopilotWork = function(id, status) {
    if (status) {
      service.workDetails[id] = {};
      service.workDetails[id].status = status;
    }
     var deferred = $q.defer();
       data.get('copilot-work-request', {id: id}).then(function(data) {
         service.work = data.result.content;
         console.log('work request details', service.work);
         deferred.resolve(service.work);
       }).catch(function(e) {
         console.log('error on initialize work', e);
       });
       return deferred.promise;
    };

    service.submitClaim= function(copilotId, projectId) {
      UserV3Service.getCurrentUser(function(user) {
        $http.post(apiUrl+'copilots/'+user.id+'/projects/',
          {"id": projectId}
          ).success(function(data, status, headers, config) {
           console.log('Updated project status', data);
           $rootScope.$emit('projectClaimed');
           if (!service.workDetails[projectId]) {
              service.workDetails[projectId] = {}
            }
              service.workDetails[projectId].status = 'Assigned';
          }).
            error(function(data, status, headers, config) {
              console.log('error on project claim', data);
          });
      });
     };

   service.submitChallenges = function(projectId, challengesEstimate) {
    UserV3Service.getCurrentUser(function(user) {
    $http.put(apiUrl+'copilots/'+user.id+'/projects/'+projectId+'',
      {"id": projectId, "estimate": challengesEstimate, "status": "estimated"}
      ). success(function(data, status, headers, config) {
       if (!service.workDetails[projectId]) {
            service.workDetails[projectId] = {}
        }
        service.workDetails[projectId].status = 'Estimate';
        service.workDetails[projectId].estimate = challengesEstimate;
      }).
      error(function(data, status, headers, config) {
        console.log('error on submit estimates', data);
      });
    });
    };

   service.launchProject = function(projectId) {
    UserV3Service.getCurrentUser(function(user) {
    $http.put(apiUrl+'/copilots/'+user.id+'/projects/'+projectId+'',
      {"id": projectId, "estimate": service.workDetails[projectId].estimate, "status": "launched"}
      ).success(function(data, status, headers, config) {
       if (!service.workDetails[projectId]) {
            service.workDetails[projectId] = {}
        }
        service.workDetails[projectId].status = 'Launched';
      }).
      error(function(data, status, headers, config) {
        console.log('error on project launch', data);
      });
    });
    }

   service.projectAvailable = function(project, projectId) {
      var claimedProjectStatuses =
      ['Assigned',
      'Estimate',
      'Approved',
      'awaiting_launch',
      'Launched']
      if (service.workDetails[projectId]) {
        return claimedProjectStatuses.indexOf(service.workDetails[projectId].status) < 0
      } else {
      return project.status === 'Incomplete' || project.status === 'Submitted';
      }
   }

   service.showStatusComponent = function(projectId, status) {
      if (service.workDetails[projectId]) {
        return service.workDetails[projectId].status === status;
      }
   }

   service.openCreateChallenges = function(projectId) {
    if (service.workDetails[projectId]) {
      service.workDetails[projectId].status = 'awaiting_launch';
    }
   }

    return service;

  }
})();
