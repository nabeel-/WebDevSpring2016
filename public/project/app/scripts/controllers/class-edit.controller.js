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

    vm.save    = save;
    vm.changed = changed;

    init();

    function init() {
      vm.my = $rootScope.currentUser;

      vm.klass       = klass;
      vm.description = klass.description;

      vm.dateObj =  moment({ year: moment(klass.startTime).year(),
                             month: moment(klass.startTime).month(),
                             day: moment(klass.startTime).date()
                          }).format('YYYY-MM-DD');

      var minStart = moment(klass.startTime);
      var maxStart = moment(klass.startTime);
      var maxEnd   = moment(klass.endTime);

      minStart.hour(15);
      minStart.minute(30);
      maxStart.hour(18);
      maxStart.minute(30);
      maxEnd.hour(19);
      maxEnd.minute(30);

      vm.startTime = moment(klass.startTime);
      vm.endTime   = moment(klass.endTime);
      vm.maxStart  = maxStart;
      vm.minStart  = minStart;
      vm.minEnd    = vm.startTime.add(30, 'm');
      vm.maxEnd    = maxEnd;
      vm.minDate   = moment().format('YYYY-MM-DD');
      

      vm.options = {
        hopts: [4,5,6],
        mopts: [0,30]
      };
    }

    function changed() {
      if (moment(vm.endTime).isBefore(moment(vm.startTime))) {
        vm.endTime = vm.minEnd = moment(vm.startTime).add(30, 'm');
      }
      vm.minEnd = moment(vm.startTime).add(30, 'm');
    };

    function save() {
      var sTime = moment.isMoment(vm.startTime) ? vm.startTime._i.toString().split(' ')[1] : vm.startTime.toString().split(' ')[4];
      var eTime = moment.isMoment(vm.endTime) ? vm.endTime._i.toString().split(' ')[1] : vm.endTime.toString().split(' ')[4];
      var date  = vm.date ? moment(vm.date.toString()).format('YYYY-MM-DD') : vm.dateObj;

      vm.klass.startTime = moment(date + ' ' + sTime).format('YYYY-MM-DD HH:mm');
      vm.klass.endTime   = moment(date + ' ' + eTime).format('YYYY-MM-DD HH:mm');

      vm.klass.description = vm.description;

      ClassesService.updateClassById(vm.my._id, vm.klass._id, vm.klass).then(function(resp) {
        if(resp.status === 200) {
          $rootScope.modal.close();
        }
      });
    };

  });