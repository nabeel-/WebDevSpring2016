var mongoose   = require('mongoose'),
    ClassSchema = require("./classes.schema.server.js")(),
    Klass       = mongoose.model("Class_p", ClassSchema);

module.exports = function() {

  var _API = {
    getAllClassesForUser: getAllClassesForUser,
    cancelClassById: cancelClassById,
    updateClassById: updateClassById,
    addClassForUser: addClassForUser
  };

  function getAllClassesForUser(userId) {
    return Klass.find({userId: userId}).populate('tutorId').exec();
  }

  function cancelClassById(classId) {
    return Klass.findByIdAndRemove(classId).exec();
  }

  function updateClassById(classId, klass) {
    return Klass.findByIdAndUpdate(classId, klass, {new: true}).exec();
  }

  function addClassForUser(userId, klass) {
    klass.userId = userId;

    return Klass.create(klass);
  }

  return _API;
};
