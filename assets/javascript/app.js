
var artist = $('#submit').val().trim();
var queryURL = "https://api.seatgeek.com/2/events?performers.slug=" + artist.split(' ').join('20%') + "&client_id=ODgwMzQ3NHwxNTYyMTA4NDA2LjE0";


$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
console.log(response);
});


$('#submit').on('click', function(event){
    event.preventDefault();
    artist.attr()
})