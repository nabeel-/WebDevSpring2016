(function() {
  'use strict';

  angular.module('TutorConnect').factory('ClassesService', function($rootScope, _) {

    var classes = [
      {'_id':111, 'userId':123, 'tutorId':321, 'tutorName': 'Dina', 'description':'Prepare for upcoming Math test', 'startTime': '04:30PM', 'endTime': '06:00PM', 'date': '04/12/16'},
      {'_id':222, 'userId':234, 'tutorId':321, 'tutorName': 'Dina', 'description':'Prepare for upcoming History test', 'startTime': '04:30PM', 'endTime': '05:30PM', 'date': '04/7/16'},
      {'_id':333, 'userId':123, 'tutorId':321, 'tutorName': 'Dina', 'description':'Extra help on Science homework', 'startTime': '05:00PM', 'endTime': '05:30PM', 'date': '04/9/16'},
      {'_id':444, 'userId':234, 'tutorId':321, 'tutorName': 'Dina', 'description':'Extra help on Science homework', 'startTime': '05:00PM', 'endTime': '06:00PM', 'date': '04/10/16'}
    ];

    function getAllClassesForUser(userId, callback) {
      var foundClasses = _.where(classes, {userId: userId});

      callback(foundClasses);
    }

    function cancelClassById(classId, userId, callback) {
      classes = _.reject(classes, function(c) { return c._id === classId; });

      getAllClassesForUser(userId, callback);
    }

    var service = {
      getAllClassesForUser : getAllClassesForUser,
      cancelClassById: cancelClassById
    };

    return service;
  });
})();