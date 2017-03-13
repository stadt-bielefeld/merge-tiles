#!/usr/bin/env node

//-- Modules -------------------------------------------------------------------
let program = require('commander'); //CLI support for node.js
let packageJson = require(__dirname + '/../package.json'); //Package informations
let mergeTiles = require(__dirname + '/../index.js').mergeTiles;
//-- Modules -------------------------------------------------------------------

//Set version
program.version(packageJson.version);

//Options
program.option('-i, --input [type]', 'Input directory of wms-downloader tiles. Default is the current directory.');
program.option('-o, --output [type]', 'Output directory of single tile. Default is the current directory.');
program.option('-w, --workers [type]', 'Count of graphicsmagick workers. Default is 1.');


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

//Set input directory
if (!program.input) {
  program.input = '.';
}
console.log('  Input directory: ' + program.input);

//Set output directory
if (!program.output) {
  program.output = '.';
}
console.log('  Output directory: ' + program.output);


//Set output directory
if (!program.workers) {
  program.workers = '1';
}
console.log('  Workers: ' + program.workers);

//Merge tiles
mergeTiles(program.input,program.output,parseInt(program.workers),(err)=>{
  if(err){
    console.log(err);
  }else{
    console.log('DDDD');
  }
});

//Footer
console.log('###################################################');
console.log('## Stop process with Ctrl+C ######################');
console.log('###################################################');
