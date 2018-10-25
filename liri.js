//Stuff that is required.
const dotenv = require("dotenv").config();
const keys = require('./keys.js');
const Twitter = require('twitter');
const request = require('request');
const Spotify = require('node-spotify-api');
const fs = require('fs');


//variable for the command.
let command = process.argv[2];


//-----Functions-----
function randomCommand() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        var dataArr = data.split(",");

        randomCommand = dataArr[0];
        searchItem = dataArr[1];

        if (randomCommand === 'spotify-this-song') {
            process.argv.push(searchItem);
            spotifyThis();
        }
        if (randomCommand === 'movie-this') {
            process.argv.push(searchItem);
            movieThis(searchItem);
        }

    });
}


function movieThis() {

    let movie = process.argv[3];
    //If no movie is searched.
    if (process.argv[3] === undefined) {
        request("https://www.omdbapi.com/?t=Mr%20Nobody&y=&plot=short&apikey=trilogy", function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(
                    "____________________________\n" +
                    "I see you didn't put a movie in. \n" +
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

function spotifyThis() {
    const spotify = new Spotify(keys.spotify);
    let songName = process.argv[3];
    if (songName === undefined) {
        console.log(
            "Please input a song name!\nMake sure it's in quotes too. Ex: 'song name'"
        )
    }
    else {
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
};

function displayTweets() {
    let client = new Twitter(keys.twitter);
    console.log("____________________________");
    console.log("Here are your latest tweets. :)");

    //Please add your own screen name!!
    const params = { screen_name: 'heyjasonf' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log("\n" + tweets[i].created_at + "\n   " + tweets[i].text);
            }
        }
    });

}

function intro(){
    console.log(
        "\nHello, I am Liri!",
        "\nI can do these following commands...",
        "\nmy-tweets",
        "\nspotify-this-song '(song name)'",
        "\nmovie-this '(movie-this)'",
        "\ndo-what-it-says",
        "\n\nPlease type 'node liri.js [command]' to get started!",
        "\nIf you need help, just type 'node liri.js' again"
    )
}


//------------------------------------------------

//-----The Commands-----
switch (command) {
    case 'spotify-this-song':
    spotifyThis();
    break;
    case 'my-tweets':
    displayTweets();
    break;
    case 'do-what-it-says':
    randomCommand();
    break;
    case undefined: 
    intro();
    break;
}
//-------------------------

