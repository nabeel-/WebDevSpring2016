(function() {
  "use strict";

  angular.module("FormBuilderApp").factory("FieldService", FieldService);

  function FieldService($rootScope, $http) {

    var API_BASE = "/api/assignment/form/";

    function getFieldsForForm(formId) {
      return $http.get( API_BASE + formId + "/fields");
    }

    function getFieldForForm(formId, fieldId) {
      return $http.get(API_BASE + formId + "/field/" + fieldId);
    }

    function deleteFieldFromForm(formId, fieldId) {
      return $http.delete(API_BASE + formId + "/field/" + fieldId);
    }

    function createFieldForForm(formId, field) {
      return $http.post(API_BASE + formId + "/field", field);
    }

    function updateFieldForForm(formId, fieldId, field) {
      return $http.put(API_BASE + formId + "/field/" + fieldId, field);
    }

    var service = {
      getFieldsForForm: getFieldsForForm,
      getFieldForForm: getFieldForForm,
      deleteFieldFromForm: deleteFieldFromForm,
      createFieldForForm: createFieldForForm,
      updateFieldForForm: updateFieldForForm
    };

    return service;
  }
})();