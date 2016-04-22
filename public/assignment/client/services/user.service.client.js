(function() {
  "use strict";

  angular.module("FormBuilderApp").factory("UserService", UserService);

  function UserService($rootScope, $http) {

    var API_BASE = "/api/assignment/user/";

    function login(user) {
      return $http.post('/api/assignment/login', user);
    }
    function logout() {
       return $http.post('/api/assignment/logout');
     }

    function findAllUsers() {
      return $http.get(API_BASE);
    }

    function createUser(user) {
      return $http.post(API_BASE, user);
    }

    function deleteUserById(userId) {
      return $http.delete(API_BASE + userId);
    }

    function updateUser(userId, user) {
      return $http.put(API_BASE + userId, user);
    }

    var service = {
      findAllUsers : findAllUsers,
      createUser : createUser,
      deleteUserById : deleteUserById,
      updateUser : updateUser,
      login: login,
      logout: logout
    };

    return service;
  }
})();