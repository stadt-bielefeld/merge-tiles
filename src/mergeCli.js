#!/usr/bin/env node

//-- Modules -------------------------------------------------------------------
let fs = require('fs.extra');
let program = require('commander'); //CLI support for node.js
let packageJson = require(__dirname + '/../package.json'); //Package informations
let mergeTiles = require(__dirname + '/../index.js').mergeTiles;
let convertImage = require(__dirname + '/../index.js').convertImage;
let isImage = require(__dirname + '/../index.js').isImage;
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

//Set output directory
if (program.formats) {
  program.formats = program.formats.split('_');
  console.log('  Formats: ' + program.formats);
}



//Merge tiles
mergeTiles(program.input, program.output, parseInt(program.workers), (err) => {
  if (err) {
    console.log(err);
  } else {
    if(program.formats){
      //Read filenames
      let inputFiles = fs.readdirSync(program.output);
      let inputFileInfo;

      //Determine imageInfo of input file
      inputFiles.forEach((file)=>{
        let imageInfo = isImage(file);
        if(imageInfo){
          inputFileInfo = imageInfo;
        }
      });

      //Convert the single tile in the other formats.
      if(inputFileInfo){
        convertImage(program.output + '/all.' + inputFileInfo.ext, program.formats, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }

    }

  }
});

//Footer
console.log('###################################################');
console.log('## Stop process with Ctrl+C #######################');
console.log('###################################################');
