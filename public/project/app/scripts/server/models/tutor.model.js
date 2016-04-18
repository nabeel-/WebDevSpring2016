var mongoose   = require('mongoose'),
    TutorSchema = require("./tutor.schema.server.js")(),
    Tutor       = mongoose.model("Tutor_p", TutorSchema);

module.exports = function() {

  var _API = {
    getAllTutors: getAllTutors,
    getTutorFromUserId: getTutorFromUserId,
    getSubjectsForTutor: getSubjectsForTutor,
    updateTutorById: updateTutorById,
    createTutorWithUser: createTutorWithUser
  };

  function getAllTutors() {
    return Tutor.find().populate('userId', 'firstName').exec();
  }

  function getTutorFromUserId(userId) {
    return Tutor.findOne({userId: userId}).exec();
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