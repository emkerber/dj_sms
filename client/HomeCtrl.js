(function() {
  'use strict';

  angular.module('dj_sms').controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$http'];

  function HomeCtrl($http) {
    var vm = this;


    // DOM content
    vm.message='HEYYYYY';
    vm.topResult = '';

    // first function to run
    // fires when the button on the DOM is clicked
    vm.go = function() {
      console.log('Input:', vm.input); // what was typed on the page
      var spotifyAddress = 'https://api.spotify.com/v1/search?q=' + vm.input + '&limit=1&type=track,artist'; // the query to be sent to the Spotify API
      sendSpotifyQuery(spotifyAddress); // second function is executed
    };


    // second function to run
    // queries the Spotify API
    sendSpotifyQuery = function(address) {
      $http.get(address).then(function(response) {
        var spotifyUri = response.data.tracks.items[0].uri; // stores the returned URI in a variable
        console.log('spotifyUri:', spotifyUri);
        tellMopidy(spotifyUri);
      });
    };


    // third function to run
    // sends the Spotify URI to Mopidy
    tellMopidy = function(uri) {
      console.log('URI inside tellMopidy function:', uri);
    };


    sendSpotifyQuery(address).then(function(result) {
      var spotifyResult = 'http://localhost:6680/mopidy/file://' + result.data.tracks.items[0].uri;
      console.log('spotifyResult:', spotifyResult);
      $http.get(spotifyResult);
    });

  }
})();


// {"tl_track":{"uri":""}}
