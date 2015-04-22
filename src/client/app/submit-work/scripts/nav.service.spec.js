/* jshint -W117, -W030 */
describe('NavService', function () {
  var service, scope;

  beforeEach(function () {
    bard.inject('NavService');
  });

  beforeEach(function () {
    service = NavService;
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Nav service', function () {
    it('should be created successfully', function () {
      expect(service).to.be.defined;
    });

  });
});
