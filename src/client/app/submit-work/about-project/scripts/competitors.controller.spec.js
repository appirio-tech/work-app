/* jshint -W117, -W030 */
describe('SubmitCompetitorsController', function () {
  var controller, scope;

  beforeEach(function () {
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function () {
    scope = $rootScope.$new();
    controller = $controller('SubmitCompetitorsController', {$scope: scope});
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Competitors controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    describe('after activate', function () {
      it('should have title of Competitors', function () {
        expect(controller.title).to.equal('Competitors');
      });

      it('should be able to add an appName', function() {
        expect(controller.work.competitorApps.length).to.equal(0);
        expect(controller.appName).to.equal('');
        controller.appName = 'New App';
        controller.add();
        expect(controller.work.competitorApps.length).to.equal(1);
        expect(controller.appName).to.equal('');
      });

    });
  });
});
