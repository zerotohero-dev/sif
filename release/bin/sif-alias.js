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

var _child_process = require('child_process');

var _fs = require('fs');

var _libTerminalOut = require('../lib/terminal/out');

var ALIASES_FILE = (0, _path.join)(__dirname, '../data/aliases.dat');
var ALIASES_TMP_FILE = (0, _path.join)(__dirname, '__tmp_aliases');
_commander2['default'].parse(process.argv);

var args = _commander2['default'].args;

if (args.length < 2) {
    (0, _libTerminalOut.printError)('alias', 'Invalid arguments. — Usage: "sif alias <shorthand> <query>".');
}

var shorthand = args[0];
var query = args[1];

var cat = (0, _child_process.spawn)('cat', [ALIASES_FILE]);

var lines = (0, _byline2['default'])(cat.stdout);

var processed = false;

var tempStream = (0, _fs.createWriteStream)(ALIASES_TMP_FILE, { encoding: 'utf8' });

lines.on('data', function (line) {
    var currentLine = line.toString();
    var parts = currentLine.split('=');

    if (!parts.length) {
        return;
    }

    // TODO: adding a line to a file based on a predicate is a common task; make it a module.
    var alias = parts[0];
    var command = parts[1];

    if (alias === shorthand.trim()) {
        tempStream.write(alias + '=' + query.trim() + '\n');
        processed = true;

        return;
    }

    tempStream.write(alias + '=' + command + '\n');
});

tempStream.on('finish', function () {
    var aliasWriteStream = (0, _fs.createWriteStream)(ALIASES_FILE, { encoding: 'utf8' });

    var cat = (0, _child_process.spawn)('cat', [ALIASES_TMP_FILE]);
    var sort = (0, _child_process.spawn)('sort', ['-u']);

    cat.stdout.on('data', function (line) {
        return sort.stdin.write(line);
    });
    cat.stdout.on('end', function () {
        return sort.stdin.end();
    });
    sort.stdout.on('end', function () {
        return aliasWriteStream.end();
    });

    sort.stdout.pipe(aliasWriteStream);
});

lines.on('end', function () {
    if (processed) {
        tempStream.end();
        return;
    }

    tempStream.write(shorthand + '=' + query + '\n');
    tempStream.end();
});

//# sourceMappingURL=sif-alias.js.map