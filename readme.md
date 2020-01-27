# EpKit
> An epub development toolkit. Suggestions welcome!

[![Version](https://img.shields.io/npm/v/epkit.svg)](https://npmjs.org/package/epkit)
[![Downloads/week](https://img.shields.io/npm/dw/epkit.svg)](https://npmjs.org/package/epkit)
[![License](https://img.shields.io/npm/l/epkit.svg)](https://github.com/b3u/epKit/blob/master/LICENSE.md)

Epkit is both a js library and a cli tool.
- [Install](#install)
- [Usage](#usage)
  - [serve](#serve)
  - [zip](#zip)
  - [check](#check)
- [Example](#example)

## Install
However you plan to use epkit, you should first install it using yarn or npm.

```sh
$ npm install (-g) epkit
```

## Example
Here's an example using the library.
```js
const epkit = require('epkit');

// Serve the folder (with live reload capabilities)
epkit.serve('./ebook');

// Optionally, add a port number
epKit.serve('./ebook', {port: 8080});
```

The command-line syntax is similar.
```sh
$ epkit serve ./ebook --port=8080
```

## Usage
### Serve
Serve an unzipped epub with live reloading

([Source Code](https://github.com/b3u/epkit/blob/master/lib/serve.js))

**Parameters**
  - `dir` - relative path to folder
  - `options` - Optional
    - `port` - Eg. 5500, 4000, etc. (default: 8080)
    - ~~`reload` - Enable live reloading? (default: true)~~ (coming soon!)

### Zip
Convert a folder to epub format

([Source Code](https://github.com/b3u/epkit/blob/master/lib/zip.js))

**Parameters**
  - `dir` - relative path to folder

### Check
Validate an epub file according to [the w3 epub specs](https://www.w3.org/publishing/epub32/epub-spec.html). Note that this method requires Java (1.6+) installed.

([Source Code](https://github.com/b3u/epkit/blob/master/lib/check.js))

**Parameters**
  - `file` - relative path to file