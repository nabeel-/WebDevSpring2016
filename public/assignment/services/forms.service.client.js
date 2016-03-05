(function() {
  "use strict";

  angular.module("FormBuilderApp").factory("FormService", FormService);

  function FormService($rootScope) {

    var forms = [{"_id": "000", "title": "Contacts", "userId": 123},
                 {"_id": "010", "title": "ToDo",     "userId": 123},
                 {"_id": "020", "title": "CDs",      "userId": 234}];

    function createFormForUser(userId, form, callback) {
      var _id = (new Date).getTime();

      form._id    = _id;
      form.userId = userId;
      forms.push(form);

      callback(forms);
    }

    function findAllFormsForUser(userId, callback) {
      var found_forms = _.where(forms, {userId: userId});

      callback(found_forms);
    }

    function deleteFormById(formId, callback) {
      forms = _.reject(forms, function(form) {
        return form._id == formId;
      });

      callback(forms);
    }

    function updateFormById(formId, newForm, callback) {
      var found_form = _.findWhere(forms, {_id: formId});

      if(found_form) { found_form = newForm; }
      
      callback(found_form);
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