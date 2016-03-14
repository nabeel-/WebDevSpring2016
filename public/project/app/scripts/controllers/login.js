'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('LoginCtrl', function($rootScope, $scope, $state, UserService) {
    $scope.login = function() {
      var callback = function(user) {
        $rootScope.currentUser = user;
        $state.go("dashboard.home");
      };
      UserService.findUserByCredentials(
        $scope.username,
        $scope.password,
        callback
      );
    };

  });
