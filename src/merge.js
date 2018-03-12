'use strict';

const fs = require('fs-extra');
const gm = require('gm');
const scanInputData = require(__dirname + '/scanInputData.js');
const checkSingleTile = require(__dirname + '/checkSingleTile.js');
const determineMergedTiles = require(__dirname + '/determineMergedTiles.js');
const mergeTiles = require(__dirname + '/mergeTiles.js');
const ensureOutputDirs = require(__dirname + '/ensureOutputDirs.js');
const convertImages = require(__dirname + '/convertImages.js');
const log = require(__dirname + '/logger.js');

function merge(options, callback) {
  let info = scanInputData(options);
  ensureOutputDirs(info);
  let check = checkSingleTile(info);

  let mergedTiles = determineMergedTiles(info, check);

  if (mergedTiles.length > 1) {
    log('New tiles: ' + mergedTiles.length + ' (You don\'t have enough memory for a single tile!)', 'INFO');
  } else {
    log('New tiles: 1', 'INFO');
  }

  mergeTiles(info, mergedTiles, (err) => {
    if (err) {
      callback(err);
    } else {
      convertImages(info, mergedTiles, callback);
    }
  });
}

module.exports = merge;
