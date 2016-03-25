var classes = require('./classes.mock.json'),
    _       = require('underscore'),
    uuid    = require('node-uuid');

var _API = {};

_API.getAllClassesForUser = function(userId) {
  return _.filter(classes, function(c) { return c.userId == userId; });
}

_API.cancelClassById = function(classId, userId) {
  classes = _.reject(classes, function(c) { return c._id === classId; });

  return _API.getAllClassesForUser(userId);
}

_API.updateClassById = function(classId, klass) {
  for(var i in classes) {
    if(classes[i]._id === classId) {
      classes[i].description = klass.description;
      classes[i].startTime   = klass.startTime;
      classes[i].endTime     = klass.endTime;
      return classes[i];
    }
  }
}

_API.addClassForUser = function(userId, klass) {
  klass._id = uuid.v4();
  klass.userId = userId;

  classes.push(klass);
  return _API.getAllClassesForUser(userId);
}

module.exports = _API;