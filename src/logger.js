'use strict';

/**
 * TODO
 * @param {*} msg 
 * @param {*} level 
 */
function log(msg, level) {
  if (!level) {
    level = 'DEBUG';
  }
  if (level === 'INFO') {
    console.log(msg);
  } else {
    console.log(level + ': ' + msg);
  }
}

module.exports = log;
