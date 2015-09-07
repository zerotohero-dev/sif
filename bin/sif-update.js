#!/usr/bin/env node


'use strict';

/*    _,                            ,--.   ,---.
 *   /(_                     ,---.  `--'  /  .-'
 *  |   '-._        . ' .   (  .-'  ,--.  |  `-,
 *  \    ,-.)      -= * =- .-'  `)  |  |  |  .-'
 *   \((` .(        '/. '  `----'   `--'  `--'
 *    )\  _/        /         just like magic
 * .-'   '--.      /
 * \,         \   /|
 *  ';,_) _)'\ \,//    This program is distributed
 *   `\   (   '._/   under the terms of the MIT license.
 *    |  . '.
 *    |      \   Please see the `LICENSE.md` file for details.
 *    |  \|   |
 *     \  |  /    Send your comments and suggestions to…
 *      '.| /      <https://github.com/v0lkan/sif/issues>.
 */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _byline = require('byline');

var _byline2 = _interopRequireDefault(_byline);

var _path = require('path');

var _fs = require('fs');

var _libTerminalOut = require('../lib/terminal/out');

var COMMAND = 'update';
var INDEX_FILE = (0, _path.join)(__dirname, '../data/index.idx');

_commander2['default'].parse(process.argv);

var inStream = (0, _byline2['default'])((0, _fs.createReadStream)(INDEX_FILE, { encoding: 'utf8' }));

(0, _libTerminalOut.print)(COMMAND, 'This may take a while. Please be patient…');

inStream.on('data', function (line) {
  if (line.split('<::sif::>').length > 2) {
    (0, _libTerminalOut.printError)(COMMAND, 'badly-formatted line: "' + line.replace(/sif/g, '__sif__') + '"');

    return;
  }

  //console.log( line.indexOf('<::sif::>') );

  // print(COMMAND, 'bazinga');
});

// For each line in index
// check if it is processed already
// if not process it and apend the result to a temp file.
// concat index and temp file, sort the result and write it back to index.

(0, _libTerminalOut.printBlank)();

//# sourceMappingURL=sif-update.js.map