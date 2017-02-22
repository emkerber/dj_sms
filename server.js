var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var Mopidy = require('mopidy');
var twilio = require('twilio');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'public/index.html'));
});

// Express route
var mopidyRoute = require('./routes/mopidyRoute');

// to configure mopidy
app.use('/', mopidyRoute);

// to configure twilio
// var trackRequest = '';

app.get('/sms', function(request, response) {
  var twilio = require('twilio');
  console.log('inside twilio function');
  var trackRequest = request.body.Body;
  app.post('/new', trackRequest);

  // twilio expects a response 
  var twiml = new twilio.TwimlResponse();
  twiml.message('Nice, got it!');
  response.writeHead(200, {'Content-Type': 'text/xml'});
  response.end(twiml.toString());
});
// end twilio config

var port = 3000;
var server = app.listen(port, function() {
  console.log('Server listening on port', server.address().port);
});

module.exports = server;
