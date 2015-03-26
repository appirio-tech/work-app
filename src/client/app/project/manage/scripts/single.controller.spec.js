/* jshint -W117, -W030 */
describe('SingleProjectController', function () {
  var controller, scope;

  beforeEach(function () {
    bard.appModule('app.project.manage');
    bard.inject('$controller', '$log', '$rootScope', '$stateParams');
  });

  beforeEach(function () {
    scope = $rootScope.$new();
    controller = $controller('SingleProjectController',
      {$scope: scope, projectData: window.testData.projects[0], isNew: true});
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Single Project controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    describe('after activate', function () {
      it('should have title of Manage', function () {
        expect(controller.title).to.equal('Manage');
      });

      it('should have logged "Activated"', function () {
        expect($log.info.logs).to.match(/Activated/);
      });

      it('should have a project', function() {
        expect(controller.project).to.be.defined;
      });
    });
  });
});
