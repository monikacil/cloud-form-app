const Element = require('./element-model');
const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();

function get(req, res) {
  const docquery = Element.findOne({email: req.params.email}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then( elements => {
      res.json(elements);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

function create(req, res) {
  const { email, url } = req.body;

  const element = new Element({ email, url })

  element.save().then( () => {
    res.json(element);
  })
  .catch(err => {
    res.status(500).send(err);
  });
}
  
  module.exports = { get, create };
