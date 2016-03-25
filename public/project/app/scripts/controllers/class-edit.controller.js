'use strict';
/**
 * @ngdoc function
 * @name TutorConnect.controller:ClassEditCtrl
 * @description
 * # ClassEditCtrl
 * Controller of the TutorConnect
 */
angular.module('TutorConnect')
  .controller('ClassEditCtrl', function($uibModalInstance, $rootScope, $state, ClassesService, moment, klass) {

    var vm = this;

    vm.klass = klass;

    vm.my = $rootScope.currentUser;
    vm.description = klass.description;
    vm.dateObj =  moment({ year: moment(klass.startTime).year(),
                        month: moment(klass.startTime).month(),
                        day: moment(klass.startTime).date()
                    }).format('YYYY-MM-DD');

    vm.minDate = moment().format('YYYY-MM-DD');

    vm.startTime = moment(klass.startTime);
    vm.endTime   = moment(klass.endTime);

    var minStart  = moment(klass.startTime);
    minStart.hour(15);
    minStart.minute(30);
    vm.minStart = minStart;

    var maxStart = moment(klass.startTime);
    maxStart.hour(18);
    maxStart.minute(30);
    vm.maxStart = maxStart;

    vm.minEnd = vm.startTime.add(30, 'm');

    var maxEnd = moment(klass.endTime);
    maxEnd.hour(19);
    maxEnd.minute(30);
    vm.maxEnd = maxEnd;


    vm.options = {
      hopts: [4,5,6],
      mopts: [0,30]
    };

    vm.changed = function() {
      if (moment(vm.endTime).isBefore(moment(vm.startTime))) {
        vm.endTime = vm.minEnd = moment(vm.startTime).add(30, 'm');
      }
      vm.minEnd = moment(vm.startTime).add(30, 'm');
    };

    vm.save = function() {
      var sTime = moment.isMoment(vm.startTime) ? vm.startTime._i.toString().split(' ')[1] : vm.startTime.toString().split(' ')[4];
      var eTime = moment.isMoment(vm.endTime) ? vm.endTime._i.toString().split(' ')[1] : vm.endTime.toString().split(' ')[4];
      var date  = vm.date ? moment(vm.date.toString()).format('YYYY-MM-DD') : vm.dateObj;

      vm.klass.startTime = moment(date + ' ' + sTime).format('YYYY-MM-DD HH:mm');
      vm.klass.endTime   = moment(date + ' ' + eTime).format('YYYY-MM-DD HH:mm');

      vm.klass.description = vm.description;

      ClassesService.updateClassById(vm.klass._id, vm.klass, function() {
        $rootScope.modal.close();
      });

    };

  });