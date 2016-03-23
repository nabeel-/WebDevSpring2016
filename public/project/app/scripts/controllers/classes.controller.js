'use strict';
/**
 * @ngdoc function
 * @name TutorConnect.controller:ClassesCtrl
 * @description
 * # ClassesCtrl
 * Controller of the TutorConnect
 */
angular.module('TutorConnect')
  .controller('ClassesCtrl', function($rootScope, ClassesService) {

    var vm = this;

    vm.my = $rootScope.currentUser;
    ClassesService.getAllClassesForUser(vm.my._id, function(data) {
      vm.my.classes = data;
    });

  });