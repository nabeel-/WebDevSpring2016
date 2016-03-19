module.exports = function(app, formModel) {

  app.get("/api/assignment/:userId/form", function(req, res) {
    var forms = formModel.findAllFormsForUser(req.params.userId);

    res.json(forms);
  });

  app.post("/api/assignment/:userId/form", function(req, res) {
    var form = formModel.createFormForUser(req.params.userId, req.body);

    res.json(form);
  });

  app.get("/api/assignment/form/:formId", function(req, res) {
    var form = formModel.findFormById(req.params.formId);

    res.json(form);
  });

  app.delete("/api/assignment/form/:formId", function(req, res){
    var forms = formModel.deleteFormById(req.params.formId);

    res.json(forms);
  });

  app.put("/api/assignment/form/:formId", function(req, res){
    var updated_form = formModel.updateFormById(req.params.formId, req.body),
        resp         = updated_form ? updated_form : error("Form with ID: " + req.params.formId + " not found.");

    res.json(resp);
  });
  
  function error(msg) {
    return { errors: [ { status: 400, detail: msg} ]};
  }

};