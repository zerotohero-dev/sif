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

var _child_process = require('child_process');

var _fs = require('fs');

var _libTerminalOut = require('../lib/terminal/out');

var _libConfigFiles = require('../lib/config/files');

var _libConfigConstants = require('../lib/config/constants');

_commander2['default'].parse(process.argv);

var args = _commander2['default'].args;

var fsOptions = { encoding: 'utf8' };

if (args.length < 1) {
    error('alias', 'Invalid arguments. — Usage: "sif rmalias <alias>".');

    process.exit(1);
}

var alias = _commander2['default'].args[0];

var cat = (0, _child_process.spawn)('cat', [_libConfigFiles.ALIASES_FILE]);
var lines = (0, _byline2['default'])(cat.stdout);

var tempStream = (0, _fs.createWriteStream)(_libConfigFiles.ALIASES_TMP_FILE, fsOptions);

lines.on('data', function (line) {
    var text = line.toString();
    var parts = text.split(_libConfigConstants.ALIAS_DELIMITER);

    if (parts.length === 1) {
        return;
    }

    var currentAlias = parts[0];

    if (currentAlias === alias.trim()) {
        return;
    }

    tempStream.write(text + '\n');
});

tempStream.on('finish', function () {
    (0, _fs.createReadStream)(_libConfigFiles.ALIASES_TMP_FILE, fsOptions).pipe((0, _fs.createWriteStream)(_libConfigFiles.ALIASES_FILE, fsOptions)).on('finish', function () {
        (0, _libTerminalOut.print)('rmalias', 'Done!');
    });
});

lines.on('end', function () {
    return tempStream.end();
});

//# sourceMappingURL=sif-rmalias.js.map