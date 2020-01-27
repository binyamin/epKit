#! /usr/bin/env node
const program = require('commander');
const path = require('path');
const {version} = require('../package.json');
const lib = require('../lib');

program
    .name('epkit')
    .version(version, '-v, --version')
    .description('An epub development toolkit')

program
    .command('serve <folder>')
    .description('Serve an unzipped epub')
    .option('--port <number>', 'Port on which to serve the directory', v => (parseInt(v)), 8080)
    .action(function(dir, {port}) {
        try {
            lib.serve(dir, {port})
            console.log(`Serving ${path.basename(dir)} on localhost:${port}`);
        } catch(err) {
            console.error(err);
            process.exit();
        }
    })

program
    .command('zip <folder>')
    .description('Compress an unzipped epub')
    .action(function(dir) {
        try {
            lib.zip(dir).then(zip => {
                console.log(`New epub file created at ${path.join(path.resolve(dir), '..', zip)}`)
            })
        } catch(err) {
            console.error(err);
            process.exit();
        }
    })

program
    .command('check <file>')
    .description('Validate an epub file according to IDPF specifications')
    .action(function(file){
        try {
            lib.check(file).then(response => {
                console.log('Running epubcheck...');
                response.pipe(process.stdout);
            });
        } catch(err) {
            console.error(err);
            process.exit();
        }
    })

program.parse(process.argv);

if(!program.args.length) program.outputHelp();