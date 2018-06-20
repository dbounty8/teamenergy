const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
//const dbConfig = require('./config/database.config.js');
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, './db.env'),
  });
const dbConfig = process.env.DB_CONNECTION;
//mongoose.connect(process.env.DATABASE_CONN);
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// Default route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to 123 Energy application. Keep track of all our queries."});
});

require('./app/routes/routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});