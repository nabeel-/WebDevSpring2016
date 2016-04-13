var mongoose = require('mongoose');

module.exports = function() {
  var fieldSchema = mongoose.Schema({
   label: String,
   type: {
     type: String,
     enum: ['TEXT', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES'],
     default: 'TEXT'
   },
   placeholder: String,
   options: [{label: String, value: String}]
 },
 {collection: 'field'});

  var FormSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.Object, ref: 'User'},
    title: String,
    fields: [fieldSchema],
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    }
  }, 
  {collection: 'form'});

  return FormSchema;
}