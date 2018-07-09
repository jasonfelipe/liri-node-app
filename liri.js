const dotenv = require("dotenv").config();

const apiKeys = require("keys.js")
const Twitter = require('twitter');
const request = require('request');
const Spotify = require('node-spotify-api');



var spotify = new spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//add my-tweets

//add spotify-this-song

//add movie-this

//do-what-it-says