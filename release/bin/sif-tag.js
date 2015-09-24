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
        console.log('tempstream finished');

        var backup = (0, _child_process.spawn)('cp', [_libConfigFiles.INDEX_FILE, _libConfigFiles.INDEX_FILE + '.backup']);

        backup.stdout.on('end', function () {
            (0, _child_process.spawn)('sort', ['-u', _libConfigFiles.PROCESS_TMP_EXISTING_FILE]).stdout.pipe((0, _fs.createWriteStream)(_libConfigFiles.INDEX_FILE, fsOptions));
        });
    });

    (0, _libQuery.find)(query, false, function (line) {
        var parts = line.split(_libConfigRegexp.MATCH_DELIMITER);
        var url = parts[0];
        var meta = parts[1];

        console.log(parts);

        if (meta) {
            var metaParts = meta.split(_libConfigRegexp.MATCH_TAGS_DELIMITER);
            var description = metaParts[0];
            var metaTags = metaParts[1];

            console.log('descriptions', metaParts[0]);

            var mergedTags = [];

            var _MATCH_DELIMITER = /,/;
            var DELIMITER = ',';

            var uniq = function uniq(el, i, ar) {
                return ar.indexOf(el) === i;
            };

            var tagLiteral = (metaTags || '').split(_MATCH_DELIMITER).filter(function (tag) {
                return '' + tag;
            }).concat(tags.filter(function (tag) {
                return '' + tag;
            })).map(function (tag) {
                return tag.trim();
            }).filter(uniq).sort().join(DELIMITER);

            console.log(metaTags);
            console.log(tags);
            console.log('tagLiteral "' + tagLiteral + '"');

            tempStream.write(url + ' <::sif::> ' + description + ' <::tags::> ' + tagLiteral + '\n');
        } else {
            tempStream.write(line + '\n');
        }
    }, function () {
        console.log('Ending tempstream');
        tempStream.end();
        console.log('Ended tempstream ');
    });
});

(0, _libQuery.find)(query, true, function (line) {
    tempStream.write(line + '\n');
}, function () {
    tempStream.end();
});

// When file is closed, perform a search with query
//    for each line split the line into non-tag, and tag portions
//    for the tag portion compile a tags array.
//    for every tag that is not contained in the tags array
//    add that tag to the search array.
//    sort the array.
//    concat the nontag part with the sorted and parsed tags.
//    append the result to the temp file.
// when temp file is closed, backup index.idx and
//  save the sorted temp file onto index.idx
// console.log( program.args );

// rmtag will work similarly, and instead of adding into the array it will
// remove from the array.

//# sourceMappingURL=sif-tag.js.map