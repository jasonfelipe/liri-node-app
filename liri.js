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
    const spotify = new Spotify(keys.spotify);
    const songName = process.argv[3];

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            console.log(
                "______________________________________________________\n" +
                'Sorry, an error occurred: \n' + err +
                "\nHow about you listen Ace of Base instead? \nI recommend The Sign! :)"
            );
            spotify.search({ type: 'album', query: "Happy Nation" }, function (err2, data2) {
                if (!err2) {
                    console.log(
                        "\nArtist: " + data2.albums.items[0].artists[0].name,
                        "\nAlbum: " + data2.albums.items[0].name,
                        "\nSpotify URL: " + data2.albums.items[0].external_urls.spotify


                    )
                }
            });

            return;
        }
        console.log(
            "______________________________________________________\n" +
            "Song Name: " + data.tracks.items[0].name,
            "\nArtist: " + data.tracks.items[0].artists[0].name,
            "\nAlbum Name: " + data.tracks.items[0].album.name,
            "\nSpotify Link: " + data.tracks.items[0].external_urls.spotify
        );
    });

}

//node liri.js movie-this
if (command === 'movie-this') {
    var movie = process.argv[3];

    //If no movie is searched.
    if (process.argv[3] === undefined) {
        request("https://www.omdbapi.com/?t=Mr%20Nobody&y=&plot=short&apikey=trilogy", function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(
                    "____________________________\n" +
                    "I see you didn't put a movie in. \n"+
                    "Well I recommend Mr. Nobody! It's on Netflix!\n",
                    "\nThe movie title is: " + JSON.parse(body).Title,
                    "\nMovie release date is: " + JSON.parse(body).Year,
                    "\nThis movie was created in: " + JSON.parse(body).Country,
                    "\nThe Rotten Tomatoes Rating is: " + JSON.parse(body).Ratings[1].Value,
                    "\nThe movie's IMDB rating is: " + JSON.parse(body).imdbRating + "\n",
                    "\nHere are the actors: \n" + JSON.parse(body).Actors + "\n" +
                    "\nHere is the plot: \n" + JSON.parse(body).Plot

                );

            }

        });
    }
    else {
        //takes the user input. 
        request("https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
            if (!error && response.statusCode === 200) {

                //if the response isn't nothing.
                if (JSON.parse(body).Response != "False") {
                    console.log(
                        "____________________________\n" +
                        "Here is your movie. :)\n",
                        "\nThe movie title is: " + JSON.parse(body).Title,
                        "\nMovie release date is: " + JSON.parse(body).Year,
                        "\nThis movie was created in: " + JSON.parse(body).Country,
                        "\nThe Rotten Tomatoes Rating is: " + JSON.parse(body).Ratings[1].Value,
                        "\nThe movie's IMDB rating is: " + JSON.parse(body).imdbRating + "\n",
                        "\nHere are the actors: \n" + JSON.parse(body).Actors + "\n" +
                        "\nHere is the plot: \n" + JSON.parse(body).Plot
                    );

                }
                //if it comes up with nothing.
                else {
                    console.log("____________________________");
                    console.log("Sorry I cannot find your movie! :(");
                }
            }

        });
    }
}

//do-what-it-says
if (command === 'do-what-it-says') {
    console.log('Hey this is a command to do whatever');
}
//-------------------------

