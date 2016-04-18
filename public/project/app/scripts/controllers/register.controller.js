'use strict';
/**
 * @ngdoc function
 * @name TutorConnect.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the TutorConnect
 */
angular.module('TutorConnect')
  .controller('RegisterCtrl', function($rootScope, $scope, $state, UserService) {
    
    $scope.register = function() {

      var user = {
        username:  $scope.username,
        password:  $scope.password,
        email:     $scope.email,
        firstName: $scope.first,
        lastName:  $scope.last,
        roles:     [$scope.role]
      };

      UserService.createUser(user).then(function(resp) {
        if(resp.status === 200) {
          $rootScope.currentUser = resp.data;
          $state.go('dashboard.home');
        }
      });

    };

  });