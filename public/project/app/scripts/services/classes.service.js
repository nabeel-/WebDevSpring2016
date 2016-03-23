(function() {
  'use strict';

  angular.module('TutorConnect').factory('ClassesService', function($rootScope, _) {

    var classes = [
      {'_id':111, 'userId':123, 'name':'Math', 'tutorId':321},
      {'_id':222, 'userId':234, 'name':'History', 'tutorId':321},
      {'_id':333, 'userId':123, 'name':'Science', 'tutorId':321},
      {'_id':444, 'userId':234, 'name':'English', 'tutorId':321}
    ];

    function getAllClassesForUser(userId, callback) {
      var foundClasses = _.where(classes, {userId: userId});

      callback(foundClasses);
    }

    var service = {
      getAllClassesForUser : getAllClassesForUser
    };

    return service;
  });
})();