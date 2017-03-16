'use strict';

//-- Modules -------------------------------------------------------------------
let path = require('path');
let fs = require('fs.extra');
let gm = require('gm');
let isImage = require(__dirname + '/isImage.js');
//-- Modules -------------------------------------------------------------------

/**
 * Converts an image in a list other formats.
 * @param  {string}   file     Path of the input file
 * @param  {array}   formats   Array of output formats like ['gif','tif','jpg','png']
 * @param  {Function} callback Callback like (err) => {}
 * @example
 * let convertImage = require('merge-tiles').convertImage;
 *
 * convertImage(__dirname + '/output/all.png', ['tif', 'gif', 'jpg'], (err) => {
 *   if (err) {
 *     console.log(err);
 *   }
 * });
 */
function convertImage(file, formats, callback) {

  let fileInfo = path.parse(file);


  let imageInfo = isImage(file);
  let img = gm(file);

  if (imageInfo) {

    let currentFormat = 0;
    let convertNext = true;
    let formatsInterval = setInterval(() => {
      if (convertNext) {
        convertNext = false;

        if (currentFormat < formats.length) {

          console.log('Creating ' + fileInfo.name + '.' + formats[currentFormat] + ' ...');

          img.flatten().background('white').write(fileInfo.dir + '/' + fileInfo.name + '.' + formats[currentFormat], (err) => {
            if (err) {
              clearInterval(formatsInterval);
              callback(err);
            } else {
              let outputFileInfo = isImage('dummy.' + formats[currentFormat]);
              if (outputFileInfo) {
                fs.copy(fileInfo.dir + '/' + fileInfo.name + '.' + imageInfo.wfExt, fileInfo.dir + '/' + fileInfo.name + '.' + outputFileInfo.wfExt, {
                  replace: true
                }, (err) => {
                  if (err) {
                    clearInterval(formatsInterval);
                    callback(err);
                  } else {
                    convertNext = true;
                    currentFormat++;
                  }
                });
              } else {
                callback(new Error('The image format ' + formats[currentFormat] + ' is not supported!'));
              }

            }
          });
        } else {
          clearInterval(formatsInterval);
        }

      }
    }, 250);

  } else {
    callback(new Error('Image format is not supported!'));
  }

}

module.exports = convertImage;
