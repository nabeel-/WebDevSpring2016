(function() {
  "use strict";

  angular.module("sbAdminApp").factory("UserService", UserService);

  function UserService($rootScope, _) {
    var users = [
      {"_id":123, "firstName":"Alice", "lastName":"Wonderland",
      "username":"alice", "password":"alice", "roles": ["student"]},
      {"_id":234, "firstName":"Bob","lastName":"Hope",
      "username":"bob", "password":"bob", "roles": ["admin"]},
      {"_id":345, "firstName":"Charlie","lastName":"Brown",
      "username":"charlie", "password":"charlie", "roles": ["faculty"]},
      {"_id":456, "firstName":"Dan", "lastName":"Craig",
      "username":"dan", "password":"dan", "roles": ["faculty", "admin"]},
      {"_id":567, "firstName":"Edward","lastName":"Norton",
      "username":"ed", "password":"ed", "roles": ["student"]}
    ];

    function findUserByCredentials(username, password, callback) {
      var found_user = _.findWhere(users, {username: username, password: password});

      callback(found_user);
    }

    function findAllUsers(callback) {
      callback(users);
    }

    function createUser(user, callback) {
      user._id = (new Date).getTime();
      users.push(user);
      callback(user);
    }

    function deleteUserById(userId, callback) {
      users = _.reject(users, function(user) {
        return user._id == userId;
      });

      callback(users);
    }

    function updateUser(userId, user, callback) {
      var found_user = _.findWhere(users, {_id: userId});

      if(found_user) {
        found_user = user;
        $rootScope.currentUser = found_user;
      }

      callback(found_user);
    }

    var service = {
      findAllUsers : findAllUsers,
      findUserByCredentials : findUserByCredentials,
      createUser : createUser,
      deleteUserById : deleteUserById,
      updateUser : updateUser
    };

    return service;
  }
})();