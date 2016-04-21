'use strict';
/**
 * @ngdoc function
 * @name TutorConnect.controller:SearchDetailCtrl
 * @description
 * # SearchDetailCtrl
 * Controller of the TutorConnect
 */
angular.module('TutorConnect')
  .controller('SearchDetailCtrl', function($uibModalInstance, $rootScope, $state, $sce, SearchService, course) {

    var vm = this;

    init();

    function init() {
      vm.course = course;
      vm.done   = false;

      SearchService.getCourseDetails(vm.course.id).then(function(resp) {
        if(resp) {
          vm.detail = resp.data;
          vm.description = $sce.trustAsHtml(vm.detail.description);
          vm.done = true;
        }
      });
      
    }

  });