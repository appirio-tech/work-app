/* jshint -W117, -W030 */
describe('ProjectCreateController', function () {
  var controller, scope;

  beforeEach(function () {
    bard.appModule('app.project.create');
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function () {
    scope = $rootScope.$new();
    controller = $controller('ProjectCreateController', {$scope: scope});
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Create Project controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    describe('after activate', function () {
      it('should have title of Create', function () {
        expect(controller.title).to.equal('Create');
      });

      it('should have logged "Activated"', function () {
        expect($log.info.logs).to.match(/Activated/);
      });

      it('should have a new project', function() {
        expect(controller.newProject).to.be.defined;
      });

    });
  });
});
