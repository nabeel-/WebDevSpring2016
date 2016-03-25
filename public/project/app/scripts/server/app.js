'use strict';

module.exports = function(app) {
  var userModel    = require('./models/user.model.js'),
      classesModel = require('./models/classes.model.js');
  require('./services/user.service.js')(app, userModel);
  require('./services/classes.service.js')(app, classesModel);
};