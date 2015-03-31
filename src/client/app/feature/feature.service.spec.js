/* jshint -W117, -W030 */
describe('FeatureService', function () {
  var service;

  var featuresData= [
    {id: 'login', name: "Email/Username Login", explanation: "", description: "Login with an email or username", selected: false},
    {id: 'social-login', name: "Social Login", explanation: "", description: "Login with Twitter, Facebook, LinkedIn, or Google", selected: false},
    {id: 'profiles', name: "Profiles", explanation: "", description: "People can enter information about themselves", selected: false},
    {id: 'accept-payments', name: "Accept Payments", explanation: "", description: "Accept credit cards, PayPal, Bitcoin", selected: false},
    {id: 'ratings', name: "Ratings/Reviews", explanation: "", description: "People leave reviews and/or rate things", selected: false},
    {id: 'location', name: "Location-based or Navigation Element", explanation: "", description: "Location-based or Navigation Element", selected: false},
    {id: 'sharing', name: "Sharing Functions", explanation: "", description: "Share on Twitter, Facebook, Email", selected: false},
    {id: 'api', name: "An API", explanation: "", description: "Data can be connected with a website or other", selected: false},
    {id: 'search', name: "Search", explanation: "", description: "People can search/browse/filter", selected: false}
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
