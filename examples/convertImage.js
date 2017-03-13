let convertImage = require(__dirname + '/../index.js').convertImage;

convertImage(__dirname + '/output/all.png', ['tif', 'gif', 'jpg'], (err) => {
  if (err) {
    console.log(err);
  }
});
