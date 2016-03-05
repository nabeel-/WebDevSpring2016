(function(){
  "use strict";

  angular.module("FormBuilderApp").controller("HeaderController", HeaderController);

  function HeaderController($scope, $location, $rootScope) {

    // UserService should handle the logout process
    $scope.logout = function() {
      $rootScope.currentUser = null;
      $rootScope.loggedIn    = false;
      $rootScope.isAdmin     = false;
      $location.url('/home');
    };
  };
  
})();