/* jshint -W117, -W030 */
describe('ViewWorkSingleController', function () {
  var controller, scope;

  beforeEach(function () {
    bard.appModule('app.view-work');
    bard.inject(this, '$controller', '$log', '$rootScope', '$q', 'ApiResource');
  });

  beforeEach(function () {
    scope = $rootScope.$new();

    controller = $controller('ViewWorkSingleController', {
      $scope: scope,
      workRequest: mockWorkRequest.getResponse('WorkRequest')
    });

    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('View Work Single controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    describe('after activate', function () {
      var workRequest = mockWorkRequest.getMockWorkRequest();
      it('should have title of the work request title', function () {
        expect(controller.title).to.equal(workRequest.title);
      });

      it('should have logged "Activated"', function () {
        expect($log.info.logs).to.match(/Activated/);
      });

      it('should have a Work Requests', function() {
        expect(controller.workRequest).to.be.eql(workRequest);
      });
    });
  });
});
