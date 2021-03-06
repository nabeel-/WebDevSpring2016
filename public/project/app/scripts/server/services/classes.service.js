module.exports = function(app, classesModel) {

  app.get('/api/project/user/:userId/classes', getAllClassesForUser);
  app.post('/api/project/user/:userId/class', addClassForUser);
  app.get('/api/project/user/:userId/classes/tutor/:tutorId', getClassesForTutor);
  app.delete('/api/project/user/:userId/class/:classId', cancelClassById);
  app.put('/api/project/user/:userId/class/:classId', updateClassById);

  function getAllClassesForUser(req, res) {
    var resp = classesModel.getAllClassesForUser(req.params.userId);

    resp.then(function(classes) {
      res.send(classes);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function addClassForUser(req, res) {
    var resp = classesModel.addClassForUser(req.params.userId, req.body);
    
    resp.then(function(klass) {
      res.send(klass);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function cancelClassById(req, res) {
    var resp = classesModel.cancelClassById(req.params.classId);
    
    resp.then(function(klass) {
      res.send(klass);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function updateClassById(req, res){
    var resp = classesModel.updateClassById(req.params.classId, req.body);
    
    resp.then(function(klass) {
      res.send(klass);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function getClassesForTutor(req, res) {
    var resp = classesModel.getClassesForTutor(req.params.tutorId);

    resp.then(function(classes) {
      res.send(classes);
    }, function(err) {
      res.status(400).send(err);
    });
  }

};