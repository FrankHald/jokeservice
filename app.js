"use strict";

var config = require('./config');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var path = require('path');
var mongoose = require('mongoose');
var requestPromise = require('request-promise');

app.use(express.static(__dirname + '/public'));

// INITIALIZATION
// =============================================================================
app.set('port', (process.env.PORT || config.defaultPort));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

mongoose.Promise = global.Promise; // Use new EcmaScript 6 promises
var mongoConnection = mongoose.connect(config.mongoDBhost, {useMongoClient: true});
mongoConnection.on('error', function(err) {
    console.error(err.message);
    console.error("MongoDB connection failed");
});
mongoConnection.once('open', function() {
    console.log("MongoDB connection open");
});

// ROUTES FOR OUR APP
// =============================================================================

var jokeRouter = require('./routes/joke')(express);
var registryRouter = require('./routes/registry')(express, requestPromise, path);
app.use(jokeRouter);
app.use(registryRouter);

// START THE SERVER
// =============================================================================
app.listen(app.get('port'), function () {
    console.log("Listening on port", app.get('port'));
});
