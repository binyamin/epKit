const path = require('path');
const fs = require('fs');
const jszip = require("jszip");

/**
 * Convert a folder to an epub file
 * @param {string} dir - Directory to compress
 * @returns {Promise<string>}
 */
const run = async (dir) => {
  let dirPath = path.resolve(dir);
  let zip = path.basename(dirPath) + '.epub';
  
  // Folder & mimetype exist
  if(!fs.existsSync(dirPath)) throw new Error('Directory doesn\'t exist!');
  
  try {
    var output = fs.createWriteStream(path.join(dirPath, '..', zip));
    
    let jsz = new jszip();

    jsz.file('mimetype', 'application/epub+zip', { compression: "STORE" })
    walk(dirPath).forEach(filePath => {
      if((/^(?!mimetype$).*$/gi).test(path.basename(filePath))) {
        let name = filePath.split('book')[1].slice(1).replace(/\\/g, '/');
        jsz.file(name, fs.readFileSync(filePath))
      }
    })

    jsz.generateNodeStream({type: "nodebuffer", streamFiles: true})
    .pipe(output);
    return zip
  } catch(e) {
    throw e
  }
}

const walk = function(dir, fileList = []) {
  // Get all files within subdirectories
  const files = fs.readdirSync(dir)
  for (const file of files) {
      const stat = fs.statSync(path.join(dir, file))
      if (stat.isDirectory()) fileList = walk(path.join(dir, file), fileList)
      else fileList.push(path.join(dir, file))
  }
  return fileList
}

module.exports = {run}