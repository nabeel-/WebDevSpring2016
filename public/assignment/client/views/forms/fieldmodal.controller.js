(function(){
  "use strict";

  angular.module("FormBuilderApp").controller("FieldModalController", FieldModalController);

  function FieldModalController($rootScope, $route, field, formId, FieldService, _) {
    
    var ctrl              = this,
        placeholder_types = ['TEXT', 'TEXTAREA', 'EMAIL', 'PASSWORD'],
        option_types      = ['OPTIONS', 'CHECKBOXES', 'RADIOS'];

    ctrl.field  = field;
    ctrl.formId = formId;

    ctrl.show_placeholder = _.contains(placeholder_types, ctrl.field.type);
    ctrl.show_options     = _.contains(option_types, ctrl.field.type);
    
    ctrl.label       = ctrl.field.label;
    ctrl.placeholder = ctrl.field.placeholder;
    ctrl.options     = showOptions(ctrl.field.options);

    function showOptions(opts) {
      var ret = "";
      _.each(opts, function(opt) {
        ret += opt.label + " : " + opt.value + "\n";
      });
      return ret;
    }

    function parseOptions(opts) {
      var ret = [];
      _.each(opts.split("\n"), function(opt) {
        var opt_arr = opt.split(":"),
            opt_obj = {label: opt_arr[0], value: opt_arr[1]};
        ret.push(opt_obj);
      });
      return ret;
    }

    ctrl.ok = function() {

      var field = {
        label: ctrl.label,
        placeholder: ctrl.placeholder,
        type: ctrl.field.type,
        options: parseOptions(ctrl.options)
      };

      FieldService.updateFieldForForm(ctrl.formId, ctrl.field._id, field).then(function(resp) {
        $route.reload();
        $rootScope.modalInstance.close();
      });
    }

    ctrl.cancel = function() {
      $rootScope.modalInstance.dismiss('cancel');
    }
  }
})();