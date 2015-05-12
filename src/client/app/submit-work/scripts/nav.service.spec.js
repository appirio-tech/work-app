/* jshint -W117, -W030 */
describe('NavService', function () {
  var service, scope;

  beforeEach(function () {
    bard.inject('NavService');
  });

  beforeEach(function() {
    service = NavService;
    service.states = service.states.map(function(state) {
      state.$setPristine  = function() {};
      state.$setUntouched = function() {};
      return state;
    });
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Nav service', function () {
    it('should be created successfully', function () {
      expect(service).to.be.defined;
    });

  });
});
