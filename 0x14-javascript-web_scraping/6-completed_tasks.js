#!/usr/bin/node

const request = require('request');

// Get the API URL from the command line arguments
const apiUrl = process.argv[2];

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  try {
    // Parse the JSON response
    const todos = JSON.parse(body);

    // Create an object to store the number of completed tasks for each user
    const completedTasks = {};

    // Loop through each todo item
    todos.forEach(todo => {
      // Check if the task is completed
      if (todo.completed) {
        // Increment the count of completed tasks for the user
        if (!completedTasks[todo.userId]) {
          completedTasks[todo.userId] = 0;
        }
        completedTasks[todo.userId]++;
      }
    });

    // Print the result
    console.log(completedTasks);
  } catch (err) {
    console.error(err);
  }
});
