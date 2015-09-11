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

var _bluebird = require('bluebird');

var _fs = require('fs');

var _path = require('path');

var _child_process = require('child_process');

var _libTerminalOut = require('../lib/terminal/out');

var DATA_FILE = (0, _path.join)(__dirname, '../data/index.idx');
var ALIASES_FILE = (0, _path.join)(__dirname, '../data/aliases.dat');
var COMMAND = 'find';

_commander2['default'].parse(process.argv);

var query = _commander2['default'].args.length ? _commander2['default'].args[0] : '*';

var resolveAliasedQuery = function resolveAliasedQuery(aliased) {
    return new _bluebird.Promise(function (resolve, reject) {
        void reject;

        var search = aliased.substring(1);
        var lines = (0, _byline2['default'])((0, _fs.createReadStream)(ALIASES_FILE, { encoding: 'utf8' }));

        lines.on('data', function (line) {
            console.log(line);

            var tokens = line.split('=');
            var alias = tokens[0];
            var query = tokens[1];

            console.log(search);
            console.log(alias);

            if (search === alias) {
                resolve(query);
            }
        });

        lines.on('end', function () {
            return resolve(aliased);
        });
    });
};

var find = function find(query) {
    var child = (0, _child_process.spawn)('cat', [DATA_FILE]);
    var filter = (0, _child_process.spawn)('egrep', ['-i', query]);

    var lines = _byline2['default'].createStream();

    child.stdout.on('data', function (line) {
        return filter.stdin.write(line);
    });

    filter.stdin.on('finish', function () {});
    filter.stdin.on('error', function () {});
    filter.stdin.on('close', function () {});

    filter.stdout.pipe(lines);

    lines.on('data', function (line) {
        (0, _libTerminalOut.print)(COMMAND, line.toString());
    });

    lines.on('end', function () {
        (0, _libTerminalOut.print)(COMMAND, 'Done.');
    });

    child.stdout.on('end', function () {

        // Waits for buffer to flush before destroying the stream:
        filter.stdin.end();
    });
};

var isAliased = function isAliased(query) {
    return query[0] === '@';
};

// isAlias
if (isAliased(query)) {
    resolveAliasedQuery(query).then(find);
} else {
    find(query);
}

//# sourceMappingURL=sif-find.js.map