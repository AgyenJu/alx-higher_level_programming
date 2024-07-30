#!/usr/bin/node

const request = require('request');
const apiUrl = process.argv[2];

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
  } else {
    const data = JSON.parse(body);
    let count = 0;

    data.results.forEach((movie) => {
      if (movie.characters.includes('https://swapi-api.alx-tools.com/api/people/18/')) {
        count++;
      }
    });

    console.log(count);
  }
});
