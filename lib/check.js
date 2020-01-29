const {exec, spawn} = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Validate an epub file according to
 * [w3c specifications](https://www.w3.org/publishing/epub32/epub-spec.html)
 * @param {string} file - File to validate
 * @returns {Promise<string>}
 */
const run = (file) => {
    return new Promise(function(resolve, reject) {
        var filePath = path.resolve(file);
        var jarFile = path.join(__dirname, '../vendor/epubcheck/epubcheck.jar');
        
        isJavaValid().catch(e => {
            reject(e);
        })
        
        // Validate file argument
        if(!fs.existsSync(filePath)) reject('File not found')
        if(fs.lstatSync(filePath).isDirectory()) reject('Found folder; expected file')
        if(path.extname(filePath) !== '.epub' && path.extname(filePath) !== '.zip') reject('File not of type epub')
        
        // Execute validation command
        let repl = exec(`java -Xss1024k -jar ${jarFile} ${filePath}`);
        
        let data = {out:"", err:""};
        repl.stdout.on('data', c => data.out+=c)
        repl.stderr.on('data', c => data.err+=c)

        repl.on('exit', () => {
            if(repl.execErr) reject(repl.execErr);
            resolve(data.err + '\r\n' + data.out)
        })
    })
}
    
// Is Java 1.6+ Installed?
const isJavaValid = () => {
    return new Promise((resolve, reject) => {
        let {stderr} = spawn('java', ['-version'])
        
        stderr.on('data', data => {
            data = data.toString().split('\n')[0];
            
            var javaVersion = new RegExp('java version').test(data) ? data.split(' ')[2].replace(/"/g, '') : false;
            var hasValidVersion = javaVersion ? (Number(javaVersion.toString().slice(0, javaVersion.toString().lastIndexOf('.'))) >= 1.6) : false;
            
            if(hasValidVersion){
                resolve(`Java >= 1.6 is installed`);
            } else {
                reject("You must install Java >= 1.6 for this command")
            }
        })
    })
}

module.exports = {run}