# liri-node-app 

Liri is a simple bot that can take three commands (as of right now)
my-tweets - shows the last 20 tweets*
movie-this '(movie name)'
spotify-this-song '(song name)'
do-what-it-says

If no command is input, Liri does a simple introduction that says what it can do.


*Also inside the code you must add your screen name into the twitter section! (will be updated later to fix this)


# Prerequsites 

Once downloaded, please use npm init and then npm i

npm i will install:
dotenv - reads the env file that is needed for API keys
twitter - for the twitter command
request - takes requests from urls, for liri it's OMDB
node-spotify-api - uses spotify to get songs

# installing
please use a .env file inside the liri file directory and add these lines into it without quotes.

"# Spotify API keys"

"SPOTIFY_ID=your-spotify-id"
"SPOTIFY_SECRET=your-spotify-secret"

"# Twitter API keys"

"TWITTER_CONSUMER_KEY=your-twitter-consumer-key"
"TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret"
"TWITTER_ACCESS_TOKEN_KEY=your-access-token-key"
"TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret"

# Authors
Jason Felipe

linkedin - https://www.linkedin.com/in/jason-felipe-089558107
github - https://github.com/jasonfelipe/

#Acknowledgements

Thanks to the UA Bootcamp for helping me! 