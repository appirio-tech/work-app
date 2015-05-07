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

    it('should be able to format work requests', function() {
      var reqs = [{'requestType': 'design'}];
      reqs = service.formatWorkRequests(reqs);
      var req = reqs[0];
      expect(req.status).to.equal('Incomplete');
      expect(req.class).to.equal('incomplete');
      expect(req.message).to.equal('PROJECT SUBMISSION INCOMPLETE');
      expect(req.action).to.equal('<a>Continue setup</a>');
      expect(req.requestType).to.equal('Mobile: Design');
    });

  });
});
