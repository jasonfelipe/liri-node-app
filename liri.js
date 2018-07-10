//Stuff that is required.
const dotenv = require("dotenv").config();
const keys = require('./keys.js');
const Twitter = require('twitter');
const request = require('request');
const Spotify = require('node-spotify-api');

//variable for the command.
const command = process.argv[2];



//-----The Commands-----

//node liri.js my-tweets
if (command === 'my-tweets') {
    const client = new Twitter(keys.twitter);
    console.log("____________________________");
    console.log("Here are your latest tweets. :)");
    const params = { screen_name: 'heyjasonf' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log("\n" + tweets[i].created_at + "\n   " + tweets[i].text);
            }
        }
    });

}

//node liri.js spotify-this-song
if (command === 'spotify-this-song') {
    const spotify = new spotify(keys.spotify);
    const songName = process.argv[3];

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        console.log(data);
    });

}

//node liri.js movie-this
if (command === 'movie-this') {
    var movie = process.argv[3];

    request("https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            if (JSON.parse(body).Response != "False") {
                console.log("____________________________");
                console.log("Here is your movie. :) \n")
                console.log("The movie title is: " + JSON.parse(body).Title);
                console.log("Movie release date is: " + JSON.parse(body).Year);
                console.log("This movie was created in: " + JSON.parse(body).Country);
                console.log("The Rotten Tomatoes Rating is: " + JSON.parse(body).Ratings[1].Value);
                console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
                console.log("\nHere are the actors: " + JSON.parse(body).Actors + "\n");
                console.log("Here is the plot: \n" + JSON.parse(body).Plot);
            }

            else {
                console.log("____________________________");                
                console.log("Sorry I cannot find your movie! :(");
            }
        }
    });
}

//do-what-it-says
if (command === 'do-what-it-says') {
    console.log('Hey this is a command to do whatever');
}
//-------------------------

