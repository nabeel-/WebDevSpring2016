'use strict';
/**
 * @ngdoc function
 * @name TutorConnect.controller:ClassesCtrl
 * @description
 * # ClassesCtrl
 * Controller of the TutorConnect
 */
angular.module('TutorConnect')
  .controller('ClassesCtrl', function($rootScope, $uibModal, $state, ClassesService, TutorService, ReportService, moment, _) {
    var vm = this;

    vm.addBlock         = addBlock;
    vm.editClass        = editClass;
    vm.addReport        = addReport;
    vm.parseDate        = parseDate;
    vm.parseTime        = parseTime;
    vm.editReport       = editReport;
    vm.sortClasses      = sortClasses;
    vm.cancelClass      = cancelClass;
    vm.startTimeChanged = startTimeChanged;

    init();

    function init() {
      vm.my = $rootScope.currentUser;
      vm.isTutor = vm.my.roles[0] === 'tutor';
       // New klass for potentially adding
      vm.newKlass = {};

      vm.date = new Date();

      vm.minStart = vm.newKlass.startTime = new Date().setHours(15, 30);
      vm.minEnd   = vm.newKlass.endTime   = new Date().setHours(16, 0);

      vm.maxStart = new Date().setHours(19, 0);
      vm.maxEnd   = new Date().setHours(19, 30);

      if(vm.isTutor) {
        TutorService.getTutorFromUserId(vm.my._id).then(function(resp) {
          if(resp.status === 200 && resp.data) {
            vm.my.tutor = resp.data;

            ClassesService.getClassesForTutor(vm.my._id, vm.my.tutor._id).then(function(resp) {
              if(resp.status === 200 && resp.data) {
                vm.my.classes = resp.data;

                _.each(vm.my.classes, function(c) {
                  ReportService.getReportForClass(c._id).then(function(resp) {
                    if(resp.status === 200  && resp.data) {
                      c.report = resp.data;
                    }
                  });
                });
              }
            });
          }
        });
      } else {
        TutorService.getAllTutors().then(function(resp) {
          if(resp.status === 200) {
            vm.tutors = resp.data;
          }
        });

        ClassesService.getAllClassesForUser(vm.my._id).then(function(resp) {
          if(resp.status === 200) {
            vm.my.classes = resp.data;
            _.each(vm.my.classes, function(c) {
              TutorService.getTutorFromUserId(c.tutorId.userId).then(function(resp) {
                c.tutorName = resp.data.userId.firstName;
              });
            });
          }
        });
      }
    }
    
    // Used for sorting classes. Uses 'klass' because 'class' is reserved word
    function sortClasses(klass) {
      return new Date(klass.date);
    };

    function cancelClass(classId) {
      ClassesService.cancelClassById(classId, vm.my._id).then(function(resp) {
        if(resp.status === 200) {
          vm.my.classes = _.reject(vm.my.classes, function(c) { return c._id === resp.data._id; });
        }
      });
    };

    function editClass(classId) {
      var klass = _.findWhere(vm.my.classes, {_id: classId});

      $rootScope.modal = $uibModal.open({
        templateUrl: 'views/classes/class-edit.view.html',
        controller: 'ClassEditCtrl',
        controllerAs: 'model',
        resolve: { klass: function() { return klass; }}
      });
    };

    function addReport(classId) {
      var klass = _.findWhere(vm.my.classes, {_id: classId});

      $rootScope.modal = $uibModal.open({
        templateUrl: 'views/report/report-add.view.html',
        controller: 'ReportModalCtrl',
        controllerAs: 'model',
        resolve: { klass: function() { return klass; }}
      });
    };

    function editReport(classId) {
      var klass = _.findWhere(vm.my.classes, {_id: classId});

      $rootScope.modal = $uibModal.open({
        templateUrl: 'views/report/report-edit.view.html',
        controller: 'ReportModalCtrl',
        controllerAs: 'model',
        resolve: { klass: function() { return klass; }}
      });
    };

    function parseDate(string) {
      var date = string.split(' ')[0];

      return moment(date, 'YYYY-MM-DD').format('ddd, MMM Do');
    };

    function parseTime(string) {
      var time = string.split(' ')[1];

      return moment(time, 'HH:mm').format('h:mm A');
    };

    function startTimeChanged() {
      
      var startMoment = moment(vm.newKlass.startTime),
          endMoment   = moment(vm.newKlass.endTime);

      var newEnd = startMoment.minutes() === 0 ? 
            new Date(vm.newKlass.startTime).setMinutes(30) : 
            new Date(vm.newKlass.startTime).setHours(startMoment.hours() + 1, 0);

      vm.minEnd = newEnd;

      if(endMoment.isBefore(startMoment)) {
        vm.newKlass.endTime = new Date(newEnd);
      }
    };

    function addBlock() {
      if(!(vm.newKlass.startTime instanceof Date)) {
        vm.newKlass.startTime = new Date(vm.newKlass.startTime);
      }
      if(!(vm.newKlass.endTime instanceof Date)) {
        vm.newKlass.endTime = new Date(vm.newKlass.endTime);
      }
      vm.newKlass.startTime.setFullYear(vm.date.getFullYear(), vm.date.getMonth(), vm.date.getDate());
      vm.newKlass.endTime.setFullYear(vm.date.getFullYear(), vm.date.getMonth(), vm.date.getDate());

      vm.newKlass.startTime = moment(vm.newKlass.startTime).format('YYYY-MM-DD HH:mm');
      vm.newKlass.endTime   = moment(vm.newKlass.endTime).format('YYYY-MM-DD HH:mm');

      vm.newKlass.tutorId   = vm.newKlass.tutor._id;
      vm.newKlass.tutorName = vm.newKlass.tutor.name;

      ClassesService.addClassForUser(vm.my._id, vm.newKlass).then(function(resp) {
        if(resp) {
          resp.data.tutorName = vm.newKlass.tutor.userId.firstName;
          vm.my.classes.push(resp.data);
          $state.go('dashboard.classes');
        }
      });
    };
  });