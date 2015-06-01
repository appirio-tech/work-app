// 'use strict'

// $compile = null
// $scope = null
// AuthServ = null
// element = null

// describe.only 'homeLinkDirective', ->
//   // beforeEach module('app.layout')
//   beforeEach inject (_$compile_, _$rootScope_) ->
//     $compile = _$compile_
//     $rootScope = _$rootScope_
//     // AuthServ = AuthService
//     element = $compile "<a></a>" ($rootScope)
//     $rootScope.$digest()

//     context 'when user is authenticated', ->
//       beforeEach ->
//         AuthServ.isAuthenticated = ->
//           return true

//       it 'should direct to "/manage" path', ->
//        expect(element.getAttribute('href')).to.equal('/manage')

    // it 'should not initally have an appName', ->
    //   expect(controller.appName).to.equal('')

    // describe 'after activate', ->
    //   it 'should have title of Competitors', ->
    //    expect(controller.title).to.equal('Competitors')

    // describe 'add competitor apps', ->
    //   beforeEach ->
    //     controller.appName = 'New App'
    //     controller.add()

    //   it 'should add an appName', ->
    //     expect(controller.work.competitorApps.length).to.equal(1)

    //   it 'should set appName to empty string', ->
    //     expect(controller.appName).to.equal('')


// describe('SubmitTypeController', function () {
//   var controller, scope;

//   beforeEach(function () {
//     bard.inject('$controller', '$log', '$rootScope');
//   });

//   beforeEach(function () {
//     scope = $rootScope.$new();
//     controller = $controller('SubmitTypeController', {$scope: scope});
//     $rootScope.$apply();
//   });

//   bard.verifyNoOutstandingHttpRequests();

//   describe('Type controller', function () {
//     it('should be created successfully', function () {
//       expect(controller).to.be.defined;
//     });
//   });
// });
