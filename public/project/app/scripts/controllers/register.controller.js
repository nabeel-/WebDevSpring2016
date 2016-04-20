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
    var vm = this;

    vm.register = register;
    
    function register(user) {
      UserService.createUser(user).then(function(resp) {
        if(resp.status === 200) {
          $rootScope.currentUser = resp.data;
          $state.go('dashboard.home');
        }
      });
    };

  });