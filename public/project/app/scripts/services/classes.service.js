(function() {
  'use strict';

  angular.module('TutorConnect').factory('ClassesService', function($http) {

    var API_BASE = 'http://localhost:3000/api/project/user/';

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

    var service = {
      getAllClassesForUser : getAllClassesForUser,
      updateClassById: updateClassById,
      cancelClassById: cancelClassById,
      addClassForUser: addClassForUser
    };

    return service;
  });
})();