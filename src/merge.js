'use strict';

const fs = require('fs-extra');
const gm = require('gm');
const scanInputData = require(__dirname + '/scanInputData.js');
const checkSingleTile = require(__dirname + '/checkSingleTile.js');
const determineMergedTiles = require(__dirname + '/determineMergedTiles.js');
const mergeTiles = require(__dirname + '/mergeTiles.js');
const ensureOutputDirs = require(__dirname + '/ensureOutputDirs.js');
const convertImages = require(__dirname + '/convertImages.js');

function merge(options, callback) {
  let info = scanInputData(options);
  ensureOutputDirs(info);
  let check = checkSingleTile(info);
  let mergedTiles = determineMergedTiles(info, check);


  mergeTiles(info, mergedTiles, (err) => {
    if (err) {
      console.error(err);
    } else {
      convertImages(info, mergedTiles, (err) => {

        if (err) {
          console.error(err);
        } else {
          console.error('Merging complete!');
        }

      });
    }
  });
}

module.exports = merge;
