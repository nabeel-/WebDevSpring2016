'use strict';
/**
 * @ngdoc function
 * @name TutorConnect.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the TutorConnect
 */
angular.module('TutorConnect')
  .controller('MainCtrl', function($rootScope, $state, TutorService, ClassesService) {
    var vm = this;
    
    vm.classNames = ['Math', 'Science', 'History', 'English', 'Spanish', 'French'];
    vm.myClassNames = [];

    vm.nextBlock = {};

    vm.my = $rootScope.currentUser;

    vm.isTutor = vm.my.roles[0] === 'tutor';
    vm.my.tutor = vm.my.classes = null;

    if(vm.isTutor) {
      TutorService.getTutorFromUserId(vm.my._id).then(function(resp) {
        if(resp.status === 200 && resp.data) {
          vm.my.tutor = resp.data;
          TutorService.getSubjectsForTutor(vm.my.tutor._id).then(function(resp) {
            if(resp.status === 200 && resp.data) {
              vm.my.subjects = resp.data.subjects;
            }
          });

          ClassesService.getClassesForTutor(vm.my._id, vm.my.tutor._id).then(function(resp) {
            if(resp.status === 200 && resp.data) {
              vm.nextBlock.date = resp.data[0].startTime.split(' ')[0];
            }
          });
        }
      });
    } else {
      ClassesService.getAllClassesForUser(vm.my._id).then(function(resp) {
        if(resp.status === 200 && resp.data) {
          vm.nextBlock.date = resp.data[0].startTime.split(' ')[0];
        }
      });
    }

    vm.toggle = function(className) {
      var idx = vm.myClassNames.indexOf(className);

      if (idx > -1) { 
        vm.myClassNames.splice(idx, 1); 
      } else { 
        vm.myClassNames.push(className); 
      }
    };

    vm.createTutor = function() {

      var tutor = {
        subjects: vm.myClassNames
      };

      TutorService.createTutorWithUser(vm.my._id, tutor).then(function(resp) {
        if(resp.status === 200) {
          $state.go('dashboard.home');
        }
      });
    }; 
    
  });
