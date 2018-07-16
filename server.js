const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// implement swagger api documentation
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use('/api/v1', router);

// Configuring the database
//const dbConfig = require('./config/database.config.js');
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, './db.env'),
  });
require('dotenv').config({
    path: path.join(__dirname, './google.env'),
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


app.use(function(req, res, next){
    // const whitelist = ['localhost:8080'];
    // const origin = req.headers.origin;

    // whitelist.forEach(function(val, key){
    //   if (origin.indexOf(val) > -1){
    //     //res.setHeader('Access-Control-Allow-Origin', origin);
    //   }
    // })

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  
    next();
  });

// Default route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to 123 Energy application. Keep track of all our queries."});
});

require('./app/routes/routes.js')(app);

// listen for requests
app.listen(PORT, () => {
    console.log(`Express Server is listening on port ${PORT}`);
});

