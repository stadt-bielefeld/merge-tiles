'use strict';

const fs = require('fs-extra');

/**
 * TODO
 * @param {*} info 
 */
function ensureOutputDirs(info) {
  fs.ensureDirSync(info.outputDir);
  fs.ensureDirSync(info.outputDir + '/' + info.tiles.fileExt);
  info.outputFormats.forEach((f)=>{
    fs.ensureDirSync(info.outputDir + '/' + f.fileExt);
  });
}

module.exports = ensureOutputDirs;
