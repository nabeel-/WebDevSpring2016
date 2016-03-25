(function() {
  'use strict';

  angular.module('TutorConnect').factory('TutorService', function($rootScope, _) {

    var tutors = [{_id:321, name:'Dina'}, 
                  {_id:333, name:'Nick'}, 
                  {_id:454, name:'Mohamed'}, 
                  {_id:222, name:'Amirah'}];

    function getAllTutors(callback) {
      callback(tutors);
    }

    function getTutorById(tutorId, callback) {
      var foundTutor = _.findWhere(tutors, function(t) { return t._id === tutorId; });

      callback(foundTutor);
    }

    var service = {
      getAllTutors : getAllTutors,
      getTutorById: getTutorById
    };

    return service;
  });
})();