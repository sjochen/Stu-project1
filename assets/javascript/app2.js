//Spotify stuff
// function mySearch(searchTerms) {
//     $('#main').html('');
//     spotify.call(
//         'https://api.spotify.com/v1/search',
//         {
//             q: searchTerms,
//             type: 'track,artist',
//             market: 'US',
//             limit: '3',
//             offset: '0'
//         },
//         myCallback);
// }
// function myCallback(data) {
//     console.log(data);
// };



$('#submit').on('click', function (event) {
    event.preventDefault();
    var area = $('#area').val();
    var range = $('#range').val();
    var queryURL = "https://api.seatgeek.com/2/events?per_page=25&geoip=" + area + "&range=" + range + "mi&client_id=ODgwMzQ3NHwxNTYyMTA4NDA2LjE0";


    //Spotify stuff
    // var searchTerms = $("#area").val().trim();

    // mySearch(searchTerms);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var results = response.events;

        for (var i = 0; i < results.length; i++) {

            var musicDiv = $('<div>');

            var artistName = $('<p>').text("Artist: ");
            var date = $('<p>').text("Date: " + results[i].datetime_local);
            var name = $('<p>').text(results[i].venue.name);
            var address = $('<p>').text(results[i].venue.address);
            var address2 = $('<p>').text(results[i].venue.extended_address);
            var link = $('<a>').text("Click Here to Get Tickets from SeatGeek");

            link.attr('href', results[i].url);
            var sing = $('<div>');
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

            musicDiv.append(sing);
            musicDiv.append(date);
            musicDiv.append(name);
            musicDiv.append(address);
            musicDiv.append(address2);
            musicDiv.append(link);
            musicDiv.addClass('music-div');

            $('#results').append(musicDiv);
        }
    })
});

//Spotify stuff
// $(".login").on("click", function () {
//     var clientId = 'e221c3fdb93f4d7b9ae985aa464e0794'; // from https://developer.spotify.com/dashboard/applications
//     var callbackURL = window.location.href; // the current web page
//     spotify.login(clientId, callbackURL);
// });