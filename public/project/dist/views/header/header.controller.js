'use strict';
/**
 * @ngdoc function
 * @name TutorConnect.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the TutorConnect
 */
angular.module('TutorConnect')
  .controller('HeaderCtrl', function($scope, $rootScope, $state) {
    $scope.logout = function() {
      $rootScope.currentUser = null;
      $state.go('landing');
    }

  });
