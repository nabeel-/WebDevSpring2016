'use strict';
/**
 * @ngdoc function
 * @name TutorConnect.controller:ChartCtrl
 * @description
 * # ChartCtrl
 * Controller of the TutorConnect
 */
 angular.module('TutorConnect')
 .controller('ChartCtrl', function ($rootScope, ReportService, _) {
  var vm = this;
  
  init();

  function init() {
    vm.my = $rootScope.currentUser;
    vm.my.reports = [];
    vm.isTutor = vm.my.roles[0] === 'tutor';
    vm.line = {};

    if(vm.isTutor) {
      ReportService.getAllReportsForTutor(vm.my._id).then(handleResponse);
    } else {
      ReportService.getAllReportsForStudent(vm.my._id).then(handleResponse);
    }
  }

  // Helper function to abstract over response from report service
  function handleResponse(resp) {
    if(resp.status === 200) {
      vm.my.reports = resp.data;
      vm.labels = _.pluck(vm.my.reports, 'createdAt');
      vm.data   = _.pluck(vm.my.reports, 'rating');

      vm.line = {
       labels: vm.labels,
       series: [vm.my.firstName],
       data: [vm.data],
       onClick: function (points, evt) {
         console.log(points, evt);
       }
     };
   }
  }

});