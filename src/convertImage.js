'use strict';

const gm = require('gm');
const log = require(__dirname + '/logger.js');

function convertImage(getNextTask, callback) {
  let task = getNextTask();
  if (task) {
    log('Converting to ' + task.name + '.' + task.outputFormat + ' ...', 'INFO');
    let img = gm(task.inputFile);

    if (task.outputFormat === 'tif' || task.outputFormat === 'jpg') {
      img.flatten().background('white');
    }

    img.write(task.outputFile, (err) => {
      if (err) {
        callback(err);
      } else {
        log(task.name + '.' + task.outputFormat + ' ready!', 'INFO');
        convertImage(getNextTask, callback);
      }
    });

  } else {
    callback();
  }
}

module.exports = convertImage;
