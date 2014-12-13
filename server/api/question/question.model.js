'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  // index: Number,
  // image: String,
  // displayImage: String,
  // fakeImages: Array,
  // title: String,
  // displayTitle: String,
  // fakeTitles: Array,
  // snippet: String,
  // displaySnippet: String,
  // fakeSnippets: Array,
  // name: String,
  // displayName: String,
  // fakeNames: Array,
  // displayAnswer: String
  questionTop : String,
  questionBottom : String,
  questionAnswer : String,
  randomNum : Number,
  type : String
});

module.exports = mongoose.model('Question', QuestionSchema);

// var obj2 = {
//   "questionTop" : question.snippet,
//   "questionBottom" : question.displayTitle,
//   "questionAnswer" : question.title,
//   "randomNum" : Math.random(),
//   "type" : "snippetToArticle",
// }