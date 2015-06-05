/* jshint -W117, -W030 */
describe('SubmitTypeController', function () {
  var controller, scope;

  beforeEach(function () {
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
  });
});
