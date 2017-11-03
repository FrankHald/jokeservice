module.exports = function(express, requestPromise, path) {
  var router = express.Router();
  router.route('/registry/:url/json')
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
  return router;
};
