'use strict';

/**
 * Checks if you have enough memory for single tile
 * @param  {object} info Return object from scanInputData
 * @return {object}      Object like { singleTile: false, x: 8, y: 11 }
 */
function checkSingleTile(info) {

  let singleTilePx = (info.tiles.numOfX * info.tiles.width) * (info.tiles.numOfY * info.tiles.height);
  let singleTileBytes = singleTilePx * info.tiles.bytesPerPixel;

  if (info.freeMemory > (singleTileBytes)) {
    return {
      singleTile: true,
      x: info.tiles.numOfX,
      y: info.tiles.numOfY
    };
  } else {
    return _checkSubTile(info.tiles.numOfX, info.tiles.numOfY, info);
  }
}

/**
 * Determines the maximum size of a merged tile
 * @param       {number} x             [description]
 * @param       {number} y             [description]
 * @param       {object} info          Return object from scanInputData
 * @return      {object}               Object like { singleTile: false, x: 8, y: 11 }
 */
function _checkSubTile(x, y, info) {
  let newX = Math.ceil(x / 2.0);
  let newY = Math.ceil(y / 2.0);

  let tilePx = (newX * info.tiles.width) * (newY * info.tiles.height);
  let tileBytes = tilePx * info.tiles.bytesPerPixel;

  if (info.freeMemory > (tileBytes)) {
    return {
      singleTile: false,
      x: newX,
      y: newY
    };
  } else {
    return _checkSubTile(newX, newY, info);
  }
}


module.exports = checkSingleTile;
