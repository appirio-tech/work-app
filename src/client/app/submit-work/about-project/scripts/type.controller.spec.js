/* jshint -W117, -W030 */
describe('SubmitTypeController', function () {
  var controller, scope;

  beforeEach(function () {
    bard.appModule('app.submit-work');
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function () {
    scope = $rootScope.$new();
    controller = $controller('SubmitTypeController', {$scope: scope});
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Type controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    describe('after activate', function () {
      it('should have title of Type', function () {
        expect(controller.title).to.equal('Type');
      });

      it('should have logged "Activated"', function () {
        expect($log.info.logs).to.match(/Activated/);
      });

      it('should have vm.type', function() {
        expect(controller.type).to.equal(false);
      });

    });
  });
});
