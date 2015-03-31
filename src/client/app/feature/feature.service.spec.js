/* jshint -W117, -W030 */
describe('FeatureService', function () {
  var service;

  var  featuresData= [
    {name: "Email/Username Login", explanation: "", description: "Description"},
    {name: "Social Login", explanation: "", description: "Description"},
    {name: "Profiles", explanation: "", description: "Description"},
    {name: "Accept Payments", explanation: "", description: "Description"},
    {name: "Ratings/Reviews", explanation: "", description: "Description"},
    {name: "Location-based or Navigation Element", explanation: "", description: "Description"},
    {name: "Sharing Functions", explanation: "", description: "Description"},
    {name: "An API", explanation: "", description: "Description"},
    {name: "Search", explanation: "", description: "Description"}
  ];

  beforeEach(function () {
    bard.appModule('app.feature');
    bard.inject('FeatureService', '$q', '$rootScope');
  });

  beforeEach(function () {
    service = FeatureService;
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Feature Promises', function () {
    it('should be created successfully', function () {
      expect(service).to.be.defined;
    });

    it('should return a promise for getFeatures()', function() {
      var Features = service.getFeatures();

      Features.then(function(reponse) {
        expect(reponse).to.be.ok;
        expect(reponse).eql(featuresData);

        expect(reponse).to.be.a('array');
        expect(reponse).to.be.length(9);
      });
    });
  });
});
