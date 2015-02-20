/* jshint -W117, -W030 */
describe('ProjectController', function () {
  var controller;

  beforeEach(function () {
    bard.appModule('app.projects');
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function () {
    controller = $controller('ProjectController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Project controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    describe('after activate', function () {
      it('should have title of Admin', function () {
        expect(controller.title).to.equal('Projects');
      });

      it('should have logged "Activated"', function () {
        expect($log.info.logs).to.match(/Activated/);
      });
    });
  });
});
