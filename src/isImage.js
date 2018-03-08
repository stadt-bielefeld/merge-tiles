'use strict';

const worldFileExtensions = require(__dirname + '/worldFileExtensions.js');

/**
 * Checks, if the file is a supported image.
 * @param  {String}  file File name
 * @return {Boolean|String} false: File name is no image; string: File extension
 */
function isImage(file) {

  //Return value
  let ret = false;

  //Array of all supported image file extensions
  let fileExtensions = Object.keys(worldFileExtensions);

  //Iterate over all file extensions
  for (let i = 0; i < fileExtensions.length; i++) {
    if (file.endsWith('.' + fileExtensions[i])) {
      ret = fileExtensions[i];
      break;
    }
  }
  return ret;
}

module.exports = isImage;
