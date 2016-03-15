var user_data = require("./user.mock.json"),
    _         = require('underscore');

var _API = {};

_API.findUserById = function(userId) {
  var found_user = _.findWhere(user_data, function(i) {
    return i._id == userId;
  });
  return found_user;
}

_API.deleteUserById = function(userId) {
  user_data = _.reject(user_data, function(user) {
      return user._id == userId;
    });
  return user_data;
}

_API.createUser = function(user) {
  user._id = (new Date).getTime();
  user_data.push(user);
  return user;
}

_API.getAllUsers = function() {
  return user_data;
}

_API.updateUserById = function(userId, user) {
  var found_user = _.findWhere(user_data, {_id: userId});

  if(found_user) { 
    found_user.firstName = user.firstName;
    found_user.lastName  = user.lastName; 
    found_user.username  = user.username; 
    found_user.password  = user.password;
    found_user.email     = user.email;  
  }

  return found_user;
}

_API.findUserByCredentials = function(creds) {
  return _.findWhere(user_data, {username: creds.username, password: creds.password}) || null;
}

_API.findUserByUsername = function(username) {
  return _findWhere(user_data, {username: username}) || null;
}

module.exports = _API;