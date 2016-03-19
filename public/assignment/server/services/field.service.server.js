module.exports = function(app, formModel) {

  app.get("/api/assignment/form/:formId/field", function(req, res) {
    var fields = formModel.getFieldsForForm(req.params.formId);

    res.json(fields);
  });

  app.get("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
    var field = formModel.getFieldForForm(req.params.formId, req.params.fieldId);

    res.json(field);
  });

  app.delete("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
    var form = formModel.deleteFieldFromForm(req.params.formId, req.params.fieldId);

    res.json(form);
  });

  app.post("/api/assignment/form/:formId/field", function(req, res) {
    var form = formModel.createFieldForForm(req.params.formId, req.body);

    res.json(form);
  });

  app.put("/api/assignment/form/:formId/field/:fieldId", function(req, res) {
    var form = formModel.updateFieldForForm(req.params.formId, req.params.fieldId, req.body);

    res.json(form);
  });

};