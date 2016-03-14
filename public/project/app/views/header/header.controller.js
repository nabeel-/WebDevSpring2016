'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('HeaderCtrl', function($scope, $rootScope, $state) {
    $scope.logout = function() {
      $rootScope.currentUser = null;
      $state.go('landing');
    }

  });
