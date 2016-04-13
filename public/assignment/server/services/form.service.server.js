module.exports = function(app, formModel) {

  app.get("/api/assignment/:userId/form", getFormsForUser);
  app.post("/api/assignment/:userId/form", createFormForUser);
  app.get("/api/assignment/form/:formId", getFormById);
  app.delete("/api/assignment/form/:formId", deleteFormById);
  app.put("/api/assignment/form/:formId", updateFormById);

  function getFormsForUser(req, res) {
    var resp = formModel.findAllFormsForUser(req.params.userId);

    resp.then(function(forms) {
      res.send(forms);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function createFormForUser(req, res) {
    var resp = formModel.createFormForUser(req.params.userId, req.body);

    resp.then(function(form) {
      res.send(form);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function getFormById(req, res) {
    var resp = formModel.findFormById(req.params.formId);

    resp.then(function(form) {
      res.send(form);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function deleteFormById(req, res){
    var resp = formModel.deleteFormById(req.params.formId);

    resp.then(function(form) {
      res.send(form);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function updateFormById(req, res){
    var resp = formModel.updateFormById(req.params.formId, req.body);
        
    resp.then(function(form) {
      res.send(form);
    }, function(err) {
      res.status(400).send(err);
    });
  }

};