const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const elementSchema = new Schema(
  {
    email: String,
    urls: Array
  }
);

const Element = mongoose.model('Element', elementSchema);
module.exports = Element;
