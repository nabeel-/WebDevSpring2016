(function(){
  "use strict";

  angular.module("FormBuilderApp").controller("LoginController", LoginController);

  function LoginController($rootScope, $scope, $location, UserService, _) {

    $scope.login = function() {

      UserService.findUserByCredentials(
        $scope.username,
        $scope.password
      ).then(function(resp) {
        $rootScope.currentUser = resp;
        $rootScope.loggedIn    = true;
        $rootScope.isAdmin     = _.contains(resp.roles, 'admin');
        $location.url("/profile");
      });
    };
    
  };
  
})();