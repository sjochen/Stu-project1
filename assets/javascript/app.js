


$('#submit').on('click', function (event) {
  event.preventDefault();
  var artist = $('#name').val();
  var queryURL = "https://api.seatgeek.com/2/events?performers.slug=" + artist.split(' ').join('-') + "&client_id=ODgwMzQ3NHwxNTYyMTA4NDA2LjE0";

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