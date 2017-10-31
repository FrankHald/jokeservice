$('#createJoke').submit(function(event) {
  var setup = $('#setup');
  var punchline = $('#punchline');

  postJoke(setup.val(), punchline.val());
  getJokes('/api/jokes', 'jokes');
  setup.val('');
  punchline.val('');

  event.preventDefault();
});

function getJokes(url, id) {
  $('#' + id).empty();
  $.get('joke.hbs', function(template) {
    var compiled = Handlebars.compile(template);
      $.getJSON(url, function(data) {
        data.forEach(function(element, i) {
          var html = compiled({
            setup: element.setup,
            punchline: element.punchline,
            index: i
          });
          $('#' + id).append(html);
        });
      });
    }
  );
};

function getRegistry(url) {
  $.get('registry.hbs', function(template) {
    var compiled = Handlebars.compile(template);
      $.getJSON(url, function(data) {
        data.forEach(function(element) {
          var html = compiled({
            id: element._id,
            name: element.name,
            address: element.address,
            timestamp: element.timestamp
          });
          $('#registry tbody').append(html);
        });
      });
    }
  );
};

function postJoke(setup, punchline){
  var url = '/api/jokes';
  $.post(url, {setup: setup, punchline: punchline})
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}


getJokes('/api/jokes', 'jokes');
getRegistry('https://krdo-joke-registry.herokuapp.com/api/services');
//getJokes('https://mongodmu.herokuapp.com/api/jokes', 'others');
