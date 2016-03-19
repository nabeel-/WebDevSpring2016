module.exports = function(app, uuid) {
  var userModel   = require("./models/user.model.js"),
      formModel   = require("./models/form.model.js"),
      formService = require("./services/form.service.server.js")(app, formModel),
      fieldService = require("./services/field.service.server.js")(app, formModel),
      userService = require("./services/user.service.server.js")(app, userModel);
};