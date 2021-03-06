(function() {
  'use strict';

  angular.module('TutorConnect').factory('ClassesService', function($http) {

    var service = {
      getAllClassesForUser : getAllClassesForUser,
      updateClassById: updateClassById,
      cancelClassById: cancelClassById,
      addClassForUser: addClassForUser,
      getClassesForTutor: getClassesForTutor
    };

    var API_BASE = '/api/project/user/';

    function getAllClassesForUser(userId) {
      return $http.get(API_BASE + userId + '/classes');
    }

    function cancelClassById(classId, userId) {
      return $http.delete(API_BASE + userId + '/class/' + classId);
    }

    function updateClassById(userId, classId, klass) {
      return $http.put(API_BASE + userId + '/class/' + classId, klass);
    }

    function addClassForUser(userId, klass) {
      return $http.post(API_BASE + userId + '/class/', klass);
    }

    function getClassesForTutor(userId, tutorId) {
      return $http.get(API_BASE + userId + '/classes/tutor/' + tutorId);
    }

    return service;
  });
})();