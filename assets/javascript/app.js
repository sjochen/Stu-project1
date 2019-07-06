
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
    //artist.attr()
    var searchTerms = $("#name").val().trim();
    mySearch(searchTerms);
})




//spotify
function myLogin() {
  var clientId = 'e221c3fdb93f4d7b9ae985aa464e0794'; // from https://developer.spotify.com/dashboard/applications
  var callbackURL = window.location.href; // the current web page
  spotify.login(clientId, callbackURL);
}
function myCallback(data) {
  console.log(data);
}

function mySearch(searchTerms) {
$('#main').html('');
spotify.call(
  'https://api.spotify.com/v1/search',
  { 
    q: searchTerms, 
    type: 'track,artist', 
    market: 'US', 
    limit: '3', 
    offset: '0' },
 myCallback);
}
