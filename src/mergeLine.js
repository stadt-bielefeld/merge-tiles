'use strict';

const gm = require('gm');

function mergeLine(info, tile, getNextLineIndex, callback) {

  let y = getNextLineIndex();
  if (y !== false) {

    let file = info.inputDir + '/x' + tile.x.from + '_y' + y + '.' + info.tiles.fileExt;
    let img = gm(file);

    for (let x = tile.x.from + 1; x <= tile.x.to; x++) {
      file = info.inputDir + '/x' + x + '_y' + y + '.' + info.tiles.fileExt;
      img.append(file, true);
    }

    let outputFile = info.outputDir + '/' + info.tiles.fileExt + '/' + tile.name + '_l' + y + '.' + info.tiles.fileExt;

    img.write(outputFile, (err) => {
      if(err){
        callback(err);
      }else{
        mergeLine(info, tile, getNextLineIndex, callback);
      }
    });

  } else {
    callback();
  }
}

module.exports = mergeLine;
