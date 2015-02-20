/* jshint -W117, -W030 */
describe('CreateController', function () {
  var controller;

  beforeEach(function () {
    bard.appModule('app.create');
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function () {
    controller = $controller('CreateController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Create controller', function () {
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

    });
  });
});
