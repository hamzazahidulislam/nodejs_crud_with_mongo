"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minlength: 9,
    maxlength: 15
  }
});
var Contact = model('Contact', ContactSchema);
module.exports = Contact;