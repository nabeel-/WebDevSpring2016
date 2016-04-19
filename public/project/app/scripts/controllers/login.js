'use strict';
/**
 * @ngdoc function
 * @name TutorConnect.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the TutorConnect
 */
angular.module('TutorConnect')
  .controller('LoginCtrl', function($rootScope, $state, UserService) {

    var vm = this;

    
    vm.login = function(user) {

      if(user) {
        UserService.login(user).then(function(resp) {
          if(resp.status === 200) {
            $rootScope.currentUser = resp.data;
            $state.go('dashboard.home');
          }
        });
      }
    };

  });
