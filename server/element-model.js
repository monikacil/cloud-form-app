const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const elementSchema = new Schema(
  {
    email: String,
    url: String
  }
);

const Element = mongoose.model('Element', elementSchema);
module.exports = Element;
