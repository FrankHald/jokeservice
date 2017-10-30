'use strict';

var joke = require('../models/joke');

exports.createJoke = function(setup, punchline) {
  var newJoke = new joke({
    setup: setup,
    punchline: punchline
  });
  return newJoke.save();
};

exports.getJoke = function(jokeId) {
  return joke.findOne({_id: jokeId}).exec();
};

exports.getJokes = function() {
  return joke.find().exec();
};
