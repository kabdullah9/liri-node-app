require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var Twitter = require("twitter");
var request = require('request')
var command = process.argv[2];
var song = process.argv[3];

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var params = {
    screen_name: 'khalizal',
    count: 20,
    result_type: 'recent',
    lang: 'en'
};
if (command === 'my-tweets') {
    client.get('statuses/user_timeline', params, function (error, tweets) {
        if (error) throw error;
        for (var i = 2; i < tweets.length; i++) {
            console.log(tweets[i].created_at);
            // var theTime = tweets[i].created_at; // wanted to try to append text.
            // console.log(theTime);
            console.log(tweets[i].text);
            // var theTxt = tweets[i].text;
            // console.log(theTxt);
            console.log('');
        }
    })
}
if (command === `spotify-this-song`) {
    if (song == null) {
        song = 'The Sign by Ace of Base.';
    }
    spotify.search({ type: 'track', query: song }, function (error, data) {
        //tried to put process.argv in a loop
        for (var i = 3; i < song.length; i++) {
            song = song[i];
        }
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        var artObj = data.tracks.items;
        for (var i = 0; i < artObj.length; i++) {
            // console.log(data.tracks.release_date);
            console.log(artObj[i].name);
            console.log(artObj[i].artists[0].name);
            console.log(artObj[i].preview_url);
            console.log(artObj[i].album.name);
            console.log('');
        }
    });
}
if (command === `movie-this`) {
    movieName = process.argv[3];
    console.log('hi')
    imdbKey = "af7c3e54";
    request("http://www.omdbapi.com/?t=" + movieName + "&apikey=" + imdbKey, function (error, response, body) {
        if (error) console.log('ERROR', error);
        if (!error) {
            console.log("");
            var saperator = "---------";
            console.log(saperator);
            var Title = "Title: " + JSON.parse(body).Title;
            console.log(Title);
            var Year = "Year: " + JSON.parse(body).Year;
            console.log(Year);
            var Rated = "Rated: " + JSON.parse(body).Rated;
            console.log(Rated);
            var imdbRatings = "imdbRatings: " + JSON.parse(body).imdbRating;
            console.log(imdbRatings);
            var Country = "Country: " + JSON.parse(body).Country;
            console.log(Country);
            var Language = "Language: " + JSON.parse(body).Language;
            console.log(Language);
            var Plot = "Plot " + JSON.parse(body).Plot;

        }
    });
}


