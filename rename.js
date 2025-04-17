const fs = require('fs');
const path = require('path');

// Path to the images directory
const imagesDir = path.join(path.dirname(__filename)
// __dirname
, 'images');

// Read all files in the images directory
fs.readdir(imagesDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // Filter files with names longer than 5 characters
    const longNamedFiles = files.filter(file => file.length > 5);

    // Start renaming files with letters starting from 'g'
    let currentLetterCode = 'g'.charCodeAt(0);

    longNamedFiles.forEach(file => {
        const oldPath = path.join(imagesDir, file);
        const newFileName = String.fromCharCode(currentLetterCode) + '.jpg';
        const newPath = path.join(imagesDir, newFileName);

        fs.rename(oldPath, newPath, err => {
            if (err) {
                console.error(`Error renaming file ${file}:`, err);
            } else {
                console.log(`Renamed ${file} to ${newFileName}`);
            }
        });

        currentLetterCode++;
    });
});