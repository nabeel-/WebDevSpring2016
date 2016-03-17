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
        lastName:  null,
        roles:     []
      };

      UserService.createUser(user).then(function(resp) {
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