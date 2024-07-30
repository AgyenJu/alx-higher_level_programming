#!/usr/bin/node

const request = require('request');

// Get the movie ID from the command line arguments
const movieId = process.argv[2];

// Construct the API URL for the movie
const apiUrl = `https://swapi-api.alx-tools.com/api/films/${movieId}/`;

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  try {
    // Parse the JSON response
    const film = JSON.parse(body);

    // Extract the character URLs
    const characterUrls = film.characters;

    // Function to fetch character data
    const fetchCharacter = (url, callback) => {
      request(url, (err, res, charBody) => {
        if (err) {
          console.error(err);
          callback(err);
          return;
        }

        try {
          // Parse the character data
          const character = JSON.parse(charBody);
          callback(null, character.name);
        } catch (e) {
          console.error(e);
          callback(e);
        }
      });
    };

    // Fetch characters in the specified order
    let completedRequests = 0;
    const characters = [];

    characterUrls.forEach((url, index) => {
      fetchCharacter(url, (err, name) => {
        if (!err) {
          characters[index] = name;

          completedRequests += 1;
          if (completedRequests === characterUrls.length) {
            // Print all character names in the original order
            characters.forEach(name => console.log(name));
          }
        }
      });
    });

  } catch (err) {
    console.error(err);
  }
});
