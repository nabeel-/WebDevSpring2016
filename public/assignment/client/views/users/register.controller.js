(function(){
  "use strict";

  angular.module("FormBuilderApp").controller("RegisterController", RegisterController);

  function RegisterController($rootScope, $scope, $location, UserService) {

    $scope.register = function() {

      var user = {
        username:  $scope.username,
        password:  $scope.password,
        emails:     $scope.email,
        phones:    [],
        firstName: null,
        lastName:  null,
        roles:     ['default']
      };

      UserService.createUser(user).then(function(resp) {
        if(resp.status == 200) {
          $rootScope.currentUser = resp.data;          
          $location.url("/profile");
        }
      });

    };
    
  };
  
})();