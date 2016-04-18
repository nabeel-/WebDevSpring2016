var mongoose   = require('mongoose'),
    TutorSchema = require("./tutor.schema.server.js")(),
    Tutor       = mongoose.model("Tutor_p", TutorSchema);

module.exports = function() {

  var _API = {
    getAllTutors: getAllTutors,
    getSubjectsForTutor: getSubjectsForTutor,
    updateTutorById: updateTutorById,
    createTutorWithUser: createTutorWithUser
  };

  function getAllTutors() {
    return Tutor.find().exec();
  }

  function getSubjectsForTutor(tutorId) {
    return Tutor.findById(tutorId, 'subjects').exec();
  }

  function updateTutorById(tutorId, tutor) {
    return Tutor.findByIdAndUpdate(tutorId, tutor, {new: true}).exec();
  }

  function createTutorWithUser(userId, tutor) {
    tutor.userId = userId;

    return Tutor.create(tutor);
  }

  return _API;
};