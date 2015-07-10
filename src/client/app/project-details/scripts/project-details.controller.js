(function() {
'use strict';

angular
  .module('app.project-details')
  .controller('ProjectDetailsController', ProjectDetailsController);

ProjectDetailsController.$inject = ['$scope', '$rootScope', '$window', 'ProjectDetailsService', 'UserService', '$state', 'ThreadsAPIService', 'UserV3Service'];

function ProjectDetailsController ($scope, $rootScope, $window, ProjectDetailsService, UserService, $state, ThreadsAPIService, UserV3Service) {
  var vm = this;
  vm.work  =  ProjectDetailsService.work;
  vm.showClaimedModal = false;
  vm.showCreateChallengesModal = false;
  vm.showEstimatesButton = false;
  vm.threadId = null;

  //event listener for displaying modal
  $rootScope.$on('projectClaimed', function() {
   vm.showClaimedModal = true;
   vm.showEstimatesButton = true;
  });

  vm.submitClaim = function() {
    var copilotId = UserService.getCurrentUser().id;
    var projectId = vm.work.id;
    ProjectDetailsService.submitClaim(copilotId, projectId);
  }

  vm.projectAvailable = function() {
    //TODO: Eliminate incomplete once only submitted return
    return ProjectDetailsService.projectAvailable(vm.work, vm.work.id);
  }

  vm.hideClaimedModal = function() {
    vm.showClaimedModal  = false;
  }

  vm.openCreateChallenges = function() {
    $window.open('https://www.topcoder.com/direct/home.action', '_blank');
    ProjectDetailsService.openCreateChallenges(vm.work.id);
  }

  vm.hideCreateChallengesModal = function() {
    vm.showCreateChallengesModal = false;
  }

  vm.launchProject = function() {
    return ProjectDetailsService.launchProject(vm.work.id);
  }

  vm.showStatusComponent = function(status) {
    return ProjectDetailsService.showStatusComponent(vm.work.id, status);
  }

  vm.activate = function() {
 //create threadId for messaging
   var getOrCreateThread = function() {
      UserV3Service.getCurrentUser(function(user) {
        var params, publishers, resource, thread;
        publishers = [user.id, vm.work.ownerId];
        params = {
          clientIdentifier: vm.work.id,
          context: 'work',
          subject: vm.work.name,
          publishers: publishers,
          subscribers: publishers
        };
        thread = new ThreadsAPIService(params);
        resource = thread.$save();
        resource.then(function(response) {
          var ref, ref1;
          if (response.result.content.id) {
            vm.threadId = response.result.content.id;
          }
        });
      });
   }
    getOrCreateThread()
  }

  vm.activate()

}
})();