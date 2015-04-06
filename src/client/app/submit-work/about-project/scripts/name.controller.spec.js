/* jshint -W117, -W030 */
describe('SubmitNameController', function () {
  var controller, scope;

  beforeEach(function () {
    bard.appModule('app.submit-work');
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function () {
    scope = $rootScope.$new();
    controller = $controller('SubmitNameController', {$scope: scope});
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Name controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    describe('after activate', function () {
      it('should have title of Name', function () {
        expect(controller.title).to.equal('Name');
      });
    });
  });
});
