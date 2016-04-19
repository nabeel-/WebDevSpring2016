'use strict';
/**
 * @ngdoc function
 * @name TutorConnect.controller:ReportModalCtrl
 * @description
 * # ReportModalCtrl
 * Controller of the TutorConnect
 */
angular.module('TutorConnect')
  .controller('ReportModalCtrl', function($uibModalInstance, $rootScope, $state, ReportService, moment, klass) {

    var vm = this;

    vm.klass = klass;
    vm.report = {};

    ReportService.getReportForClass(klass._id).then(function(resp) {
      if(resp.status === 200 && resp.data) {
        vm.report = resp.data;
        vm.rating = vm.report.rating;
        vm.comments = vm.report.comments;
      }
    });

    vm.my = $rootScope.currentUser;

    vm.add = function() {
      var report = {
        rating: vm.rating,
        comments: vm.comments,
        createdAt: new Date(),
        _class: vm.klass._id
      };

      ReportService.addReportForStudent(vm.my._id, vm.klass.userId._id, report).then(function(resp) {
        if(resp.status === 200) {
          $rootScope.modal.close();
        }
      });

    };

    vm.update = function() {
      vm.report.rating = vm.rating;
      vm.report.comments = vm.comments;

      ReportService.updateReportById(vm.report._id, vm.report).then(function(resp) {
        if(resp.status === 200) {
          $rootScope.modal.close();
        }
      });

    };

  });