(function() {
  var mongoose    = require('mongoose'),
      FormSchema  = require('./form.schema.server.js')(),
      FieldSchema = require('./field.schema.server.js')(),
      Form        = mongoose.model("Form", FormSchema),
      Field       = mongoose.model("Field", FieldSchema);

  module.exports = function() {

    var _API = {
      createFormForUser: createFormForUser,
      findAllFormsForUser: findAllFormsForUser,
      findFormById: findFormById,
      deleteFormById: deleteFormById,
      updateFormById: updateFormById,
      findformByTitle: findformByTitle,
      getFieldsForForm: getFieldsForForm,
      getFieldForForm: getFieldForForm,
      deleteFieldFromForm: deleteFieldFromForm,
      createFieldForForm: createFieldForForm,
      updateFieldForForm: updateFieldForForm
    };

    function createFormForUser(userId, form) {
      form.userId = userId;

      return Form.create(form);
    }

    function findAllFormsForUser(userId) {
      return Form.find({userId: userId}).exec();
    }

    function findFormById (formId) {
      return Form.findById(formId).populate('fields').exec();
    }

    function deleteFormById(formId) {
      return Form.findByIdAndRemove(formId).exec();
    }

    function updateFormById(formId, newForm) {
      return Form.findByIdAndUpdate(formId, newForm, {new: true}).exec();
    }

    function findformByTitle(title) {
      return Form.findOne({title: title}).exec();
    }

    function getFieldsForForm(formId) {
      return Form.findById(formId, 'fields').exec();
    }

    function getFieldForForm(formId, fieldId) {
      return Form.find({ _id: formId, 'fields._id': fieldId}).exec();
    }

    function deleteFieldFromForm(formId, fieldId) {
      return Form.findById(formId).exec(function(err, doc) {
        doc.fields.id(fieldId).remove();
        doc.save();
      });
    }

    function createFieldForForm(formId, field) {
      return Form.findById(formId).exec(function(err, doc) {
        doc.fields.push(field);
        doc.save();
      });
    }

    function updateFieldForForm(formId, fieldId, field) {
      return Form.findById(formId).exec(function(err, doc) {
        doc.fields.id(fieldId).remove();
        doc.fields.push(field);
        doc.save();
      })
    }

    return _API;
  }
})();