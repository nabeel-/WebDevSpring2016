(function() {
  'use strict';

  angular.module('TutorConnect').factory('ClassesService', function($rootScope, _) {

    var classes = [
      {'_id':111, 'userId':123, 'tutorId':321, 'tutorName': 'Dina', 'description':'Prepare for upcoming Math test', 'startTime': '2016-04-12 16:30', 'endTime': '2016-04-12 18:00'},
      {'_id':222, 'userId':234, 'tutorId':321, 'tutorName': 'Dina', 'description':'Prepare for upcoming History test', 'startTime': '2016-04-7 16:30', 'endTime': '2016-04-7 17:30'},
      {'_id':333, 'userId':123, 'tutorId':321, 'tutorName': 'Dina', 'description':'Extra help on Science homework', 'startTime': '2016-04-9 17:00', 'endTime': '2016-04-9 17:30'},
      {'_id':444, 'userId':234, 'tutorId':321, 'tutorName': 'Dina', 'description':'Extra help on Science homework', 'startTime': '2016-04-10 17:00', 'endTime': '2016-04-10 18:00'}
    ];

    function getAllClassesForUser(userId, callback) {
      var foundClasses = _.where(classes, {userId: userId});

      callback(foundClasses);
    }

    function cancelClassById(classId, userId, callback) {
      classes = _.reject(classes, function(c) { return c._id === classId; });

      getAllClassesForUser(userId, callback);
    }

    function updateClassById(classId, klass, callback) {
      for(var i in classes) {
        if(classes[i]._id === classId) {
          classes[i].description = klass.description;
          classes[i].startTime   = klass.startTime;
          classes[i].endTime     = klass.endTime;
          callback(classes[i]);
        }
      }
    }

    function addClassForUser(userId, klass, callback) {
      klass._id = new Date().toString();
      klass.userId = userId;

      classes.push(klass);
      getAllClassesForUser(userId, callback);
    }

    var service = {
      getAllClassesForUser : getAllClassesForUser,
      updateClassById: updateClassById,
      cancelClassById: cancelClassById,
      addClassForUser: addClassForUser
    };

    return service;
  });
})();