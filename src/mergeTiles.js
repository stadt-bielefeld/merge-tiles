'use strict';

const mergeTile = require(__dirname + '/mergeTile.js');

function mergeTiles(info, tiles, callback, index) {
  if (!index) {
    index = 0;
  }
  let tile = tiles[index];
  if (tile) {
    console.log('Creating merged tile ' + tile.name);
    mergeTile(info, tile, (err) => {
      if (err) {
        callback(err);
      } else {
        mergeTiles(info, tiles, callback, index + 1);
      }
    });
  } else {
    callback();
  }
}

module.exports = mergeTiles;
