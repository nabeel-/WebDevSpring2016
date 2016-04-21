'use strict';

module.exports = function(app, db, mongoose) {
  var userModel    = require('./models/user.model.js')(db, mongoose),
      classesModel = require('./models/classes.model.js')(db, mongoose),
      tutorModel   = require('./models/tutor.model.js')(db, mongoose),
      reportModel  = require('./models/report.model.js')(db, mongoose);
  require('./services/user.service.js')(app, userModel);
  require('./services/classes.service.js')(app, classesModel);
  require('./services/tutor.service.js')(app, tutorModel);
  require('./services/report.service.js')(app, reportModel);
  require('./services/search.service.js')(app);
};