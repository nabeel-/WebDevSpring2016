(function() {
  'use strict';

  angular.module('TutorConnect').factory('UserService', function($http) {

    var service = {
      findAllUsers : findAllUsers,
      createUser : createUser,
      deleteUserById : deleteUserById,
      updateUser : updateUser,
      login: login,
      logout: logout
    };

    var API_BASE = '/api/project/user/';

    function login(user) {
      return $http.post('/api/project/login', user);
    }
    function logout() {
       return $http.post('/api/project/logout');
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

    return service;
  });
})();