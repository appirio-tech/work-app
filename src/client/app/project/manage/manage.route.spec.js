/* jshint -W117, -W030 */
describe('project routes', function () {
  describe('state', function () {
    var controller;
    var list = 'app/project/manage/multiple.html';

    beforeEach(function () {
      module('app.project.manage', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function () {
      $templateCache.put(list, '');
    });

    it('should map state multiple to url /projects ', function () {
      expect($state.href('multiple', {})).to.equal('/projects');
    });

    it('should map /projects route to projects List template', function () {
      expect($state.get('multiple').templateUrl).to.equal(list);
    });

    it('of projects should work with $state.go', function () {
      $state.go('multiple');
      $rootScope.$apply();
      expect($state.is('multiple'));
    });
  });
});
