(function() {
  'use strict';

  angular.module('dj_sms').controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$http'];

  function HomeCtrl($http) {
    var vm = this;

    // DOM content
    vm.message='HEYYYYY';
    vm.topResult = {};
    // vm.tracklist = {};


    // fires when the button on the DOM is clicked
    vm.go = function() {
      // console.log('Input:', vm.input); // what was typed on the page
      var spotifyAddress = 'https://api.spotify.com/v1/search?q=' + vm.input + '&limit=1&type=track'; // the query to be sent to the Spotify API
      // console.log('Spotify address:', spotifyAddress);

      $http.get(spotifyAddress).then(function(response) {
        var spotifyTrack = response.data.tracks.items[0]; // stores the returned URI in a SON variable
        vm.topResult = spotifyTrack; // displays track info on page
        console.log('spotifyTrack.uri:', spotifyTrack.uri);
        var trackData = {};
        trackData.uris = [spotifyTrack.uri];
        console.log('trackData:', trackData);
        $http.post('/new', trackData).then(handleSuccess, handleFailure);
      });

      function handleSuccess(response) {
        console.log('Successfully posted track', response);
        return response;
      }

      function handleFailure(response) {
        console.log('Failure posting track', response);
        return response;
      }
    };


    // $http.get('/new').then(function(response) {
    //   vm.tracklist = response.data;
    // })


  }
})();


// {"tl_track":{"uri":""}}
