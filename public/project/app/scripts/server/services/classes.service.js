module.exports = function(app, classesModel) {

  app.get('/api/project/user/:userId/classes', function(req, res){
    var classes = classesModel.getAllClassesForUser(req.params.userId);
    res.json(classes);
  });

  app.post('/api/project/user/:userId/class', function(req, res){
    var classes = classesModel.addClassForUser(req.params.userId, req.body);
    res.json(classes);
  });

  app.delete('/api/project/user/:userId/class/:classId', function(req, res){
    var classes = classesModel.cancelClassById(req.params.classId, req.params.userId);
    res.json(classes);
  });

  app.put('/api/project/user/:userId/class/:classId', function(req, res){
    var updatedClass = classesModel.updateClassById(req.params.classId, req.body);
    res.json(updatedClass);
  });

};