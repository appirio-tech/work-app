/* jshint -W117, -W030 */
describe('User', function() {
  'use strict';

  var service;
  var flush;

  beforeEach(function() {
    bard.appModule('app.user');
    bard.inject(this, '$q', '$rootScope', 'ApiResource');
    flush = function() { $rootScope.$apply(); };
  });

  beforeEach(function() {
    bard.mockService(ApiResource['user'], {
      query: $.when(mockUser.getMockUserRequests()),
      get: $.when(mockUser.getMockUserRequest()),
      default: $q.when([])
    });
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('User API', function() {
    it('should be created successfully', function() {
      expect(ApiResource).to.be.defined;
      expect(ApiResource['user']).to.be.defined;
    });

    it('should return the array object for query', function() {
      ApiResource['work-request'].query().then(function(response) {
        expect(response).to.be.defined;
        expect(response).to.be.array;
        expect(response).to.have.length(1);
        expect(response).to.be.eql(mockUser.getMockUserRequests());
      });

      flush();
    });

    it('should return the object for get', function() {
      ApiResource['work-request'].get().then(function(response) {
        expect(response).to.be.defined;
        expect(response).to.be.object;
        expect(response).to.be.eql(mockUser.getMockUserRequest());
      });

      flush();
    });
  });
});
