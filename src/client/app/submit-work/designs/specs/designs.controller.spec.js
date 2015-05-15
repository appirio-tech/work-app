/* jshint -W117, -W030 */
describe('SubmitDesignsController', function () {
  var controller, scope;

  beforeEach(function () {
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function () {
    scope = $rootScope.$new();
    controller = $controller('SubmitDesignsController', {$scope: scope});
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Designs controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    describe('after activate', function () {
      it('should have title of Designs', function () {
        expect(controller.title).to.equal('Designs');
      });

      it('should be able to add filenames', function() {
        expect(controller.imageFilenames.length).to.equal(0);
        controller.filename = 'foo';
        controller.add();
        expect(controller.filename).to.equal('');
        expect(controller.imageFilenames.length).to.equal(1);
      });

    });
  });
});
