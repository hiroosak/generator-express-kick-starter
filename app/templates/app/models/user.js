'use strict';

var mongoose = require('mongoose');
var name = 'User';

var userSchema = new mongoose.Schema({
  facebook:  { type: String, unique: true, sparse: true },
  twitter:   { type: String, unique: true, sparse: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  tokens: Array,
  profile: {
    name: { type: String, default: '' },
    picture: { type: String, default: '' }
  }
});

// @see https://github.com/LearnBoost/mongoose/issues/1251
if (mongoose.models[name]) {
  module.exports = mongoose.models[name]
} else {
  module.exports = mongoose.model(name, userSchema);
}
