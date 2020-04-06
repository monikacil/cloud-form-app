const mongoose = require('mongoose');
const env = require('./env/environment');


mongoose.Promise = global.Promise;

const option = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000,
  useNewUrlParser: true
};

const mongoUri = `mongodb://${env.name}:${env.dbKey}@${env.name}.mongo.cosmos.azure.com:${env.port}/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@${env.name}@`;

function connect() {
  return mongoose.connect(mongoUri, option);
}

module.exports = {
  connect,
  mongoose
};
