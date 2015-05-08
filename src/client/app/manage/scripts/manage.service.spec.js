/* jshint -W117, -W030 */
describe('ManageService', function () {
  var service, requests;

  beforeEach(function () {
    bard.inject(this, 'ManageService');
  });

  beforeEach(function () {
    service = ManageService;
    requests = mockWorkRequest.getResponse('WorkRequests')
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Manage Service', function () {
    it('should be created successfully', function () {
      expect(service).to.be.defined;
    });

  });
});
