var jokeId = 0;
var registryName = 'a';

$('#createJoke').submit(function(event) {
  var setup = $('#setup');
  var punchline = $('#punchline');

  postJoke(setup.val(), punchline.val());
  getJokes('/api/jokes', 'jokes');
  setup.val('');
  punchline.val('');

  event.preventDefault();
});

$('body').scrollspy({ target: '#bs-example-navbar-collapse-1' });

function getJokes(url, id) {
  $('#' + id).empty();
  $.get('joke.hbs', function(template) {
    var compiled = Handlebars.compile(template);
      $.getJSON(url, function(data) {
        data.forEach(function(element, i) {
          if (!(isBlank(element.setup) || isBlank(element.punchline))) {
            var html = compiled({
              setup: element.setup,
              punchline: element.punchline,
              index: jokeId
            });
            jokeId++;
            $('#' + id).append(html);
          }
        });
      });
    }
  );
}

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
          addJokes(element.address, element.name, registryName + 'registry');
          nextChar();
        });
      });
    }
  );
}

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


function addJokes(address, name, _registryName) {
  var regexp = /https:\/\/(.*)/;
  var url = regexp.exec(address);
  if (url != null) {
    $.get('registryDiv.hbs', function(template) {
      var compiled = Handlebars.compile(template);
      var html = compiled({
        address: address,
        name: name,
        registryName: _registryName
      });
      $('#others').append(html);
    });
    if (url[1].substr(url[1].length-2, url[1].length-1) === '//') {
      url[1] = url[1].slice(0, -1);
    }
    getJokes('/registry/' + url[1], _registryName);
  } else {
    console.log('Den her url sucks');
  }
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function nextChar() {
    registryName = String.fromCharCode(registryName.charCodeAt(0) + 1);
}


getJokes('/api/jokes', 'jokes');
getRegistry('https://krdo-joke-registry.herokuapp.com/api/services');
//getJokes('https://mongodmu.herokuapp.com/api/jokes', 'others');

//var url = window.location.href;
//getJokes(url + '/json', 'others');
