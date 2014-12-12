'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NameSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Name', NameSchema);