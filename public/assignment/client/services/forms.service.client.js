(function() {
  "use strict";

  angular.module("FormBuilderApp").factory("FormService", FormService);

  function FormService($rootScope, $http) {

    var API_BASE      = "/api/assignment/",
        API_BASE_FORM = API_BASE + "form/";

    function createFormForUser(userId, form) {
      return $http.post(API_BASE + userId + "/form", form);
    }

    function findAllFormsForUser(userId) {
      return $http.get(API_BASE + userId + "/form");
    }

    function deleteFormById(formId) {
      return $http.delete(API_BASE_FORM + formId);
    }

    function updateFormById(formId, newForm) {
      console.log(API_BASE_FORM + formId);
      console.log(newForm);
      return $http.put(API_BASE_FORM + formId, newForm);
    }

    var service = {
      createFormForUser: createFormForUser,
      findAllFormsForUser: findAllFormsForUser,
      deleteFormById: deleteFormById,
      updateFormById: updateFormById
    };

    return service;
  }
})();