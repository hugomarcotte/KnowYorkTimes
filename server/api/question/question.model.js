'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  index: Number,
  image: String,
  displayImage: String,
  fakeImages: Array,
  title: String,
  displayTitle: String,
  fakeTitles: Array,
  snippet: String,
  displaySnippet: String,
  fakeSnippets: Array,
  name: String,
  displayName: String,
  fakeNames: Array,
  displayAnswer: String
});

module.exports = mongoose.model('Question', QuestionSchema);
