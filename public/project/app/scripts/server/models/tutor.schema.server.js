var mongoose = require("mongoose");
 
 module.exports = function () {

   var TutorSchema = mongoose.Schema({
     userId: {type: mongoose.Schema.Types.Object, ref: 'User_p'},
     subjects: [String]
   }, {collection: 'tutor_p'});
   return TutorSchema;
 };