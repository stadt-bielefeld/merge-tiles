'use strict';


const convertImage = require(__dirname + '/convertImage.js');

/**
 * TODO
 * @param {*} info 
 * @param {*} tiles 
 * @param {*} callback 
 */
function convertImages(info, tiles, callback) {
  let tasks = [];

  tiles.forEach((t) => {
    let inputFile = info.outputDir + '/' + info.tiles.fileExt + '/' + t.name + '.' + info.tiles.fileExt;
    info.outputFormats.forEach((f) => {
      if (f.fileExt !== info.tiles.fileExt) {
        let task = {};
        task.name = t.name;
        task.inputFile = inputFile;
        task.inputFormat = info.tiles.fileExt;
        task.outputFile = info.outputDir + '/' + f.fileExt + '/' + t.name + '.' + f.fileExt;
        task.outputFormat = f.fileExt;
        tasks.push(task);
      }
    });
  });


  var taskIndex = -1;
  var getNextTask = () => {
    taskIndex++;
    return tasks[taskIndex];
  };

  convertImage(getNextTask, callback);

}


module.exports = convertImages;
