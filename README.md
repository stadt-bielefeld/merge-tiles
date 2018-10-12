# merge-tiles
It allows you to merge a directory of [wms-downloader](https://github.com/stadt-bielefeld/wms-downloader) tiles to a single tile or more tiles.

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
   -f, --formats [ext]     List of formats (gif_tif_png_jpg). Convert the single tile in the listed formats.
```

With default options:
```sh
cd dirOfTiles
merge
```

With custom options:
```sh
merge -i ./input -o ./output -w 2 -f tif_gif_jpg
```

### Node.js:
```js
const merge = require('merge-tiles');

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
```


## License
MIT
