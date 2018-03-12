'use strict';

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
