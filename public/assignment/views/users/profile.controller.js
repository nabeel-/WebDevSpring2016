(function(){
  "use strict";

  angular.module("FormBuilderApp").controller("ProfileController", ProfileController);

  function ProfileController($scope, $rootScope, $location, UserService) {

    var currentUser = $rootScope.currentUser;

    $scope.username  = currentUser.username;
    $scope.password  = currentUser.password;
    $scope.firstName = currentUser.firstName;
    $scope.lastName  = currentUser.lastName;
    $scope.email     = currentUser.email;

    $scope.update = function() {

      // Generate new user object with updated attributes
      var updatedUser = {
        username:  $scope.username,
        password:  $scope.password,
        firstName: $scope.firstName,
        lastName:  $scope.lastName,
        email:     $scope.email
      };

      var callback = function(user) {
        if (user) { $location.url("/profile"); }
      };

      UserService.updateUser(currentUser._id, updatedUser, callback);
    }
  }
})();