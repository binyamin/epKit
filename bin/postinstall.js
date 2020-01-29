#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const https = require('https');
const JSZip = require("jszip");

var epcVersion = '4.2.2';
var baseDir = path.resolve(__dirname, '../vendor');
var zipFile = path.resolve(baseDir, 'epubcheck.zip');

const epubUrl = `https://github.com/w3c/epubcheck/releases/download/v${epcVersion}/epubcheck-${epcVersion}.zip`;

if(!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir)
}

if(fs.existsSync(path.resolve(baseDir, 'epubcheck'))) {
    process.exit();
}

// Download epubcheck-<version>.zip to ../vendor
https.get(epubUrl, res => {
    if (res.statusCode >= 300 && res.statusCode < 400) {
        https.get(res.headers.location, res => {
            res
            .pipe(fs.createWriteStream(zipFile))
            .on('close', function() {        

                // Once the file is written, unzip it
                unzip(zipFile);

                // We don't need the downloaded zip file anymore
                fs.unlinkSync(zipFile)
            })
        })
    }
})

const unzip = function(zipPath) {
    let data = fs.readFileSync(zipPath);

    JSZip.loadAsync(data).then(function(zip) {
        zip.forEach((relPath, file) => {
            relPath = relPath.replace(`-${epcVersion}`, ''); // `epubcheck-<version>` => `epubcheck`

            if(relPath.endsWith('/')) {
                fs.mkdirSync(path.resolve(baseDir, relPath));
            } else {
                file.async('string').then(fileData => {
                    fs.writeFileSync(path.resolve(baseDir, relPath), fileData)
                })
            }
        })
    })
}