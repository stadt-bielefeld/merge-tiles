'use strict';

const mergeTile = require(__dirname + '/mergeTile.js');
const log = require(__dirname + '/logger.js');

function mergeTiles(info, tiles, callback, index) {
  if (!index) {
    index = 0;
  }
  let tile = tiles[index];
  if (tile) {
    log('Merging ' + tile.name + '.' + info.tiles.fileExt + ' ...', 'INFO');
    mergeTile(info, tile, (err) => {
      if (err) {
        callback(err);
      } else {
        log(tile.name + '.' + info.tiles.fileExt + ' ready!', 'INFO');
        mergeTiles(info, tiles, callback, index + 1);
      }
    });
  } else {
    callback();
  }
}

module.exports = mergeTiles;
