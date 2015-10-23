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

var _libQuery = require('../lib/query');

var COMMAND = 'find';

_commander2['default'].usage('<what> [options]').option('-i, --invert', 'Inverts the selection so that anything that does NOT match the search criteria will be listed.').parse(process.argv);

(0, _libQuery.find)(_commander2['default'].args.length ? _commander2['default'].args[0] : '*', _commander2['default'].invert, function (found) {
    return (0, _libTerminalOut.print)(COMMAND, found);
}, function () {
    return (0, _libTerminalOut.print)(COMMAND, 'Done.');
});

//# sourceMappingURL=sif-find.js.map