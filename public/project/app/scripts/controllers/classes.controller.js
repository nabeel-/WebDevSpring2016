'use strict';
/**
 * @ngdoc function
 * @name TutorConnect.controller:ClassesCtrl
 * @description
 * # ClassesCtrl
 * Controller of the TutorConnect
 */
angular.module('TutorConnect')
  .controller('ClassesCtrl', function($rootScope, $uibModal, ClassesService, moment, _) {

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

    vm.editClass = function(classId) {
      var klass = _.findWhere(vm.my.classes, function(c) { return c._id === classId; });

      $rootScope.modal = $uibModal.open({
        templateUrl: '/views/classes/class-edit.view.html',
        controller: 'ClassEditCtrl',
        controllerAs: 'model',
        resolve: { klass: function() { return klass; }}
      });
    };

    vm.parseDate = function(string) {
      var date = string.split(' ')[0];

      return moment(date, 'YYYY-MM-DD').format('ddd, MMM Do');
    };

    vm.parseTime = function(string) {
      var time = string.split(' ')[1];

      return moment(time, 'HH:mm').format('h:mm A');
    };

  });