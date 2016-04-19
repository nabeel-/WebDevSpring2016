module.exports = function(app, reportModel) {

  app.get('/api/project/report/student/:userId', getAllReportsForStudent);
  app.get('/api/project/report/tutor/:userId', getAllReportsForTutor);
  app.get('/api/project/report/class/:classId', getReportForClass);
  app.post('/api/project/report/tutor/:submId/student/:studId', addReportForStudent);
  app.delete('/api/project/report/:reportId', deleteReportById);
  app.put('/api/project/report/:reportId', updateReportById);

  function getAllReportsForStudent(req, res) {
    var resp = reportModel.getAllReportsForStudent(req.params.userId);

    resp.then(function(reports) {
      res.send(reports);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function getAllReportsForTutor(req, res) {
    var resp = reportModel.getAllReportsForTutor(req.params.userId);

    resp.then(function(reports) {
      res.send(reports);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function getReportForClass(req, res) {
    var resp = reportModel.getReportForClass(req.params.classId);

    resp.then(function(report) {
      res.send(report);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function addReportForStudent(req, res) {
    var resp = reportModel.addReportForStudent(req.params.submId, req.params.studId, req.body);
    
    resp.then(function(report) {
      res.send(report);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function deleteReportById(req, res) {
    var resp = reportModel.deleteReportById(req.params.reportId);
    
    resp.then(function(report) {
      res.send(report);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function updateReportById(req, res){
    var resp = reportModel.updateReportById(req.params.reportId, req.body);
    
    resp.then(function(report) {
      res.send(report);
    }, function(err) {
      res.status(400).send(err);
    });
  }

};