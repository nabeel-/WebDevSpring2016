(function() {
  'use strict';

  angular.module('TutorConnect').factory('SearchService', function($http) {

    var service = {
      search : search,
      getCourseDetails: getCourseDetails
    };

    var API_BASE = '/api/project/search';

    function search(query) {
      return $http.get(API_BASE + '?search=' + query);
    }

    function getCourseDetails(courseId) {
      return $http.get(API_BASE + '/course/' + courseId);
    }

    return service;
  });
})();