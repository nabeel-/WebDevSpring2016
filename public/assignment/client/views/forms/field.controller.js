(function(){
  "use strict";

  angular.module("FormBuilderApp").controller("FieldController", FieldController);

  function FieldController($rootScope, $uibModal, $routeParams, FieldService) {
  
    var formId = $routeParams.formId,
        ctrl   = this;

    FieldService.getFieldsForForm(formId).then(function(resp) {
      if (resp.data) { ctrl.fields = resp.data.fields; }
    });

    ctrl.showEditModal = function(field) {
      $rootScope.modalInstance = $uibModal.open({
        templateUrl: 'client/views/forms/fieldmodal.view.html',
        controller: 'FieldModalController as ctrl',
        resolve: {
          field: function () {
            return field;
          },
          formId: function() {
            return formId;
          }
        }
      });
    }

    ctrl.cloneField = function(field) {
      FieldService.createFieldForForm(formId, field).then(function(resp) {
        ctrl.fields = resp.data.fields;
      });
    }

    ctrl.addField = function(fieldType) {
      var field = getTemplate(fieldType);
      FieldService.createFieldForForm(formId, field).then(function(resp) {
        ctrl.fields = resp.data.fields;
      });
    }

    ctrl.removeField = function(field) {
      FieldService.deleteFieldFromForm(formId, field._id).then(function(resp) {
        ctrl.fields = resp.data.fields;
      });
    }

    function getTemplate(type) {
      switch(type) {
        case "text":
          return {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
        case "textarea":
          return {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
        case "date":
          return {"label": "New Date Field", "type": "DATE"};
        case "options":
          var r = {"label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
            ]};
          return r;
        case "radios":
          var r = {"label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
            ]};
          return r;
        case "checkboxes":
          var r = {"label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
            ]};
          return r;
      }
    }
  }
})();