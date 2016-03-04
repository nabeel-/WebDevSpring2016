(function(){
  "use strict";

  angular.module("FormBuilderApp").controller("RegisterController", RegisterController);

  function RegisterController($rootScope, $scope, $location, UserService) {

    $scope.register = function() {

      var user = {
        username:  $scope.username,
        password:  $scope.password,
        email:     $scope.email,
        firstName: null,
        lastName:  null
      };

      var callback = function(user) {
        $rootScope.currentUser = user;
        $rootScope.loggedIn = true;
        $location.url("/profile");
      };

      UserService.createUser(user, callback);
    };
    
  };
  
})();