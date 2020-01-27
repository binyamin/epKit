const {exec} = require('child_process');
const fs = require('fs');
const path = require('path');
/**
 * Validate an epub file according to
 * [w3c specifications](https://www.w3.org/publishing/epub32/epub-spec.html)
 * @param {string} file - File to validate
 * @returns {Promise<string>}
 */
const run = async (file) => {
    let filePath = path.resolve(file);
    const jarFile = path.join(__dirname, '../vendor/epubcheck/epubcheck.jar');

    // Validate file argument
    if(!fs.existsSync(filePath)) throw new Error('File not found')
    if(fs.lstatSync(filePath).isDirectory()) throw new Error('Found folder; expected file')
    if(path.extname(filePath) !== '.epub' && path.extname(filePath) !== '.zip') throw new Error('File not of type epub')

    let {execErr, stdout, stderr} = exec(`java -Xss1024k -jar ${jarFile} ${filePath}`)
    if(execErr) throw execErr;
    if(stdout) return stdout;
    if(stderr) throw stderr;
}

module.exports = {run}