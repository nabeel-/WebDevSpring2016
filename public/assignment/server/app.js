module.exports = function(app) {
  var userModel   = require("./models/user.model.js"),
      userService = require("./services/user.service.server.js")(app, userModel);
};