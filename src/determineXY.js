'use strict';

/**
 * Determines the x and y value as integer from filename.
 * @param  {string} file Filename of a wms-downloader tile.
 * @return {object}      Object with x and y values as integer like {file: "x0_y1.tif", x: 0, y: 1}.
 */
function determineXY(file) {
  let f1 = file.split('.');
  let f2 = f1[0].split('_');
  return {
    file: file,
    x: parseInt(f2[0].replace('x', '')),
    y: parseInt(f2[1].replace('y', ''))
  };
}

module.exports = determineXY;
