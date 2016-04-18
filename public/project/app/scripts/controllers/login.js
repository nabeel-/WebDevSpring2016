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
      UserService.findUserByCredentials($scope.username, $scope.password).then(function(resp) {
        if(resp.status === 200) {
          $rootScope.currentUser = resp.data;
          $state.go('dashboard.home');
        }
      });
    };

  });
