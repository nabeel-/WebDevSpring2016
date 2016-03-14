'use strict';
/**
 * @ngdoc function
 * @name TutorConnect.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the TutorConnect
 */
angular.module('TutorConnect')
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
