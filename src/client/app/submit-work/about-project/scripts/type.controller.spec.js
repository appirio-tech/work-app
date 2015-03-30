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

      it('should be able to select different app types', function() {
        expect(controller.designButtonStyle).to.equal('');
        expect(controller.codeButtonStyle).to.equal('');
        expect(controller.bothButtonStyle).to.equal('');
        controller.select('design');
        expect(controller.designButtonStyle).to.equal('selected');
        expect(controller.codeButtonStyle).to.equal('');
        expect(controller.bothButtonStyle).to.equal('');
        controller.select('code');
        expect(controller.designButtonStyle).to.equal('');
        expect(controller.codeButtonStyle).to.equal('selected');
        expect(controller.bothButtonStyle).to.equal('');
        controller.select('both');
        expect(controller.designButtonStyle).to.equal('');
        expect(controller.codeButtonStyle).to.equal('');
        expect(controller.bothButtonStyle).to.equal('selected');
      })

    });
  });
});
