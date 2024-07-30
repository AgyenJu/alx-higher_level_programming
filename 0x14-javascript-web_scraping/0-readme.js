#!/usr/bin/node

const fs = require('fs');
const path = require('path');

// Get the file path from the command-line arguments
const filePath = process.argv[2];

if (!filePath) {
    console.error('Please provide a file path as the first argument.');
    process.exit(1);
}

// Resolve the full path
const fullPath = path.resolve(filePath);

// Read the file in UTF-8 encoding
fs.readFile(fullPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Print the file content
    console.log(data);
});
