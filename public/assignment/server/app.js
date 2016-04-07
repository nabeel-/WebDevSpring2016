module.exports = function(app, uuid, db, mongoose) {
  var userModel   = require("./models/user.model.js")(db, mongoose),
      formModel   = require("./models/form.model.js"),
      formService = require("./services/form.service.server.js")(app, formModel),
      fieldService = require("./services/field.service.server.js")(app, formModel),
      userService = require("./services/user.service.server.js")(app, userModel);
};