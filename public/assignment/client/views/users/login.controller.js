(function(){
  "use strict";

  angular.module("FormBuilderApp").controller("LoginController", LoginController);

  function LoginController($rootScope, $location, UserService, _) {

    var vm = this;
    vm.login = login;

    function login(user) {
      if(user) {
        UserService.login(user).then(function(resp) {
          if (resp.status === 200) {
            $rootScope.currentUser = resp.data;
            $rootScope.loggedIn    = true;
            $rootScope.isAdmin     = _.contains(resp.data.roles, 'admin');
            $location.url("/profile");
          }
        })
      }
    }
    
  };
  
})();