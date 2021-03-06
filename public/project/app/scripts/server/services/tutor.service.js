module.exports = function(app, tutorModel) {

  app.get('/api/project/tutor/:tutorId', getSubjectsForTutor);
  app.get('/api/project/tutor', getAllTutors);
  app.get('/api/project/tutor/user/:userId', getTutorFromUserId);
  app.post('/api/project/tutor/user/:userId', createTutorWithUser);
  app.put('/api/project/tutor/:tutorId', updateTutorById);

  function getSubjectsForTutor(req, res) {
    var resp = tutorModel.getSubjectsForTutor(req.params.tutorId);

    resp.then(function(subjects) {
      res.send(subjects);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function getAllTutors(req, res) {
    var resp = tutorModel.getAllTutors();

    resp.then(function(tutors) {
      res.send(tutors);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function getTutorFromUserId(req, res) {
    var resp = tutorModel.getTutorFromUserId(req.params.userId);

    resp.then(function(tutor) {
      res.send(tutor);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function createTutorWithUser(req, res) {
    var resp = tutorModel.createTutorWithUser(req.params.userId, req.body);
    
    resp.then(function(tutor) {
      res.send(tutor);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function updateTutorById(req, res){
    var resp = tutorModel.updateTutorById(req.params.tutorId, req.body);
    
    resp.then(function(tutor) {
      res.send(tutor);
    }, function(err) {
      res.status(400).send(err);
    });
  }

};