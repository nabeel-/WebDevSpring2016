'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ProfileCtrl', function($scope, $rootScope, $state, UserService) {

    $scope.username  = $rootScope.currentUser.username;
    $scope.firstName = $rootScope.currentUser.firstName;
    $scope.lastName = $rootScope.currentUser.lastName;
    $scope.email = $rootScope.currentUser.email;

    var currentUser = $rootScope.currentUser;

    $scope.update = function() {

      // Generate new user object with updated attributes
      var updatedUser = {
        username:  $scope.username  || currentUser.username,
        password:  $scope.password  || currentUser.password,
        firstName: $scope.firstName || currentUser.firstName,
        lastName:  $scope.lastName  || currentUser.lastName,
        email:     $scope.email
      };

      var callback = function(user) {
        if (user) { $state.go('dashboard.profile'); }
      };

      UserService.updateUser(currentUser._id, updatedUser, callback);
    }

  });