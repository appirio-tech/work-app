/* jshint -W117, -W030 */
describe('MultipleProjectController', function () {
  var controller;

  beforeEach(function () {
    bard.appModule('app.project.manage');
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function () {
    controller = $controller('MultipleProjectController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Multiple Project controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    describe('after activate', function () {
      it('should have title of Projects', function () {
        expect(controller.title).to.equal('Projects');
      });

      it('should have logged "Activated"', function () {
        expect($log.info.logs).to.match(/Activated/);
      });

      it('should have projects', function() {
        expect(controller.projects).to.be.defined;
      });
    });
  });
});
