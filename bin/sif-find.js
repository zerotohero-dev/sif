#!/usr/bin/env node


'use strict';

/*    _,                           ,--.   ,---.
 *   /(_                    ,---.  `--'  /  .-'
 *  |   '-._       . ' .   (  .-'  ,--.  |  `-,
 *  \    ,-.)     -= * =- .-'  `)  |  |  |  .-'
 *   \((` .(       '/. '  `----'   `--'  `--'
 *    )\  _/       /         just like magic
 * .-'   '--.     /
 *',         \   /|
 * ';,_) _)'\ \,//    This program is distributed
 *  `\   (   '._/   under the terms of the MIT license.
 *   |  . '.
 *   |      \   Please see the `LICENSE.md` file for details.
 *   |  \|   |
 *    \  |  /    Send your comments and suggestions to…
 *     '.| /      <https://github.com/v0lkan/sif/issues>.
 */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _byline = require('byline');

var _byline2 = _interopRequireDefault(_byline);

var _fs = require('fs');

var _path = require('path');

var _child_process = require('child_process');

var _libTerminalOut = require('../lib/terminal/out');

var DATA_FILE = (0, _path.join)(__dirname, '../data/index.idx');
var COMMAND = 'find';

_commander2['default'].parse(process.argv);

var query = _commander2['default'].args.length ? _commander2['default'].args[0] : '*';

var child = (0, _child_process.spawn)('cat', [DATA_FILE]);
var filter = (0, _child_process.spawn)('egrep', ['-i', query]);

var lines = _byline2['default'].createStream();

child.stdout.on('data', function (line) {
    filter.stdin.write(line);
});

filter.stdin.on('finish', function () {});
filter.stdin.on('error', function () {});
filter.stdin.on('close', function () {});

filter.stdout.pipe(lines);

lines.on('data', function (line) {
    (0, _libTerminalOut.print)(COMAND, line.toString());
});

lines.on('end', function () {
    (0, _libTerminalOut.print)(COMMAND, 'Done.');
});

child.stdout.on('end', function () {

    // Waits for buffer to flush before destroying the stream:
    filter.stdin.end();

    // `destroy()` will forcefully kill the stream w/o leaving time to flush
    // the buffer:
    // filter.stdin.destroy();
    //              ^ Avoid it; it's not documented.
});

//# sourceMappingURL=sif-find.js.map