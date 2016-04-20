'use strict';
/**
 * @ngdoc function
 * @name TutorConnect.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the TutorConnect
 */
angular.module('TutorConnect')
  .controller('ProfileCtrl', function($rootScope, $state, UserService) {
    var vm = this;

    vm.update = update;

    init();

    function init() {
      vm.my = $rootScope.currentUser;
    }

    function update() {
      // Generate new user object with updated attributes
      var updatedUser = {
        username:  vm.my.username,
        password:  vm.my.password,
        firstName: vm.my.firstName,
        lastName:  vm.my.lastName,
        email:     vm.my.email 
      };

      UserService.updateUser(vm.my._id, updatedUser).then(function(resp) {
        if(resp.status === 200) {
          $state.go('dashboard.profile');
        }
      });
    };

  });