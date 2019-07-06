//Spotify stuff
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
};



$('#submit').on('click', function (event) {
  event.preventDefault();
  var artist = $('#name').val();
  var queryURL = "https://api.seatgeek.com/2/events?performers.slug=" + artist.split(' ').join('-') + "&client_id=ODgwMzQ3NHwxNTYyMTA4NDA2LjE0";
  
  //Spotify stuff
  var searchTerms = $("#name").val().trim();

  mySearch(searchTerms);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    //var performers = response.events.performers;

    var results = response.events;
    console.log(results);
    for (var i = 0; i < results.length; i++) {


      var musicDiv = $('<div>');

      var location = $('<p>').text("Location: " + results[i].venue.display_location);
      var date = $('<p>').text("Date: " + results[i].datetime_local);
      var link = $('<a>').text("Click Here to Purchase Ticket");

      link.attr('href', results[i].url);
      musicDiv.addClass('music-div');

      musicDiv.append(location);
      musicDiv.append(date);
      musicDiv.append(link);

      $('.container').append(musicDiv);


    }
    //for (var j = 0; j < performers.length; j++) {
    //var name = $ ('<p>').text("Artist: " + performers[j]);
    //musicDiv.prepend(name);}

  }




  )
});

//Spotify stuff
$(".login").on("click", function() {
  var clientId = 'e221c3fdb93f4d7b9ae985aa464e0794'; // from https://developer.spotify.com/dashboard/applications
  var callbackURL = window.location.href; // the current web page
  spotify.login(clientId, callbackURL);
});