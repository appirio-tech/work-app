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

    describe('validation', function() {
      it('should be able to validate names', function() {
        // rule 0: req'd
        // rule 1: 3 char min
        var res = service.validateName('');
        expect(res.valid).to.equal(false);
        expect(res.required).to.equal(true);
        res = service.validateName('a');
        expect(res.valid).to.equal(false);
        expect(res.minlength).to.equal(true);
        // rule 2: must start with a letter
        res = service.validateName('!asd');
        expect(res.valid).to.equal(false);
        expect(res.letter).to.equal(true);
        // rule 3: must be <= 50 char length
        // this one will just use maxlength

        res = service.validateName('foo');
        expect(res.valid).to.equal(true);
      });

      it('should be able to validate summary', function() {
        // rule 0: field required
        var res = service.validateSummary('');
        expect(res.valid).to.equal(false);
        expect(res.required).to.equal(true);

        // rule 1: must be at least 200 characters
        res = service.validateSummary('asdf');
        expect(res.valid).to.equal(false);
        expect(res.minlength).to.equal(true);

        res = service.validateSummary('aasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfsdf');
        expect(res.valid).to.equal(false);
        expect(res.minlength).to.equal(true);

        var str = '0123456789';
        str = str + str + str + str + str;
        str = str + str + str + str;
        res = service.validateSummary(str);
        expect(res.valid).to.equal(true);
      });

      it('should be able to validate usageDescription', function() {
        // rule 0: field required
        var res = service.validateUsageDescription('');
        expect(res.valid).to.equal(false);
        expect(res.required).to.equal(true);
      });
    });

    it('should have a default price of 0', function() {
      service.current.features = [];
      expect(service.getEstimate().low).to.equal(0);
    });


    it('should be able to calculate a price', function() {
      service.current.features = [];
      service.current.requestType='design';
      expect(service.getEstimate().low).to.equal(2000);
      expect(service.getEstimate().high).to.equal(2000);
      service.current.features = [{selected: true}];
      expect(service.getEstimate().low).to.equal(2800);
      expect(service.getEstimate().high).to.equal(3200);
      service.current.features = [{selected: true}, {selected: true}, {selected: true}];
      expect(service.getEstimate().low).to.equal(4400);
      expect(service.getEstimate().high).to.equal(5600);
      service.current.features = [{selected: false}, {selected: true}, {selected: true}];
      expect(service.getEstimate().low).to.equal(3600);
      expect(service.getEstimate().high).to.equal(4400);
    })

  });
});
