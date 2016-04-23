(function(){
  "use strict";

  angular.module("FormBuilderApp").controller("AdminController", AdminController);

  function AdminController($rootScope, UserService, _) {
    var vm = this;

    vm.select = select;
    vm.updateSort = updateSort;
    vm.add = add;
    vm.update = update;
    vm.remove = remove;

    init();

    function init() {
      vm.my = $rootScope.currentUser;
      vm.by = { col: 'username', descending: false };

      UserService.findUsersByAdmin().then(function(resp) {
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

    function add(user) {
      user.roles = user.roles.split(",");
      UserService.addUserByAdmin(user).then(function (resp) {
        if(resp.status === 200 && resp.data) {
          vm.users.push(resp.data);
          vm.selectedUser = null;
        }
      });
    }

    function update(user) {
      user.roles = user.roles instanceof Array ? user.roles : user.roles.split(",");
      UserService.updateUserByAdmin(user).then(function(resp) {
        if(resp.status === 200 && resp.data) {
          var ind = _.findIndex(vm.users, function(u) {return u._id == user._id});
          vm.users[ind] = resp.data;
          vm.selectedUser = null;
        }
      });
    }

    function remove(user) {
      UserService.removeUserByAdmin(user._id).then(function(resp) {
        if(resp.status === 200 && resp.data) {
          vm.users = _.reject(vm.users, function(u) { return u._id == user._id});
        }
      });
    }

  };
  
})();