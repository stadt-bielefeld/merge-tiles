'use strict';

let mergeTiles = require(__dirname + '/../index.js').mergeTiles;

mergeTiles(__dirname + '/input', __dirname + '/output', 1, (err)=>{
  if(err){
    console.log(err);
  }
});
