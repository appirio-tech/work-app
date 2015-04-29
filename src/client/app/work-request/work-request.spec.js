/* jshint -W117, -W030 */
describe('WorkRequest', function() {
  'use strict';

  var service;
  var flush;

  beforeEach(function() {
    bard.inject(this, '$q', '$rootScope', 'ApiResource');
    flush = function() { $rootScope.$apply(); };
  });

  beforeEach(function() {
    bard.mockService(ApiResource['work-request'], {
      query: $.when(mockWorkRequest.getMockWorkRequests()),
      get: $.when(mockWorkRequest.getMockWorkRequest()),
      default: $q.when([])
    });
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('WorkRequest API', function() {
    it('should be created successfully', function() {
      expect(ApiResource).to.be.defined;
      expect(ApiResource['work-request']).to.be.defined;
    });

    it('should return the array object for query', function() {
      ApiResource['work-request'].query().then(function(response) {
        expect(response).to.be.defined;
        expect(response).to.be.array;
        expect(response).to.have.length(1);
        expect(response).to.be.eql(mockWorkRequest.getMockWorkRequests());
      });

      flush();
    });

    it('should return the object for get', function() {
      ApiResource['work-request'].get().then(function(response) {
        expect(response).to.be.defined;
        expect(response).to.be.object;
        expect(response).to.be.eql(mockWorkRequest.getMockWorkRequest());
      });

      flush();
    });
  });
});
