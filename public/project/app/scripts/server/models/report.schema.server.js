var mongoose = require("mongoose");
 
 module.exports = function () {

   var ReportSchema = mongoose.Schema({
     _submitter: {type: mongoose.Schema.Types.Object, ref: 'User_p'},
     _student: {type: mongoose.Schema.Types.Object, ref: 'User_p'},
     _class: {type: mongoose.Schema.Types.Object, ref: 'Class_p'},
     createdAt: String,
     comments: String,
     score: Number
   }, {collection: 'report_p'});
   return ReportSchema;
 };