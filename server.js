var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
// var Mopidy = require('mopidy');

// Express routes
var appRoute = require('./routes/appRoute');
var mopidyRoute = require('./routes/mopidyRoute');



app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/*', function(request, response) {
  response.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use('http://localhost:6680/mopidy/ws', mopidyRoute);
app.use('/', mopidyRoute);


var port = 3000;
var server = app.listen(port, function() {
  console.log('Server listening on port', server.address().port);
});

module.exports = server;
