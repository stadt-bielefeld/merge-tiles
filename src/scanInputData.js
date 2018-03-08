'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const sizeOf = require('image-size');
const determineXY = require(__dirname + '/determineXY.js');
const isImage = require(__dirname + '/isImage.js');
const worldFileExtensions = require(__dirname + '/worldFileExtensions.js');

/**
 * Determines information about the input data
 * @param  {String} options.inputDir      Path to the input directory
 * @param  {String} options.outputDir     Path to the input directory
 * @param  {String|Array} [options.outputFormats] Optional, default is the input format. For example, string: 'png', array: ['png','gif','tif']
 * @param  {Number} [options.workers] Optional, default is 1.
 * @return {object}               Object with a lots of information about the input data, see example.
 * @example
 *
 * //execute function
 * scanInputData('D:/input', 'D:/output', ['gif', 'tif']);
 *
 * //return object
 * {
 *   "inputDir": "D:/input",
 *   "outputDir": "D:/output",
 *   "outputFormats": [
 *     {
 *       "fileExt": "gif",
 *       "worldFileExt": "gfw"
 *     }
 *   ],
 *   "workers": 2,
 *   "freeMemory": 12207316992,
 *   "tiles": {
 *     "fileExt": "tif",
 *     "worldFileExt": "tfw",
 *     "numOfX": 15,
 *     "numOfY": 22,
 *     "width": 3000,
 *     "height": 3000,
 *     "bytesPerPixel": 3
 *   }
 * }
 *
 *
 *
 */
//function scanInputData(inputDir, outputDir, outputFormats) {
function scanInputData(options) {

  let opt = {};
  opt.inputDir = path.resolve(options.inputDir);
  console.log(opt.inputDir);
  opt.outputDir = path.resolve(options.outputDir);
  opt.outputFormats = [];
  opt.workers = 1;
  if(options.workers){
    opt.workers = options.workers;
  }
  opt.freeMemory = os.freemem() - 1 * 1024 * 1024 * 1024; //Free memory in bytes - 1 GB memory reserve

  let firstImageFile = opt.inputDir + '/';

  opt.tiles = {};
  let files = fs.readdirSync(opt.inputDir);
  for (let i = 0; i < files.length; i++) {
    let ext = isImage(files[i]);
    if (ext) {
      firstImageFile += files[i];
      opt.tiles.fileExt = ext;
      opt.tiles.worldFileExt = worldFileExtensions[ext];
      if (options.outputFormats) {
        if (Array.isArray(options.outputFormats)) {
          for (let i = 0; i < options.outputFormats.length; i++) {
            opt.outputFormats.push({
              fileExt: options.outputFormats[i],
              worldFileExt: worldFileExtensions[options.outputFormats[i]]
            });
          }
        } else {
          opt.outputFormats.push({
            fileExt: options.outputFormats,
            worldFileExt: worldFileExtensions[options.outputFormats]
          });
        }
      } else {
        opt.outputFormats.push({
          fileExt: opt.tiles.fileExt,
          worldFileExt: opt.tiles.worldFileExt
        });
      }
      break;
    }
  }

  //Determine number of tiles
  opt.tiles.numOfX = 0;
  opt.tiles.numOfY = 0;
  files.forEach((f) => {
    if (isImage(f)) {
      let img = determineXY(f);
      if (opt.tiles.numOfX < img.x) {
        opt.tiles.numOfX = img.x;
      }
      if (opt.tiles.numOfY < img.y) {
        opt.tiles.numOfY = img.y;
      }
    }
  });

  //Determine image size in pixel
  let imgSize = sizeOf(firstImageFile);
  opt.tiles.width = imgSize.width;
  opt.tiles.height = imgSize.height;

  //TODO, detect pixels size from image
  opt.tiles.bytesPerPixel = 6; //24 bit RGB: 3 bytes per pixel (one byte for each of R, G, B)


  return opt;
}

module.exports = scanInputData;
