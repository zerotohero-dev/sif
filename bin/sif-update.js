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

var _libTerminalOut = require('../lib/terminal/out');

var COMMAND = 'update';

_commander2['default'].parse(process.argv);

(0, _libTerminalOut.print)(COMMAND, 'This may take a while. Please be patient…');

(0, _libTerminalOut.print)(COMMAND, 'Command not implemented yet!');

// For each line in index
// check if it is processed already
// if not process it and apend the result to a temp file.
// concat index and temp file, sort the result and write it back to index.

(0, _libTerminalOut.printBlank)();

//# sourceMappingURL=sif-update.js.map