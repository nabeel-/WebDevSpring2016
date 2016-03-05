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

      var callback = function(user) {
        $rootScope.currentUser = user;
        $rootScope.loggedIn    = true;
        $rootScope.isAdmin     = _.contains(user.roles, 'admin');
        
        $location.url("/profile");
      };

      UserService.createUser(user, callback);
    };
    
  };
  
})();