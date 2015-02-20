/* jshint -W117, -W030 */
describe('project routes', function () {
  describe('state', function () {
    var controller;
    var list = 'app/projects/projects.html';

    beforeEach(function () {
      module('app.projects', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function () {
      $templateCache.put(list, '');
    });

    it('should map state projects to url /projects ', function () {
      expect($state.href('projects', {})).to.equal('/projects');
    });

    it('should map /projects route to projects List template', function () {
      expect($state.get('projects').templateUrl).to.equal(list);
    });

    it('of projects should work with $state.go', function () {
      $state.go('projects');
      $rootScope.$apply();
      expect($state.is('projects'));
    });
  });
});
