(function(){
  "use strict";

  angular.module("FormBuilderApp").controller("AdminController", AdminController);

  function AdminController($rootScope, UserService) {
    var vm = this;

    vm.select = select;
    vm.updateSort = updateSort;

    init();

    function init() {
      vm.my = $rootScope.currentUser;
      vm.by = { col: 'username', descending: false };

      UserService.findAllUsers().then(function(resp) {
        if(resp.status === 200) {
          vm.users = resp.data;
        }
      });
    }

    function select(user) {
      vm.selectedUser = user;
    }

    function updateSort(col) {
      if (vm.by.col == col) {
          vm.by.descending = !vm.by.descending;
      } else {
          vm.by.col = col;
          vm.by.descending = false;
      }
    }

  };
  
})();