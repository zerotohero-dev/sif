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

var _fs = require('fs');

var _child_process = require('child_process');

var _libTerminalOut = require('../lib/terminal/out');

var _libQuery = require('../lib/query');

var _libConfigFiles = require('../lib/config/files');

var _libConfigRegexp = require('../lib/config/regexp');

var _libConfigConsants = require('../lib/config/consants');

_commander2['default'].parse(process.argv);

var COMMAND = 'tag';

var fsOptions = { encoding: 'utf8' };
var fsAppendOptions = { encoding: 'utf8', flags: 'a' };

if (_commander2['default'].args.length === 0) {
    (0, _libTerminalOut.error)(COMMAND, 'Usage: sif tag [searchExpression] [tagName]');
    exit(1);
}

var query = _commander2['default'].args[0];
var tags = _commander2['default'].args.splice(1);

// Perform an inverted search with query, save it to a temp file.
var tempStream = (0, _fs.createWriteStream)(_libConfigFiles.PROCESS_TMP_EXISTING_FILE, fsOptions);

tempStream.on('finish', function () {
    var tempStream = (0, _fs.createWriteStream)(_libConfigFiles.PROCESS_TMP_EXISTING_FILE, fsAppendOptions);

    tempStream.on('finish', function () {
        (0, _child_process.spawn)('cp', [_libConfigFiles.INDEX_FILE, _libConfigFiles.INDEX_FILE + '.backup']).stdout.on('end', function () {
            (0, _child_process.spawn)('sort', ['-u', _libConfigFiles.PROCESS_TMP_EXISTING_FILE]).stdout.pipe((0, _fs.createWriteStream)(_libConfigFiles.INDEX_FILE, fsOptions));
        });
    });

    (0, _libQuery.find)(query, false, function (line) {
        var parts = line.split(_libConfigRegexp.MATCH_DELIMITER);
        var url = parts[0];
        var meta = parts[1];

        if (meta) {
            var metaParts = meta.split(_libConfigRegexp.MATCH_TAGS_DELIMITER);
            var description = metaParts[0];
            var metaTags = metaParts[1];

            var mergedTags = [];

            // TODO: to some util module.
            var uniq = function uniq(el, i, ar) {
                return ar.indexOf(el) === i;
            };
            var notEmpty = function notEmpty(what) {
                return '' + what !== '';
            };
            var trim = function trim(tag) {
                return tag.trim();
            };

            var tagLiteral = (metaTags || '').split(_libConfigRegexp.MATCH_TAG_DELIMITER)
            // TODO: for remove case "exclude" instead of "concat".
            .concat(tags).filter(notEmpty).map(trim).filter(uniq).sort().join(_libConfigConsants.TAG_DELIMITER);

            tempStream.write(url + ' ' + _libConfigConsants.DELIMITER + ' ' + description + ' ' + _libConfigConsants.TAGS_DELIMITER + ' ' + tagLiteral + '\n');
        } else {
            _libConfigRegexp.MATCH_TAGS_DELIMITER.test(line) ? tempStream.write(line + '\n') : tempStream.write(line + ' ' + _libConfigConsants.TAGS_DELIMITER + '\n');
        }
    }, function () {
        tempStream.end();
    });
});

(0, _libQuery.find)(query, true, function (line) {
    tempStream.write(line + '\n');
}, function () {
    tempStream.end();
});

// rmtag will work similarly, and instead of adding into the array it will
// remove from the array.

//# sourceMappingURL=sif-tag.js.map