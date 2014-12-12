'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  index: Number,
  text: String,
  URL: String,
  type: String,
  section: String,
  active: Boolean
});

module.exports = mongoose.model('Question', QuestionSchema);
