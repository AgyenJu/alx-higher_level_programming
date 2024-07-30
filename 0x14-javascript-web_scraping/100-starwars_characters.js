#!/usr/bin/node

const request = require('request');

// Get the movie ID from the command line arguments
const movieId = process.argv[2];

// Construct the API URL
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

    // Fetch each character's data
    characterUrls.forEach(url => {
      request(url, (err, res, charBody) => {
        if (err) {
          console.error(err);
          return;
        }

        try {
          // Parse the character data
          const character = JSON.parse(charBody);

          // Print the character's name
          console.log(character.name);
        } catch (e) {
          console.error(e);
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
});
