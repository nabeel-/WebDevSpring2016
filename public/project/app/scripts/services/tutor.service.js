(function() {
  'use strict';

  angular.module('TutorConnect').factory('TutorService', function($http) {

    var API_BASE = 'http://localhost:3000/api/project/tutor/';

    function getAllTutors() {
      return $http.get(API_BASE);
    }

    function getSubjectsForTutor(tutorId) {
      return $http.get(API_BASE + tutorId);
    }

    function createTutorWithUser(userId, tutor) {
      return $http.post(API_BASE + 'user/' + userId, tutor);
    }

    function updateTutorById(tutorId, tutor) {
      return $http.put(API_BASE + tutorId, tutor);
    }

    var service = {
      getAllTutors: getAllTutors,
      getSubjectsForTutor : getSubjectsForTutor,
      createTutorWithUser: createTutorWithUser,
      updateTutorById: updateTutorById
    };

    return service;
  });
})();