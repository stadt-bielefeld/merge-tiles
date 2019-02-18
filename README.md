# merge-tiles

It allows you to reduce tiles of a directory of [wms-downloader](https://github.com/stadt-bielefeld/wms-downloader) tiles.

## Installation

### 01 NodeJS and NPM

Windows:
Use the installer from <https://nodejs.org/>

Ubuntu / Debian:

```bash
sudo apt install nodejs npm
```

### 02 GraphicsMagick

Windows:
Use the installer from <http://www.graphicsmagick.org/>

Ubuntu / Debian:

```bash
sudo apt install graphicsmagick
```

### 03 merge-tiles

Use terminal:

```bash
npm i -g merge-tiles
```

## Get started

### Command line:

```plain
Options:
   -h, --help              Output usage information
   -V, --version           Output the version number
   -i, --input [path]      Input directory of wms-downloader tiles. Default is the current directory.
   -o, --output [path]     Output directory of single tile. Default is the current directory.
   -w, --workers [number]  Count of graphicsmagick workers. Default is 1.
   -f, --formats [ext]     List of formats (gif_tif_png_jpg). Convert the single tile in the listed formats.
```

With default options:

```bash
cd dirOfTiles
merge
```

With custom options:

```bash
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

## Documentation

* [API documentation](https://stadt-bielefeld.github.io/merge-tiles/docs/api/index.html)
* [Changelog](https://github.com/stadt-bielefeld/merge-tiles/blob/master/docs/changelog/index.md)

## Developer

Build api documentation:

```bash
npm run build-api-doc
```

## License

[MIT](LICENSE)
