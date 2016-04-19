'use strict';
/**
 * @ngdoc function
 * @name TutorConnect.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the TutorConnect
 */
angular.module('TutorConnect')
  .controller('HeaderCtrl', function($scope, $rootScope, $state, UserService) {
    $scope.logout = function() {
      UserService.logout().then(function(resp) {
        $rootScope.currentUser = null;
        $state.go('landing');
      });
    }

  });
