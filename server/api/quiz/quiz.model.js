'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuizSchema = new Schema({
  name: String,
  date: {type:Date, default:Date.now},
  active: Boolean
});

module.exports = mongoose.model('Quiz', QuizSchema);
