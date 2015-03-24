/* jshint -W117, -W030 */
describe('SubmitWorkService', function () {
  var service, scope;

  beforeEach(function () {
    bard.appModule('app.submit-work');
    bard.inject('SubmitWorkService');
  });

  beforeEach(function () {
    service = SubmitWorkService;
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Submit work service', function () {
    it('should be created successfully', function () {
      expect(service).to.be.defined;
    });

    it('should return an object for getCurrent()', function() {
      var cur = service.getCurrent();
      expect(cur).to.be.defined;
      expect(cur.name).to.equal('');
    });

    it('should be able to setName()', function() {
      service.setName('foobar');
      expect(service.getCurrent().name).to.equal('foobar');
    })

  });
});
