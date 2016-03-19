var user_data = require("./user.mock.json"),
    _         = require('underscore'),
    uuid      = require('node-uuid');

var _API = {};

_API.deleteUserById = function(userId) {
  user_data = _.reject(user_data, function(user) {
      return user._id == userId;
    });
  return user_data;
}

_API.createUser = function(user) {
  user._id = uuid.v4();
  user_data.push(user);
  return user;
}

_API.getAllUsers = function() {
  return user_data;
}

_API.findUserById = function(userId) {
  var found_user = _.find(user_data, function(i) {
    return i._id == userId;
  });
  return found_user || null;
}

_API.updateUserById = function(userId, user) {
  var found_user = _.findWhere(user_data, function(i) {
    return i._id == userId;
  });

  if(found_user) { 
    found_user.firstName = user.firstName;
    found_user.lastName  = user.lastName; 
    found_user.username  = user.username; 
    found_user.password  = user.password;
    found_user.email     = user.email;  
  }

  return found_user || null;
}

_API.findUserByCredentials = function(creds) {
  var found_user = _.find(user_data, function(u) {
    return u.username == creds.username && u.password == creds.password;
  });

  return found_user || null;
}

_API.findUserByUsername = function(username) {
  var found_user = _find(user_data, function(u) {
    return u.username = username;
  });

  return found_user || null;
}

module.exports = _API;