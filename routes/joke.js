var controller = require("../controllers/controller");

module.exports = function(express) {
  var router = express.Router();
  router.route('/api/jokes')
    .get(function(req, res) {
      controller.getJokes()
        .then(function(val) {
          res.json(val);
        })
        .catch(function(error) {
          console.error('Error: ' + error);
          if (error.stack) console.error(error.stack);
          res.status(500).send(error);
        });
    })
    .post(function(req, res) {
      controller.createJoke(req.body.setup, req.body.punchline)
        .then(function() {
          res.json({message: 'Joke saved!'});
        })
        .catch(function(error) {
          console.error('Error: ' + error);
          if (error.stack) console.error(error.stack);
          res.status(500).send(error);
        });
    });
    router.route('/api/jokes/:id')
      .get(function(req, res) {
        controller.getJoke(req.params.id)
          .then(function(val) {
            res.json(val);
          })
          .catch(function(error) {
            console.error('Error: ' + error);
            if (error.stack) console.error(error.stack);
            res.status(500).send(error);
          })
      });
  return router;
};
