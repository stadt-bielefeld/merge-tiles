'use strict';

//-- Modules -------------------------------------------------------------------
let fs = require('fs.extra');
let gm = require('gm');
let isImage = require(__dirname + '/isImage.js');
//-- Modules -------------------------------------------------------------------

/**
 * Merges wms-downloader tiles to a single tile.
 * @param  {string} inputDir          Input directory of wms-downloader tiles.
 * @param  {string} outputDir         Output directory of single tile.
 * @param  {number} workers   Count of graphicsmagick workers.
 * @param  {function} callback Callbackfunktion like this: function(err){}
 * @example
 * let mergeTiles = require('merge-tiles').mergeTiles;
 *
 * mergeTiles(__dirname + '/input', __dirname + '/output', 1, (err) => {
 *   if(err){
 *     console.log(err);
 *   }
 * });
 */
function mergeTiles(inputDir, outputDir, workers, callback) {
  try {
    if(!workers){
        workers = 1;
    }

    //Read filenames
    let inputFiles = fs.readdirSync(inputDir);

    //Gobal variables in this function
    let inputFilesObjs = []; //All image filenames as object [{file: 'x0_y0.png', x: 0, y: 0}, ... ]
    let inputExt; //For example: png
    let inputWfExt; //For example: pgw

    //Iterate over all filenames and convert filenames in objects
    inputFiles.forEach((file) => {
      //The file is an image
      let imgInfo = isImage(file);
      if (imgInfo) {
        //Determine the integer of x and y
        let xy = determineXY(file);
        let fileObj = {
          file: file,
          x: xy.x,
          y: xy.y
        };

        //Notice the file extensions
        inputExt = imgInfo.ext;
        inputWfExt = imgInfo.wfExt;

        //Notice the file object
        inputFilesObjs.push(fileObj);
      }
    });

    //Sort filenames
    inputFilesObjs = inputFilesObjs.sort(compareFilesOnX);

    //Determines cols
    let cols = []; //Filnames in cols [[{file: 'x0_y0.png', x: 0, y: 0}, ... ],[{file: 'x1_y0.png', x: 1, y: 0}, ... ]]
    let colCounter = -1; //Counter of the current col

    //Iterate over all files and fill the cols array
    inputFilesObjs.forEach((fileObj) => {

      //Push file to that col
      if (fileObj.x === colCounter) {
        cols[colCounter].push(fileObj);
      } else {

        //Sort every completed col
        if (colCounter !== -1) {
          //Sort col
          cols[colCounter] = cols[colCounter].sort(compareFilesOnY);
        }

        //Create a new col
        colCounter++;
        cols[colCounter] = [];
        cols[colCounter].push(fileObj);
      }
    });


    let currentWorkers = 0; //Current gm workers for creation of cols
    let currentCol = 0; //Current col

    //Observer interval for the workes
    let createColsInterval = setInterval(() => {


      if (currentWorkers < workers) {
        currentWorkers++;

        //Create cols on hdd
        if (currentCol < cols.length) {

          //Notice this current col for this col process in a temporary variable
          let tempCurrentCol = currentCol;
          currentCol++;

          console.log('Creating column ' + tempCurrentCol + ' ...');

          let col = cols[tempCurrentCol];
          let colImg = gm(inputDir + '/' + col[0].file);
          for (var i = 1; i < col.length; i++) {
            colImg.append(inputDir + '/' + col[i].file, false);
          }
          colImg.write(outputDir + '/' + tempCurrentCol + '.' + inputExt, (err) => {
            currentWorkers--;

            if (err) {
              clearInterval(createColsInterval);
              callback(err);
            } else {
              console.log('... finished column ' + tempCurrentCol + '.');
            }

          });
        } else {

          //If all cols are written.
          if (currentCol === cols.length) {

            //Clear the interval
            clearInterval(createColsInterval);

            //Check, if input files available
            if (inputFilesObjs.length > 0) {
              console.log('Merging all columns to single tile ...');

              //Create single tile on hdd
              let colImg = gm(outputDir + '/' + 0 + '.' + inputExt);
              for (var j = 1; j < cols.length; j++) {
                colImg.append(outputDir + '/' + j + '.' + inputExt, true);
              }

              //Write single tile
              colImg.write(outputDir + '/all.' + inputExt, (err) => {
                if (err) {
                  callback(err);
                } else {
                  console.log('... finished merging.');

                  console.log('Creating world file ...');
                  //Create world file on hdd
                  fs.copy(inputDir + '/x0_y0.' + inputWfExt, outputDir + '/all.' + inputWfExt, {
                    replace: true
                  }, (err) => {
                    if (err) {
                      callback(err);
                    } else {
                      console.log('... finished creating of world file.');

                      console.log('Removing columns ...');
                      cols.forEach((obj, idx) => {
                        var file = outputDir + '/' + idx + '.' + inputExt;
                        fs.unlinkSync(file);
                      });
                      console.log('... finisched removing.');
                      callback(null);
                    }

                  });
                }

              });

            } else {
              callback(new Error('No tiles in input directory!'));
            }


          }

        }
      }
    }, 250);

  } catch (e) {
    callback(e);
  }
}



/**
 * That compareFunction can be used to sort objects of filenames in an array.
 * It compares filename objects on their x attribute.
 * @param  {object} a Filename object a
 * @param  {object} b Filename object b
 * @return {number}   0: equal, 1: a.x is bigger as b.x, -1: a.x is smaller as b.x
 */
function compareFilesOnX(a, b) {
  if (a.x > b.x) {
    return 1;
  } else {
    return -1;
  }
}

/**
 * That compareFunction can be used to sort objects of filenames in an array.
 * It compares filename objects on their y attribute.
 * @param  {object} a Filename object a
 * @param  {object} b Filename object b
 * @return {number}   0: equal, 1: a.y is bigger as b.y, -1: a.y is smaller as b.y
 */
function compareFilesOnY(a, b) {
  if (a.y > b.y) {
    return 1;
  } else {
    return -1;
  }
}

/**
 * A wms-downloader tile has a filename like this:
 * `x0y1.png`
 * This object contains the value after x and after y as integer value.
 * @typedef {Object} FileInfo
 * @property {string} x X value of wms-downloader tile.
 * @property {string} y y value of wms-downloader tile.
 * @example
 * //wms-downloader tile: x0y1.png
 * { x: 0, y: 1 }
 */

/**
 * Determines the x and y value as integer from filename.
 * @param  {string} file Filename of a wms-downloader tile.
 * @return {FileInfo}      Object with x and y values as integer like {x: 0, y: 1}.
 */
function determineXY(file) {
  let f1 = file.split('.');
  let f2 = f1[0].split('_');

  return {
    x: parseInt(f2[0].replace('x', '')),
    y: parseInt(f2[1].replace('y', ''))
  };
}

/**
 * Object with information about the image.
 * @typedef {Object} ImageInfo
 * @property {string} ext File extension of the image.
 * @property {string} wfExt World file extension of the image.
 * @example
 * { ext: 'png', wfExt: 'pgw' }
 */



module.exports = mergeTiles;
