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

var _libConfigFiles = require('../lib/config/files');

var _libConfigConstants = require('../lib/config/constants');

_commander2['default'].usage('<shorthand> <query>').parse(process.argv);

var COMMAND = 'alias';

var args = _commander2['default'].args;

var fsOptions = { encoding: 'utf8' };

if (args.length < 2) {
    (0, _libTerminalOut.printError)(COMMAND, 'Invalid arguments. — Usage: "sif alias <shorthand> <query>".');

    process.exit(1);
}

var shorthand = args[0];
var query = args[1];

var tempStream = (0, _fs.createWriteStream)(_libConfigFiles.ALIASES_TMP_FILE, fsOptions);

{
    tempStream.on('finish', function () {
        var sort = (0, _child_process.spawn)('sort', ['-u', _libConfigFiles.ALIASES_TMP_FILE]);
        var sortedLines = (0, _byline2['default'])(sort.stdout);
        var aliasWriteStream = (0, _fs.createWriteStream)(_libConfigFiles.ALIASES_FILE, fsOptions);

        sortedLines.on('data', function (line) {
            return aliasWriteStream.write(line + '\n');
        });

        aliasWriteStream.on('finish', function () {
            return (0, _libTerminalOut.print)(COMMAND, 'Done!');
        });

        sortedLines.on('end', function () {
            aliasWriteStream.end();
        });
    });
}

{
    (function () {
        var cat = (0, _child_process.spawn)('cat', [_libConfigFiles.ALIASES_FILE]);
        var lines = (0, _byline2['default'])(cat.stdout);

        var processed = false;

        lines.on('data', function (line) {
            var currentLine = line.toString();
            var parts = currentLine.split(_libConfigConstants.ALIAS_DELIMITER);

            if (!parts.length) {
                return;
            }

            // TODO: adding a line to a file based on a predicate is a common task; make it a module.
            var alias = parts[0];
            var command = parts[1];

            if (alias === shorthand.trim()) {
                tempStream.write('' + alias + _libConfigConstants.ALIAS_DELIMITER + query.trim() + '\n');
                processed = true;

                return;
            }

            tempStream.write(alias + '=' + command + '\n');
        });

        lines.on('end', function () {
            if (processed) {
                tempStream.end();

                return;
            }

            tempStream.end('' + shorthand + _libConfigConstants.ALIAS_DELIMITER + query + '\n');
        });
    })();
}

//# sourceMappingURL=sif-alias.js.map