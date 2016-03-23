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

    // Used for sorting classes. Uses 'klass' because 'class' is reserved word
    vm.sortClasses = function(klass) {
      return new Date(klass.date);
    };

    vm.cancelClass = function(classId) {
      ClassesService.cancelClassById(classId, vm.my._id, function(data) {
        vm.my.classes = data;
      });
    };

  });