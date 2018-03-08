'use strict';

const gm = require('gm');

function convertImage(getNextTask, callback) {
  let task = getNextTask();
  if (task) {

    let img = gm(task.inputFile);

    if (task.outputFormat === 'tif' || task.outputFormat === 'jpg') {
      img.flatten().background('white');
    }

    img.write(task.outputFile, (err) => {
      if (err) {
        callback(err);
      } else {
        convertImage(getNextTask, callback);
      }
    });

  } else {
    callback();
  }
}

module.exports = convertImage;
