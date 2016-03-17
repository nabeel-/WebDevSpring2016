(function(){
  "use strict";

  angular.module("FormBuilderApp").controller("LoginController", LoginController);

  function LoginController($rootScope, $scope, $location, UserService, _) {

    $scope.login = function() {

      UserService
        .findUserByCredentials($scope.username, $scope.password)
        .then(function(resp) {
          if(resp.status == 200) {
            $rootScope.currentUser = resp.data;
            $rootScope.loggedIn    = true;
            $rootScope.isAdmin     = _.contains(resp.data.roles, 'admin');
            $location.url("/profile");
          }
        });
    };
    
  };
  
})();