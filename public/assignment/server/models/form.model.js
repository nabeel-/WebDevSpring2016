(function() {
  var form_data = require("./form.mock.json"),
    _         = require('underscore');

  var _API = {};

  _API.createFormForUser = function(userId, form) {
    var _id = toString((new Date).getTime());

    form._id    = _id;
    form.userId = parseInt(userId);
    form_data.push(form);

    return form || null;
  }

  _API.findAllFormsForUser = function(userId) {
    var found_forms = _.filter(form_data, function(f) {
      return f.userId == userId;
    });

    return found_forms || null;
  }

  _API.findFormById = function(formId) {
    var found_form = _.findWhere(form_data, {_id: formId});

    return found_form || null;
  }

  _API.deleteFormById = function(formId) {
    form_data = _.reject(form_data, function(form) {
      return form._id == formId;
    });

    return form_data || null;
  }

  _API.updateFormById = function(formId, newForm) {
    var found_form = _.findWhere(form_data, {_id: formId});
    
    if(found_form) { 
      found_form.title = newForm.title; 
    }
    
    return found_form || null;
  }

  _API.findformByTitle = function(title) {
    var found_form = _findWhere(form_data, {title: title});
    return found_form || null;
  }

  module.exports = _API;
})();