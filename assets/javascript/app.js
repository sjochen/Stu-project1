



$('#submit').on('click', function (event) {
  event.preventDefault();
  $('.music').empty();
  var artist = $('#name').val();
  var queryURL = "https://api.seatgeek.com/2/events?per_page=75&performers.slug=" + artist.split(' ').join('-') + "&client_id=ODgwMzQ3NHwxNTYyMTA4NDA2LjE0";
  //Spotify stuff
  var searchTerms = $("#name").val().trim();
  mySearch(searchTerms);
  function mySearch(searchTerms) {
    $('#main').html('');
    spotify.call(
      'https://api.spotify.com/v1/search',
      {
        q: searchTerms,
        type: 'track,artist',
        market: 'US',
        limit: '3',
        offset: '0'
      },
      myCallback);
  }
  function myCallback(data) {
    console.log(data);
    for (var i = 0; i < data.tracks.items.length; i++) {
      var songURL = data.tracks.items[i].external_urls.spotify;
      var songName = data.tracks.items[i].name;
      var songArtist = data.tracks.items[i].artists[0].name;
      var songDiv = $('<div>');
      var songLink = $('<a>').attr('href', songURL);
      songLink.addClass('text-primary')
      songLink.attr('target', '_blank');
      songLink.text('Click Here to listen to ' + '"' +songName + '"' + ' by ' + songArtist)
      songDiv.append(songLink);
      $('#song-box').append(songDiv);
    };
  };


  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $('#name').val('')
    var results = response.events;
    console.log(results);
    for (var i = 0; i < results.length; i++) {


      var musicDiv = $('<div>');
      var date = $('<p>').text("Date: " + moment(response.events[i].datetime_local, 'YYYY-MM-DD HH:mm').format('MMMM Do YYYY, hh:mm A'));
      var location = $('<p>').text("Location: " + results[i].venue.display_location);
      var link = $('<a>').text("Click Here to Purchase Ticket");

      link.attr('href', results[i].url);
      link.addClass('text-warning');
     
      var sing = $('<div>');
      var artistName = $('<p>').text("Artist: ");
      var art;

      for (var j = 0; j < results[i].performers.length; j++) {


        var performers = results[i].performers[j].name;
        if (j === 0) {
          art = artistName.append(performers);
        } else {
          art = artistName.append(", " + performers);
        }
      }
      sing.append(art);

      console.log(art);
      musicDiv.append(sing);
      musicDiv.append(location);
      musicDiv.append(date);
      musicDiv.append(link);
      musicDiv.addClass('music-div');
      musicDiv.addClass('card');
      musicDiv.addClass('text-white');
      $('.music').append(musicDiv);


    }
  }
  )
  
  $('#name').val('');

});

//Spotify stuff
$(".login").on("click", function () {
  var clientId = 'e221c3fdb93f4d7b9ae985aa464e0794'; // from https://developer.spotify.com/dashboard/applications
  var callbackURL = window.location.href; // the current web page
  spotify.login(clientId, callbackURL);
});

