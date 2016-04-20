'use strict';
/**
 * @ngdoc function
 * @name TutorConnect.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the TutorConnect
 */
angular.module('TutorConnect')
  .controller('HeaderCtrl', function($rootScope, $state, UserService) {
    var vm = this;

    vm.logout = logout;

    init();

    function init() {
      vm.currentUser = $rootScope.currentUser;
    }

    function logout() {
      UserService.logout().then(function(resp) {
        $rootScope.currentUser = null;
        $state.go('landing');
      });
    }

  });
