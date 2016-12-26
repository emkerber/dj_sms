var router = require('express').Router();
var Mopidy = require('mopidy');

router.get('/', function(response) {

  var get = function(key, object) {
    return object[key];
  };

  var printTypeAndName = function(model) {
    console.log(model.__model__ + ': ' + model.name);
    // By returning this playlist, this function can be inserted anywhere a model with a name is piped in the chain
    return model;
  };

  var trackDesc = function(track) {
    return track.name + ' by ' + track.artists[0].name;
  };

  var printNowPlaying = function() {
    // By returning any arguments we get, the function can be inserted anywhere in the chain
    var args = arguments;
    return mopidy.playback.getCurrentTrack()
      .then(function(track) {
        console.log('Now playing:', trackDesc(track));
        return args;
      });
  };

  var queueAndPlay = function(playlistNum, trackNum) {
    playlistNum = playlistNum || 0;
    trackNum = trackNum || 0;
    mopidy.playlists.getPlaylists()
      .fold(get, playlistNum)
      .then(printTypeAndName)
      .fold(get, 'tracks')
      .then(mopidy.tracklist.add)
      .fold(get, trackNum)
      .then(mopidy.playback.play)
      .then(printNowPlaying)
      .catch(console.error.bind(console)) // handles errors
      .done();
  };

  var mopidy = new Mopidy(); // connect to the server
  mopidy.on(console.log.bind(console)); // log all events
  mopidy.on('state:online', queueAndPlay);
  console.log('Response from mopidyConfig:', response);

});

module.exports = router;

// var track = mopidy.playback.getCurrentTrack(); // track is a promise object
//
// var printCurrentTrack = function(track) {
//   if (track) {
//     console.log('Currently playing:', track.name, 'by', track.artists[0].name, 'from', track.album.name);
//   } else {
//     console.log('No current track, merp');
//   }
// };

//
// mopidy.playback.getCurrentTrack()
//   // printCurrentTrack is the callback, and the second argument registers the error handler
//   .done(printCurrentTrack, console.error.bind(console)); // argument is the error object
