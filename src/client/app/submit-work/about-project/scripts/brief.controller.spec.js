/* jshint -W117, -W030 */
describe('SubmitBriefController', function () {
  var controller, scope;

  beforeEach(function () {
    bard.appModule('app.submit-work');
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function () {
    scope = $rootScope.$new();
    controller = $controller('SubmitBriefController', {$scope: scope});
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Brief controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    describe('after activate', function () {
      it('should have title of Brief', function () {
        expect(controller.title).to.equal('Brief');
      });

      it('should have logged "Activated"', function () {
        expect($log.info.logs).to.match(/Activated/);
      });

    });
  });
});