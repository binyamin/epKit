const path = require('path');
const fs = require('fs');

/**
 * Configuration Options
 * @typedef {Object} Options
 * @property {number} [port] - Eg. 8080, 5500
 * @property {boolean} [reload] - Enable live reloading?
 */

/**
 * Serve the folder (with live reload capabilities) 
 * @param {string} dir - Directory to serve
 * @param {Options} [opts] - Configuration Options
 */
const run = async (dir, {port=8080, reload=true}) => {
  let dirPath = path.resolve(dir);
  
  if(!fs.existsSync(dirPath)) throw new Error('Directory doesn\'t exist!');

  var browserSync = require("browser-sync").create();

  browserSync.init({
    server: {
      baseDir: [path.join(__dirname, '..', 'serve'), dirPath],
      routes: {
        "/": "serve",
        "/book": dirPath
      }
    },
    port,
    open: false,
    logLevel: "silent"
  });

  browserSync.reload(path.join(dirPath, '**/*'));
}

module.exports = {run}