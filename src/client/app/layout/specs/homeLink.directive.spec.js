'use strict';
describe('HomeLinkDirective', function() {
  var $compile,
  $rootScope,
  AuthService,
  element;

  beforeEach(inject(function(_$compile_, _$rootScope_, _AuthService_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    AuthService = _AuthService_;
    element = $compile("<a ng-home-link=true href={{getPath()}}></a>")($rootScope);
  }));


 context('when the user is authenticated', function() {
  beforeEach(function() {
    AuthService.isAuthenticated = function() {
      return true;
    }
    $rootScope.$digest();
  });

  it('should set the ASP path to manage page "#/manage"', function() {
    expect(element.attr('href')).to.equal("#/manage")
  });
 });

 context('when the user is not authenticated', function() {
  beforeEach(function() {
    AuthService.isAuthenticated = function() {
      return false;
    }
    $rootScope.$digest();
  });

  it('should set the ASP path to landing page "#/"', function() {
    expect(element.attr('href')).to.equal("#/")
  });
});
});