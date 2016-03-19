(function() {
  var form_data = require("./form.mock.json"),
      _         = require('underscore'),
      uuid      = require('node-uuid');

  var _API = {};

  _API.createFormForUser = function(userId, form) {
    var _id = uuid.v4();

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
    _.each(form_data, function(f) {
      if(f._id == formId) {
        f.title = newForm.title;
        return f;
      }
    });
    
    return null;
  }

  _API.findformByTitle = function(title) {
    var found_form = _.findWhere(form_data, {title: title});
    return found_form || null;
  }

  _API.getFieldsForForm = function(formId) {
    var fields = _.findWhere(form_data, {_id: formId}).fields;
    return fields || null;
  }

  _API.getFieldForForm = function(formId, fieldId) {
    var fields = _.findWhere(form_data, {_id: formId}).fields,
        field  = _.findWhere(fields, {_id: fieldId});

    return field || null;
  }

  _API.deleteFieldFromForm = function(formId, fieldId) {
    _.each(form_data, function(f) {
      if(f._id == formId) {
        var fields = _.reject(f.fields, function(fd) {
          fd._id == fieldId;
        });
        f.fields = fields;
        return f.fields;
      }
    });
  }

  _API.createFieldForForm = function(formId, field) {
    field._id = uuid.v4();
    _.each(form_data, function(f) {
      if(f._id == formId) {
        f.fields.push(field);
        return f.fields;
      }
    });
  }

  _API.updateFieldForForm = function(formId, fieldId, field) {
    _.each(form_data, function(f) {
      if(f._id == formId) {
        _.each(f.fields, function(fd) {
          if(fd._id == fieldId) {
            fd.label       = field.label;
            fd.placeholder = field.placeholder;
            fd.options     = field.options;
            return fd;
          }
        });
      }
    });
  }


  module.exports = _API;
})();