(function(){
  "use strict";

  angular.module("FormBuilderApp").controller("MainController", MainController);

  function MainController($scope, $location) {

    $scope.pathAt = function(path) {
      return path == $location.path().split("/")[1];
    };
    
  };

})();