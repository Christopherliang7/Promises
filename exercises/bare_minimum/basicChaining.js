/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var pluckFirstLine = require('./promiseConstructor.js');
var getResponse = require('./promisification.js').getGitHubProfileAsync;
var writeFileAsync = Promise.promisify(fs.writeFile);



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // read the first line of file path
  return pluckFirstLine.pluckFirstLineFromFileAsync(readFilePath)
    .then((firstLine) => {
      // get github profile from Github API
      return getResponse(firstLine);
    })
    // write JSON repsonse to API to writeFilePath
    .then((response) => {
      return writeFileAsync(writeFilePath, JSON.stringify(response));
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
