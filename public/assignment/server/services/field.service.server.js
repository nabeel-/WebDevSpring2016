module.exports = function(app, formModel) {

  app.get("/api/assignment/form/:formId/fields", getFieldsForForm);
  app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
  app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
  app.post("/api/assignment/form/:formId/field", createFieldForForm);
  app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldForForm);

  function getFieldsForForm(req, res) {
    var resp = formModel.getFieldsForForm(req.params.formId);

    resp.then(function(fields) {
      res.send(fields);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function getFieldForForm(req, res) {
    var resp = formModel.getFieldForForm(req.params.formId, req.params.fieldId);

    resp.then(function(field) {
      res.send(field);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function deleteFieldFromForm(req, res) {
    var resp = formModel.deleteFieldFromForm(req.params.formId, req.params.fieldId);

    resp.then(function(form) {
      res.send(form);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function createFieldForForm(req, res) {
    var resp = formModel.createFieldForForm(req.params.formId, req.body);
    
    resp.then(function(form) {
      res.send(form);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function updateFieldForForm(req, res) {
    var resp = formModel.updateFieldForForm(req.params.formId, req.params.fieldId, req.body);

    resp.then(function(form) {
      res.send(form);
    }, function(err) {
      res.status(400).send(err);
    });
  }

};