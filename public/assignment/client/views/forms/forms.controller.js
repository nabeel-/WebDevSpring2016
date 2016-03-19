(function(){
  "use strict";

  angular.module("FormBuilderApp").controller("FormsController", FormsController);

  function FormsController($rootScope, $location, FormService) {

    var currentUser = $rootScope.currentUser,
        ctrl        = this;

    FormService.findAllFormsForUser(currentUser._id).then(function(resp) {
      ctrl.forms = resp.data;
    });
    
    ctrl.addForm = function(title) {
      if (title) {
        var form = { title: title }

        FormService.createFormForUser(currentUser._id, form).then(function(resp) {
          ctrl.forms.push(resp.data);
        });
      }
    }

    ctrl.deleteForm = function(ind) {
      var form = ctrl.forms[ind];
      FormService.deleteFormById(form._id).then(function(resp) {
        ctrl.forms = _.reject(resp.data, function(f) { return f.userId != currentUser._id; });
      });
    }

    ctrl.updateForm = function() {
      var form = { title: ctrl.title },
          id   = ctrl.selected;
      FormService.updateFormById(id, form).then(function(resp) {
        var ind = _.findIndex(ctrl.forms, function(f) {return f._id == id});
        ctrl.forms[ind] = resp.data;
      });
    }

    ctrl.selectForm = function(ind) {
      ctrl.selected = ctrl.forms[ind]._id;
      ctrl.title = ctrl.forms[ind].title;
    }

    ctrl.isSelected = function(form) {
      return ctrl.selected == form._id;
    }
  }
})();