/* jshint -W117, -W030 */
describe('create routes', function () {
  describe('state', function () {
    var controller;
    var list = 'app/project-create/create.html';

    beforeEach(function () {
      module('app.project-create', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function () {
      $templateCache.put(list, '');
    });

    it('should map state create to url /create ', function () {
      expect($state.href('create', {})).to.equal('/create');
    });

    it('should map /create route to create template', function () {
      expect($state.get('create').templateUrl).to.equal(list);
    });

    it('of projects should work with $state.go', function () {
      $state.go('create');
      $rootScope.$apply();
      expect($state.is('create'));
    });
  });
});
