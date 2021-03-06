var mongoose = require("mongoose");
 
 module.exports = function () {

   var ClassSchema = mongoose.Schema({
     userId: {type: mongoose.Schema.Types.Object, ref: 'User_p'},
     tutorId: {type: mongoose.Schema.Types.Object, ref: 'Tutor_p'},
     description: String,
     subject: String,
     startTime: String,
     endTime: String
   }, {collection: 'class_p'});
   return ClassSchema;
 };