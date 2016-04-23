(function(){
  "use strict";

  angular.module("FormBuilderApp").controller("ProfileController", ProfileController);

  function ProfileController($rootScope, $location, UserService) {

    var vm = this;

    vm.update = update;

    init();

    function init() {
      vm.my = $rootScope.currentUser;
      vm.user = vm.my;
    }

    function update(user) {
      UserService.updateUser(vm.my._id, user).then(function(resp) {
        if (resp.status === 200) { 
          $rootScope.currentUser = resp.data;
          $location.url("/profile"); 
        }
      });
    }
  }
})();