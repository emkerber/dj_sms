var router = require('express').Router();
var Mopidy = require('mopidy');

// any calls made before the state:online event is emitted will fail
mopidy.on('state:online', function() {
  var track = mopidy.playback.getCurrentTrack(); // track is a promise object

  var printCurrentTrack = function(track) {
    if (track) {
      console.log('Currently playing:', track.name, 'by', track.artists[0].name, 'from', track.album.name);
    } else {
      console.log('No current track, merp');
    }
  };


  mopidy.playback.getCurrentTrack()
    // printCurrentTrack is the callback, and the second argument registers the error handler
    .done(printCurrentTrack, console.error.bind(console)); // argument is the error object
})

router.get('/new', function(request, response) {

})
