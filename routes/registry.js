module.exports = function(express, requestPromise, path) {
  var router = express.Router();
  router.route('/registry/:url')
    .get(function(req, res) {
      var url = req.params.url;
      var options = {
        uri: 'https://' + url + '/api/jokes',
        json: true
      };

      requestPromise(options)
        .then(function(payload) {
          res.json(payload);
        })
        .catch(function(error) {
          console.log('Error: ' + error + ', requesting: ' + url);
        });
      });
  router.route('/registry')
    .delete(function(req, res) {
      var secret = 'frankdavid';
      var address = 'https://bestjokeseu.herokuapp.com/';

      var options = {
        method: 'DELETE',
        uri: 'https://krdo-joke-registry.herokuapp.com/api/services/',
        body: {
          secret: secret,
          address: address
        },
        json: true
      };

      requestPromise(options)
        .then(function(payload) {
          res.json(payload);
        })
        .catch(function(error) {
          console.log(error);
        });
    })
    .post(function(req, res) {
      var secret = 'frankdavid';
      var address = 'https://bestjokeseu.herokuapp.com/';
      var name = 'Frank og David';

      var options = {
        method: 'POST',
        uri: 'https://krdo-joke-registry.herokuapp.com/api/services/',
        body: {
          secret: secret,
          address: address,
          name: name
        },
        json: true
      };

      requestPromise(options)
        .then(function(payload) {
          res.json(payload);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  return router;
};
