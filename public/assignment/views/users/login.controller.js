(function(){
  "use strict";

  angular.module("FormBuilderApp").controller("LoginController", LoginController);

  function LoginController($rootScope, $scope, $location, UserService, _) {

    $scope.login = function() {
      var callback = function(user) {
        $rootScope.currentUser = user;
        $rootScope.loggedIn    = true;
        $rootScope.isAdmin     = _.contains(user.roles, 'admin');
        $location.url("/profile");
      };
      UserService.findUserByCredentials(
        $scope.username,
        $scope.password,
        callback
      );
    };
    
  };
  
})();