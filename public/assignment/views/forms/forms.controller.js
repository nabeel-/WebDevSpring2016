(function(){
  "use strict";

  angular.module("FormBuilderApp").controller("FormsController", FormsController);

  function FormsController($scope, $rootScope, $location, FormService) {

    var currentUser = $rootScope.currentUser;

    FormService.findAllFormsForUser(currentUser._id, function(forms) {
      $scope.forms = forms;
    });

    $scope.addForm = function() {
      if ($scope.title) {
        var form = { title: $scope.formTitle }

        FormService.createFormForUser(currentUser._id, form, function(form) {
          $scope.forms.push(form);
        });
      }
    }

    $scope.deleteForm = function(form) {
      FormService.deleteFormById(form._id, function(forms) {
        $scope.forms = _.reject($scope.forms, function(f) { return f._id == form._id; });
      });
    }

    $scope.updateForm = function() {
      var form = { title: $scope.title };

      FormService.updateFormById($scope.selected, form, function(form) {
        $scope.forms[$scope.selected] = form;
      });
    }

    $scope.selectForm = function(form) {
      $scope.selected  = form._id;
      $scope.title     = form.title;
    }

    $scope.isSelected = function(form) {
      return $scope.selected = form._id;
    }
  }
})();