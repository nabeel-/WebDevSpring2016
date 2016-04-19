var mongoose     = require('mongoose'),
    ReportSchema = require("./report.schema.server.js")(),
    Report       = mongoose.model("Report_p", ReportSchema);

module.exports = function() {

  var _API = {
    getAllReportsForStudent: getAllReportsForStudent,
    getAllReportsForTutor: getAllReportsForTutor,
    addReportForStudent: addReportForStudent,
    updateReportById: updateReportById,
    deleteReportById: deleteReportById,
    getReportForClass: getReportForClass
  };

  function getAllReportsForStudent(userId) {
    return Report.find({_student: userId}).populate('_submitter', 'firstName').exec();
  }

  function getAllReportsForTutor(userId) {
    return Report.find({_submitter: userId}).populate('_student', 'firstName').exec();
  }

  function getReportForClass(classId) {
    return Report.findOne({_class: classId}).exec();
  }

  function addReportForStudent(submId, studId, report) {
    report._submitter = submId;
    report._student   = studId;

    return Report.create(report)
  }

  function updateReportById(reportId, report) {
    return Report.findByIdAndUpdate(reportId, report, {new: true}).exec();
  }

  function deleteReportById(reportId) {
    return Report.findByIdAndRemove(reportId).exec();
  }


  return _API;
};