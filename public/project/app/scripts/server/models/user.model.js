var mongoose   = require('mongoose'),
    UserSchema = require("./user.schema.server.js")(),
    User       = mongoose.model("User_p", UserSchema);
    

module.exports = function() {

  var _API = {
    deleteUserById: deleteUserById,
    createUser: createUser,
    getAllUsers: getAllUsers,
    findUserById: findUserById,
    updateUserById: updateUserById,
    findUserByCredentials: findUserByCredentials,
    findUserByUsername: findUserByUsername
  };

  function deleteUserById(userId) {
    return User.findByIdAndRemove(userId).exec();
  }

  function createUser(user) {
    return User.create(user);
  }

  function getAllUsers() {
    return User.find().exec();
  }

  function findUserById(userId) {
    return User.findById(userId).exec();
  }

  function updateUserById(userId, user) {
    return User.findByIdAndUpdate(userId, user, {new: true}).exec();
  }

  function findUserByCredentials(creds) {
    return User.findOne({ username: creds.username, password: creds.password}).exec();
  }

  function findUserByUsername(username) {
    return User.findOne({ username: username }).exec();
  }

  return _API;
}