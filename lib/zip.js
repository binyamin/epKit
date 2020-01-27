const path = require('path');
const fs = require('fs');
const archiver = require("archiver");
/**
 * Convert a folder to an epub file
 * @param {string} dir - Directory to compress
 */
const run = async (dir) => {
  let dirPath = path.resolve(dir);
  let zip = path.basename(dirPath) + '.epub';
  
  // Folder & mimetype exist
  if(!fs.existsSync(dirPath)) throw new Error('Directory doesn\'t exist!');
  if(!fs.existsSync(path.join(dirPath, 'mimetype'))) throw new Error('Mimetype not found in root folder');
  
  var output = fs.createWriteStream(path.join(dirPath, '..', zip));
  
  var archive = archiver('zip', { zlib: { level: 9 } });
  
  archive.on('warning', function(err) {
    throw err;
  });
    
  archive.on('error', function(err) {
    throw err
  });
    
  archive.pipe(output);
  
  archive.file(path.join(dirPath, 'mimetype'), { name: 'mimetype', store: true});
  archive.glob('**/*', {cwd: dirPath, ignore: ['mimetype']});
  archive.finalize();

 return zip;
}

module.exports = {run}