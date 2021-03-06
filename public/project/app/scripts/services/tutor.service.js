(function() {
  'use strict';

  angular.module('TutorConnect').factory('TutorService', function($http) {

    var service = {
      getAllTutors: getAllTutors,
      getTutorFromUserId: getTutorFromUserId,
      getSubjectsForTutor : getSubjectsForTutor,
      createTutorWithUser: createTutorWithUser,
      updateTutorById: updateTutorById
    };

    var API_BASE = '/api/project/tutor/';

    function getAllTutors() {
      return $http.get(API_BASE);
    }

    function getTutorFromUserId(userId) {
      return $http.get(API_BASE + 'user/' + userId);
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

    return service;
  });
})();