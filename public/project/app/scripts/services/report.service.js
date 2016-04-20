(function() {
  'use strict';

  angular.module('TutorConnect').factory('ReportService', function($http) {

    var service = {
      getAllReportsForStudent : getAllReportsForStudent,
      getAllReportsForTutor: getAllReportsForTutor,
      updateReportById: updateReportById,
      deleteReportById: deleteReportById,
      addReportForStudent: addReportForStudent,
      getReportForClass: getReportForClass
    };

    var API_BASE = '/api/project/report/';

    function getAllReportsForStudent(userId) {
      return $http.get(API_BASE + 'student/'+ userId);
    }

    function getAllReportsForTutor(userId) {
      return $http.get(API_BASE + 'tutor/'+ userId);
    }

    function getReportForClass(classId) {
      return $http.get(API_BASE + 'class/' + classId);
    }

    function deleteReportById(reportId) {
      return $http.delete(API_BASE + reportId);
    }

    function updateReportById(reportId, report) {
      return $http.put(API_BASE + reportId, report);
    }

    function addReportForStudent(submId, studId, report) {
      return $http.post(API_BASE + 'tutor/' + submId + '/student/' + studId, report);
    }

    return service;
  });
})();