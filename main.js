const express = require('express');
const app = express();
const path = require('path');

const config = require('./config.json');
const movieFactory = require("./src/services/movieFactory.js");

/* This was used in the beginning to test the views. Now data comes from the ghibli API */
const testMovies = require('./data/test_data.json');

/* Set ejs as the template engine for the server */
app.set('view engine', 'ejs');

/* Root route shows dashboard view of all movies. Uses optional sort parameter */
app.get('/:sortBy?', (req, res) => {

    /* Defaults to sort by title. This will be rendered in the client view */
    let sortBy = "Title"
    movieFactory.getMovies(config, (movies) => {

        let sortedMovies = movies;

        /* Sort movies alphabetically by title */
        if(req.params.sortBy === "title") {
            sortBy = "Title";
            sortedMovies.sort(function(a, b){
                if(a.title < b.title) return -1;
                if(a.title > b.title) return 1;
                return 0;
            });
        /* Sort movies by date of release */
        } else if (req.params.sortBy === "date") {
            sortBy = "Date";
            sortedMovies.sort(function(a, b) {
                return a.release_date - b.release_date;
            });
        } else if(req.params.sortBy === "rt_score") {
            sortBy = "RT Score";
            sortedMovies.sort(function(a, b) {
                return b.rt_score - a.rt_score;
            });
        }
        /* Renders the ejs file when sorting is complete */
        res.render('dashboard', {movies: sortedMovies, sorted: sortBy});
    });
});

app.get('/movie/:movieId', (req, res) => {
    movieFactory.getMovie(config, req.params.movieId, (movie) => {
        res.render('movie', {movie: movie});
    });
});


app.listen(config.port, () => {
    console.log('Server listening on port ' + config.port);
});