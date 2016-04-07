(function(){
  "use strict";

  angular.module("FormBuilderApp").controller("ProfileController", ProfileController);

  function ProfileController($scope, $rootScope, $location, UserService) {

    var currentUser = $rootScope.currentUser;

    $scope.username  = currentUser.username;
    $scope.password  = currentUser.password;
    $scope.firstName = currentUser.firstName;
    $scope.lastName  = currentUser.lastName;
    $scope.emails    = currentUser.emails;
    $scope.phones    = currentUser.phones;

    $scope.update = function() {

      // Generate new user object with updated attributes
      var updatedUser = {
        username:  $scope.username,
        password:  $scope.password,
        firstName: $scope.firstName,
        lastName:  $scope.lastName,
        emails:    $scope.emails,
        phones:    $scope.phones
      };
      
      UserService.updateUser(currentUser._id, updatedUser).then(function(resp) {
        if (resp.data) { 
          $rootScope.currentUser = resp.data;
          $location.url("/profile"); 
        }
      });
    }
  }
})();