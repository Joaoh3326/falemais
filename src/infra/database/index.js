/* eslint-disable class-methods-use-this */
const mongoose = require('mongoose');
const models = require('./models');

class Database {
  openConnection() {
    return mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  closeConnection(callback = () => { }) {
    return mongoose.connection.close(callback);
  }

  databaseModels() {
    return models;
  }
}

module.exports = new Database();
