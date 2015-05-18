// /* jshint -W117, -W030 */
// describe('ManageController', function () {
//   var controller, scope;

//   beforeEach(function () {
//     bard.inject(this, '$controller', '$log', '$rootScope', '$q', 'ApiResource');
//   });

//   beforeEach(function () {
//     scope = $rootScope.$new();

//     controller = $controller('ManageController', {
//       $scope: scope,
//       workRequests: mockWorkRequest.getResponse('WorkRequests').result.content
//     });

//     $rootScope.$apply();
//   });

//   bard.verifyNoOutstandingHttpRequests();

//   describe('View Work Multiple controller', function () {
//     it('should be created successfully', function () {
//       expect(controller).to.be.defined;
//     });

//     describe('after activate', function () {
//       it('should have title of "Work Requests', function () {
//         expect(controller.title).to.equal('Work Requests');
//       });

//       it('should have logged "Activated"', function () {
//         expect($log.info.logs).to.match(/Activated/);
//       });

//       it('should have an array of Work Requests', function() {
//         expect(controller.workRequest).to.be.array;
//       });
//     });
//   });
// });
