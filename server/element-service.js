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
  const { email, urls } = req.body;

  const element = new Element({ email, urls })

  element.save().then( () => {
    res.json(element);
  })
  .catch(err => {
    res.status(500).send(err);
  });
}

function update(req, res) {
  const { email, urls } = req.body;

  Element.findOne({ email })
    .then(element => {
      element.email = email;
      element.urls = urls;
      element.save().then(res.json(element));
    })
    .catch(err => {
      res.status(500).send(err);
    });
}
  
  module.exports = { get, create, update };
