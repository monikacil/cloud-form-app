const Element = require('./element-model');
const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();

const sgMail = require('@sendgrid/mail');

function sendEmail(data) {
  sgMail.setApiKey('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');
  const msg = {
    to: data.email,
    from: 'monika.cilinska@gmail.com',
    subject: 'Your favourite links',
    text: 'your current links send by Send Grid from MongoDB',
    html: returnTemplate(data),
  };
  
  sgMail.send(msg);
}

function returnTemplate(data) {
  return (
    `<div>
      <ul><strong>List:</strong>
        ${data.urls.map( (el) => {
          return `<li>${el}</li>`
        } )}
      </ul>
    </div>
    `
  )
}


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
    // sendEmail(element)
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
      element.save().then( () => {
        res.json(element);
        // sendEmail(element)
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
}
  
module.exports = { get, create, update };
