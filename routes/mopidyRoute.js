var router = require('express').Router();
var Mopidy = require('mopidy');

var mopidy = new Mopidy({
  webSocketUrl: "ws://localhost:6680/mopidy/ws",
  callingConvention: 'by-position-or-by-name'
}); // connect to the server

// mopidy.on(console.log.bind(console)); // log all events


var printCurrentTrack = function(track) {
  if (track) {
    console.log('Currently playing:', track);
  } else {
    console.log('No current track');
  }
};


mopidy.on('state:online', function() {
  console.log('Mopidy is online');
  mopidy.tracklist.getTracks()
    .done(printCurrentTrack);


  // mopidy.getTlTracks()
  //   .then(console.log('getTlTracks function successful from within state:online function'))
  //   .catch(console.error.bind(console)) // handles errors
  //   .done();
});

mopidy.on('event:tracklistChanged', function() {
  console.log('Tracklist changed');
  // mopidy.getTlTracks()
  // .then(console.log('getTlTracks function successful from within event:tracklistChanged function'))
  // .catch(console.error.bind(console)) // handles errors
  // .done();
});



router.get('http://localhost:6680/mopidy/ws', function(request, response) {
  mopidy.tracklist.add(request.uris[0])
    .then(console.log('Added item to tracklist:', request.uris[0]))
    .then(function(tlTracks) {
      var trackNum = trackNum || 0;
      return mopidy.playback.play(tlTracks[trackNum])
      .then(function() {
        return mopidy.playback.getCurrentTrack()
        .then(function(track) {
          console.log('Now playing', trackDesc(track));
        });
      });
    })
    .catch(console.error.bind(console)) // handles errors
    .done();
  response.sendStatus(204);
  console.log('Response from mopidy.tracklist.add():', response);
});


module.exports = router;

// router.get('/', function(response) {


  // var get = function(key, object) {
  //   return object[key];
  // };
  //
  // var printTypeAndName = function(model) {
  //   console.log(model.__model__ + ': ' + model.name);
  //   // By returning this playlist, this function can be inserted anywhere a model with a name is piped in the chain
  //   return model;
  // };
  //
  // var trackDesc = function(track) {
  //   return track.name + ' by ' + track.artists[0].name;
  // };
  //
  // var printNowPlaying = function() {
  //   // By returning any arguments we get, the function can be inserted anywhere in the chain
  //   var args = arguments;
  //   return mopidy.playback.getCurrentTrack()
  //     .then(function(track) {
  //       console.log('Now playing:', trackDesc(track));
  //       return args;
  //     });
  // };
  //
  // var queueAndPlay = function(playlistNum, trackNum) {
  //   playlistNum = playlistNum || 0;
  //   trackNum = trackNum || 0;
  //   mopidy.playlists.getPlaylists()
  //     .fold(get, playlistNum)
  //     .then(printTypeAndName)
  //     .fold(get, 'tracks')
  //     .then(mopidy.tracklist.add)
  //     .fold(get, trackNum)
  //     .then(mopidy.playback.play)
  //     .then(printNowPlaying)
  //     .catch(console.error.bind(console)) // handles errors
  //     .done();
  // };

// });



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
