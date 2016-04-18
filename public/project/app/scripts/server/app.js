'use strict';

module.exports = function(app, uuid, db, mongoose) {
  var userModel    = require('./models/user.model.js')(db, mongoose),
      classesModel = require('./models/classes.model.js')(db, mongoose),
      tutorModel   = require('./models/tutor.model.js')(db, mongoose);
  require('./services/user.service.js')(app, userModel);
  require('./services/classes.service.js')(app, classesModel);
  require('./services/tutor.service.js')(app, tutorModel);
};