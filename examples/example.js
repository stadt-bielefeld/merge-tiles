'use strict';

//const merge = require('merge-tiles');
const merge = require(__dirname + '/../src/merge.js');


let options = {
  inputDir: __dirname + '/input',
  outputDir: __dirname + '/output',
  outputFormats: ['gif', 'jpg'],
  workers: 4
};
merge(options, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Merged!');
  }
});
