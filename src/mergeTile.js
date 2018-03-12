'use strict';

const gm = require('gm');
const fs = require('fs-extra');
const mergeLine = require(__dirname + '/mergeLine.js');
const copyWorldFile = require(__dirname + '/copyWorldFile.js');
const log = require(__dirname + '/logger.js');

function mergeTile(info, tile, callback) {

  //Correct workers, if you have not enough memory
  var workers = info.workers;
  let singleLineSize = info.tiles.width * info.tiles.height * info.tiles.bytesPerPixel * (tile.y.to + 1); //Line size in bytes
  for (let i = workers; i > 0; i--) {
    let sumLineSize = singleLineSize * i;
    if (info.freeMemory > sumLineSize) {
      workers = i;
      break;
    }
  }

  var lineIndex = tile.y.from - 1;
  var getNextLineIndex = () => {
    lineIndex = lineIndex + 1;
    if (lineIndex <= tile.y.to) {
      return lineIndex;
    } else {
      return false;
    }
  };



  var callbackCounter = 0;
  var mergeLineCallback = (err) => {
    callbackCounter++;
    if (workers === callbackCounter) {

      if (err) {
        callback(err);
      } else {
        //Merge lines
        let file = info.outputDir + '/' + info.tiles.fileExt + '/' + tile.name + '_l' + tile.y.from + '.' + info.tiles.fileExt;
        let img = gm(file);
        for (let y = tile.y.from + 1; y <= tile.y.to; y++) {
          file = info.outputDir + '/' + info.tiles.fileExt + '/' + tile.name + '_l' + y + '.' + info.tiles.fileExt;
          img.append(file, false);
        }
        let outputFile = info.outputDir + '/' + info.tiles.fileExt + '/' + tile.name + '.' + info.tiles.fileExt;
        img.write(outputFile, (err) => {

          //Remove temp files
          for (let y = tile.y.from; y <= tile.y.to; y++) {
            let file = info.outputDir + '/' + info.tiles.fileExt + '/' + tile.name + '_l' + y + '.' + info.tiles.fileExt;
            try {
              fs.removeSync(file);
            } catch (e) {
              log(e.message, 'ERROR');
            }
          }

          //copy worldfile
          copyWorldFile(info, tile);

          callback(err);
        });
      }


    }
  };

  for (let j = 0; j < info.workers; j++) {
    mergeLine(info, tile, getNextLineIndex, mergeLineCallback);
  }

}



module.exports = mergeTile;
