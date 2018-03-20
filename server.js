const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({
  extended: true
}));

// connect to db
MongoClient.connect(db.url, (err, database) => {
  if(err) {
    return console.log(err);
  }

  dbName = database.db('notes-nodejs');

  require('./app/routes')(app, dbName);
  app.listen(port, () => {
    console.log('we are live on ' + port);
  });

});