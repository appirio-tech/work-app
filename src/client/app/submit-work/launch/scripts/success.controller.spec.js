/* jshint -W117, -W030 */
describe('SubmitSuccessController', function () {
  var controller, scope;

  beforeEach(function () {
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function () {
    scope = $rootScope.$new();
    controller = $controller('SubmitSuccessController', {$scope: scope});
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Success controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    describe('after activate', function () {
      it('should have title of Success', function () {
        expect(controller.title).to.equal('Success');
      });
    });
  });
});
