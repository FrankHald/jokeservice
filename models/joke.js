var mongoose = require('mongoose');
var schema = mongoose.Schema;

var joke = new schema({
  setup: String,
  punchline: String
});

joke.methods.printJoke = function() {
  console.log(this.setup);
  console.log(this.punchline);
};

module.exports = mongoose.model('Joke', joke);
