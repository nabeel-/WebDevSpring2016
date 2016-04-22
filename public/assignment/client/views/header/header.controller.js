(function(){
  "use strict";

  angular.module("FormBuilderApp").controller("HeaderController", HeaderController);

  function HeaderController($location, $rootScope, UserService) {

    var vm = this;

    vm.logout = logout;

    function logout() {
      UserService.logout().then(function(resp){
        if(resp.status === 200) {
          $rootScope.currentUser = null;
          $location.url('/home');
        }
      })
    }

  };
  
})();