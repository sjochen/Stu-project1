$('#submit').on('click', function (event) {
    event.preventDefault();
    var area = $('#area').val();
    var range = $('#range').val();
    var queryURL = "https://api.seatgeek.com/2/events?per_page=25&geoip=" + area + "&range=" + range + "mi&client_id=ODgwMzQ3NHwxNTYyMTA4NDA2LjE0";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var results = response.events;

        for (var i = 0; i < results.length; i++) {

            var musicDiv = $('<div>');

            var artistName = $('<p>').text("");
            var date = $('<p>').text("Date: " + moment(results[i].datetime_local, 'YYYY-MM-DD HH:mm').format('MMMM Do YYYY, hh:mm A'));
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
            musicDiv.addClass('card');

            $('#results').append(musicDiv);
        }
    })
});

//Spotify stuff
$(".login").on("click", function () {
    var clientId = 'e221c3fdb93f4d7b9ae985aa464e0794'; // from https://developer.spotify.com/dashboard/applications
    var callbackURL = window.location.href; // the current web page
    spotify.login(clientId, callbackURL);
});
$("#search").on("click", function () {
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
            songLink.text('Click Here to listen to ' + '"' + songName + '"' + ' by ' + songArtist)
            songDiv.prepend(songLink);
            $('#song-box').prepend(songDiv);
        };
    };
})