'use strict';

const fs = require('fs-extra');

function copyWorldFile(info, tile){
  let inputFile = info.inputDir + '/x' + tile.x.from + '_y' + tile.y.from + '.' + info.tiles.worldFileExt;
  let outputFiles = [];

  outputFiles.push(info.outputDir + '/' + info.tiles.fileExt + '/' + tile.name + '.' + info.tiles.worldFileExt);
  info.outputFormats.forEach((f)=>{
    if(f.fileExt !== info.tiles.fileExt){
      let outputFile = info.outputDir + '/' + f.fileExt + '/' + tile.name + '.' + f.worldFileExt;
      outputFiles.push(outputFile);
    }
  });

  try {
    outputFiles.forEach((f)=>{
      fs.copySync(inputFile,f);
    });
  } catch (e) {
    console.error(e);
  }

}

module.exports = copyWorldFile;
