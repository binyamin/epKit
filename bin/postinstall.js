#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const request = require('request');
const AdmZip = require('adm-zip');

var epcVersion = '4.2.2';
var zipFile = path.resolve(__dirname, '../vendor/epubcheck.zip');

const url = `https://github.com/w3c/epubcheck/releases/download/v${epcVersion}/epubcheck-${epcVersion}.zip`;

if(!fs.existsSync(path.resolve(__dirname, '../vendor/epubcheck'))) {
    request({url, encoding: null})
    .pipe(fs.createWriteStream(zipFile))
    .on('close', function() {
        var zip = new AdmZip(zipFile);
        zip.extractAllTo(path.resolve(__dirname, "../vendor"),true);
        fs.renameSync(path.resolve(__dirname, `../vendor/epubcheck-${epcVersion}`), path.resolve(__dirname, '../vendor/epubcheck'))
        fs.unlinkSync(zipFile)
    })
}