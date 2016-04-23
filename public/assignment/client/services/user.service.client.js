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

    function createUser(user) {
      return $http.post(API_BASE, user);
    }

    function deleteUserById(userId) {
      return $http.delete(API_BASE + userId);
    }

    function updateUser(userId, user) {
      return $http.put(API_BASE + userId, user);
    }

    // Admin API calls

    function findUsersByAdmin() {
      return $http.get('/api/assignment/admin/user');
    }

    function addUserByAdmin(user) {
      return $http.post('/api/assignment/admin/user', user);
    }

    function updateUserByAdmin(user) {
      return $http.put('/api/assignment/admin/user/' + user._id, user);
    }

    function removeUserByAdmin(id) {
      return $http.delete('/api/assignment/admin/user/' + id);
    }

    var service = {
      findUsersByAdmin : findUsersByAdmin,
      createUser : createUser,
      deleteUserById : deleteUserById,
      updateUser : updateUser,
      login: login,
      logout: logout,
      addUserByAdmin: addUserByAdmin,
      updateUserByAdmin: updateUserByAdmin,
      removeUserByAdmin: removeUserByAdmin
    };

    return service;
  }
})();