/* jshint -W117, -W030 */
describe('ChallengesController', function () {
  var controller, scope;

  beforeEach(function () {
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function () {
    scope = $rootScope.$new();
    controller = $controller('ChallengesController', {$scope: scope});
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Challenges controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });
  });
});
