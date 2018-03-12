#!/usr/bin/env node

//-- Modules -------------------------------------------------------------------
const program = require('commander'); //CLI support for node.js
const packageJson = require(__dirname + '/../package.json'); //Package informations
const merge = require(__dirname + '/../src/merge.js');
//-- Modules -------------------------------------------------------------------

//Set version
program.version(packageJson.version);

//Options
program.option('-i, --input [path]', 'Input directory of wms-downloader tiles. Default is the current directory.');
program.option('-o, --output [path]', 'Output directory of single tile. Default is the current directory.');
program.option('-w, --workers [number]', 'Count of graphicsmagick workers. Default is 1.');
program.option('-f, --formats [ext]', 'List of formats (gif_tif_png_jpg). Convert the single tile in the listed formats.');

//Examples
program.on('--help', function() {
  console.log('  Examples:');
  console.log('');
  console.log('    Start merging with default options:');
  console.log('      $ merge');
  console.log('');
  console.log('    Start merging with custom options:');
  console.log('      $ merge -i ./input -o ./output -w 2');
  console.log('');
});

//Header
console.log('###################################################');
console.log('## ' + packageJson.name + ' v' + packageJson.version + ' #############################');
console.log('###################################################');

//Parse arguments
program.parse(process.argv);

let options = {
  inputDir: '.',
  outputDir: '.',
  outputFormats: [],
  workers: 1
};

//Set input directory
if(program.input){
  options.inputDir = program.input;
}
console.log('  Input directory: ' + options.inputDir);


//Set output directory
if(program.output){
  options.outputDir = program.output;
}
console.log('  Output directory: ' + options.outputDir);


//Set workers
if (program.workers) {
   options.workers = parseInt(program.workers);
}
console.log('  Workers: ' + options.workers);

//Set output directory
if (program.formats) {
  options.outputFormats = program.formats.split('_');
}
console.log('  Formats: ' + options.outputFormats);

//Merge tiles
merge(options, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Merged!');
  }
});

//Footer
console.log('###################################################');
console.log('## Stop process with Ctrl+C #######################');
console.log('###################################################');
