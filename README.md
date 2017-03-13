# merge-tiles
It allows you to merge a directory of wms-downloader tiles to a single tile.


## Installation

### 01 NodeJS and NPM

Windows:
Use the installer from <https://nodejs.org/>

Ubuntu / Debian:
```sh
sudo apt-get install nodejs npm
```

### 02 GraphicsMagick

Windows:
Use the installer from <http://www.graphicsmagick.org/>

Ubuntu / Debian:
```sh
sudo apt-get install graphicsmagick
```

### 03 merge-tiles
Use terminal:
```sh
npm install merge-tiles
```

## Get started

```js
let mergeTiles = require('merge-tiles').mergeTiles;

mergeTiles('./input', './output', 1, (err)=>{
  if(err){
    console.log(err);
  }
});
```

## License
MIT
