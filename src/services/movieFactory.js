const request = require('request');

/* Use module to export function */
module.exports = {
    getMovies,
    getMovie
}

function getMovies(config, callback) {
    /* Using request library to get movies from ghibli API */
    request(config.ghibliApi.baseUrl + "/films", (err, response, body) => {
        if(err) {
            console.log("Error when getting movies");
            console.log(err);
        } else {
            /* Callback function gives object of the resulting request back to server */
            callback(JSON.parse(body));
        }
    });
}

function getMovie(config, movieId, callback) {
    request(config.ghibliApi.baseUrl + "/films/" + movieId, (err, response, body) => {
        if(err) {
            console.log("Error when getting specific movie");
            console.log(err);
        } else {
            callback(JSON.parse(body));
        }
    });
}