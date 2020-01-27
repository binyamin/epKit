const fs = require('fs');
const path = require('path');
const request = require('request');
const AdmZip = require('adm-zip');

var epcVersion = '4.2.2';
var zipFile = path.resolve(__dirname, '../vendor/epubcheck.zip');

const url = `https://github.com/w3c/epubcheck/releases/download/v${epcVersion}/epubcheck-${epcVersion}.zip`;

request({url, encoding: null})
.pipe(fs.createWriteStream(zipFile))
.on('close', function() {
    var zip = new AdmZip(zipFile);
    zip.extractAllTo(path.resolve(__dirname, "../vendor"),true);
    fs.renameSync(path.resolve(__dirname, `../vendor/epubcheck-${epcVersion}`), path.resolve(__dirname, '../vendor/epubcheck'))
    fs.unlinkSync(zipFile)
})