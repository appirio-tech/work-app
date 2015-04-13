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

    it('should return an object for work', function() {
      var cur = service.work;
      expect(cur).to.be.defined;
      expect(cur.name).to.equal(null);
    });

    it('should have a default price of 0', function() {
      service.work.features = [];
      expect(service.work.price).to.equal(null);
    });


    it('should be able to calculate a price', function() {
      // This should be split into multiple assertions/context
      service.work.features = [];
      service.work.requestType = 'design';
      service.updatePrice();
      expect(service.work.price).to.equal('$2000');

      service.work.features = [{selected: true}];
      service.updatePrice();
      expect(service.work.price).to.equal('$2800');

      service.work.features = [{selected: true}, {selected: true}, {selected: true}];
      service.updatePrice();

      expect(service.work.price).to.equal('$4400');

      service.work.features = [{selected: false}, {selected: true}, {selected: true}];
      service.updatePrice();
      expect(service.work.price).to.equal('$3600');
    })

  });
});
