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
npm install -g merge-tiles
```

## Get started

### Command line:

```
Options:
   -h, --help              Output usage information
   -V, --version           Output the version number
   -i, --input [path]      Input directory of wms-downloader tiles. Default is the current directory.
   -o, --output [path]     Output directory of single tile. Default is the current directory.
   -w, --workers [number]  Count of graphicsmagick workers. Default is 1.
```

With default options:
```sh
cd dirOfTiles
merge
```

With custom options:
```sh
merge -i ./input -o ./output -w 2
```

### Node.js:
```js
let mergeTiles = require('merge-tiles').mergeTiles;

mergeTiles('./input', './output', 2, (err)=>{
  if(err){
    console.log(err);
  }
});
```

## License
MIT
