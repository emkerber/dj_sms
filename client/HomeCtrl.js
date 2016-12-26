(function() {
  'use strict';

  angular.module('dj_sms').controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$http'];

  function HomeCtrl($http) {
    var vm = this;


    // DOM content
    vm.message='HEYYYYY';
    vm.topResult = '';


    // // second function to run
    // // queries the Spotify API
    // sendSpotifyQuery = function(address) {
    //   $http.get(address).then(function(response) {
    //     var spotifyTrack = response.data.tracks.items[0]; // stores the returned URI in a variable
    //     console.log('spotifyTrack:', spotifyTrack);
    //     tellMopidy(spotifyTrack);
    //   });
    // };

    // third function to run
    // sends the Spotify URI to Mopidy
    tellMopidy = function(track) {
      console.log('Track inside tellMopidy function:', track);
      $http.post('/', track).then(handleSuccess, handleFailure);
    };


    // first function to run
    // fires when the button on the DOM is clicked
    vm.go = function() {
      console.log('Input:', vm.input); // what was typed on the page
      var spotifyAddress = 'https://api.spotify.com/v1/search?q=' + vm.input + '&limit=1&type=track,artist'; // the query to be sent to the Spotify API
      // sendSpotifyQuery(spotifyAddress); // second function is executed
      $http.get(spotifyAddress).then(function(response) {
        var spotifyTrack = response.data.tracks.items[0]; // stores the returned URI in a variable
        console.log('spotifyTrack:', spotifyTrack);
        tellMopidy(spotifyTrack);
      });
    };

    function handleSuccess(response) {
      console.log('handleSuccess response:', response);
    }

    function handleFailure(response) {
      console.log('handleFailure response:', response);
    }

  }
})();


// {"tl_track":{"uri":""}}
