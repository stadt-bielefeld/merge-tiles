'use strict';

/**
 * TODO
 * [determineMergedTiles description]
 * @param  {[type]} info  [description]
 * @param  {[type]} check [description]
 * @return {object}       [description]
 *
 * @example
 * //Return object
 * [
 *   { name: 'x0_y0', x: { from: 0, to: 15 }, y: { from:  0, to: 21 } },
 *   { name: 'x0_y1', x: { from: 0, to: 15 }, y: { from: 22, to: 43 } }
 * ]
 */
function determineMergedTiles(info, check) {
  let ret = [];

  //Single tile
  if (check.singleTile) {
    let tile = {};
    tile.singleTile = true;
    tile.name = 'x0_y0';
    tile.x = {};
    tile.x.from = 0;
    tile.x.to = check.x;
    tile.y = {};
    tile.y.from = 0;
    tile.y.to = check.y;
    ret.push(tile);
  } else {
    //More tiles
    let xRanges = [];
    let yRanges = [];
    let xIndex = 0;
    let xFrom = 0;
    for (let x = 1; x <= info.tiles.numOfX; x++) {
      if (x % check.x == 0) {
        let tile = {};
        tile.x = {};
        tile.x.from = xFrom;
        tile.x.to = x - 1;
        tile.x.name = 'x' + xIndex + '_';
        xIndex++;
        xFrom = x;
        xRanges.push(tile);
      }
    }

    let tileX = {};
    tileX.x = {};
    tileX.x.from = xFrom;
    tileX.x.to = info.tiles.numOfX;
    tileX.x.name = 'x' + xIndex + '_';
    xRanges.push(tileX);

    let yIndex = 0;
    let yFrom = 0;
    for (let y = 1; y <= info.tiles.numOfY; y++) {
      if (y % check.y == 0) {
        let tile = {};
        tile.y = {};
        tile.y.from = yFrom;
        tile.y.to = y - 1;
        tile.y.name = 'y' + yIndex;
        yFrom = y;
        yIndex++;

        yRanges.push(tile);
      }
    }

    //Last
    let tileY = {};
    tileY.y = {};
    tileY.y.from = yFrom;
    tileY.y.to = info.tiles.numOfY;
    tileY.y.name = 'y' + yIndex;
    yRanges.push(tileY);

    for (let i = 0; i < yRanges.length; i++) {
      let yr = yRanges[i].y;
      for (let j = 0; j < xRanges.length; j++) {
        let xr = xRanges[j].x;
        let tile = {
          name: xr.name + yr.name,
          x: {
            from: xr.from,
            to: xr.to
          },
          y: {
            from: yr.from,
            to: yr.to
          }
        };
        ret.push(tile);
      }
    }
  }

  return ret;
}

module.exports = determineMergedTiles;
