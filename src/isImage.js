/**
 * Checks, if the file is a supported image.
 * @param  {string}  file Filename of a wms-downloader tile.
 * @return {ImageInfo|Boolean}      Unsupported image: false, supported image: Object like { ext: 'png', wfExt: 'pgw' }
 * @example
 * isImage('x1y2.png'); // => { ext: 'png', wfExt: 'pgw' }
 * isImage('x1y2.svg'); // => false
 */
function isImage(file) {

  let ret = {};

  if (file.endsWith('.png')) {
    ret.ext = 'png';
    ret.wfExt = 'pgw';
  } else {
    if (file.endsWith('.tif')) {
      ret.ext = 'tif';
      ret.wfExt = 'tfw';
    } else {
      if (file.endsWith('.gif')) {
        ret.ext = 'gif';
        ret.wfExt = 'gfw';
      } else {
        if (file.endsWith('.jpg')) {
          ret.ext = 'jpg';
          ret.wfExt = 'jgw';
        } else {
          if (file.endsWith('.jpeg')) {
            ret.ext = 'jpeg';
            ret.wfExt = 'jgw';
          } else {
            //Unsupportet images
            ret = false;
          }
        }
      }
    }
  }

  return ret;
}

module.exports = isImage;
