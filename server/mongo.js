const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const option = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000,
  useNewUrlParser: true
};

const mongoUri = 'mongodb://cloud-form-db:jOTkLiWxRxLyzN1mh50hgsrkUwf3ofmkwqL6QtfOxFLZC43j71PJIJdQ8x7c6EGavGT2XrgfyUrANOGZp1WkKg==@cloud-form-db.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@cloud-form-db@';

function connect() {
  return mongoose.connect(mongoUri, option);
}

module.exports = {
  connect,
  mongoose
};
