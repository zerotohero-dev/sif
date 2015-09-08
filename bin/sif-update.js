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

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _path = require('path');

var _child_process = require('child_process');

var _fs = require('fs');

var _libTerminalOut = require('../lib/terminal/out');

var COMMAND = 'update';
var SUCCESS = 200;
var INDEX_FILE = (0, _path.join)(__dirname, '../data/index.idx');
var TMP_EXISTING_FILE = (0, _path.join)(__dirname, '__tmp_processed');
var TMP_PROCESSED_FILE = (0, _path.join)(__dirname, '__tmp_existing');

_commander2['default'].parse(process.argv);

// TODO: this file needs some cleanup.

// TODO: it is possible that writeStream.write may return `false`; in that case we should wait for the flush event.

// TODO: jshint -- does it matter anymore in es6?! -- maybe a blog post topic.
// @see http://eslint.org/docs/user-guide/command-line-interface

// TODO: integrate complexity analysis too.

// TODO: add a progressbar.
(0, _libTerminalOut.print)(COMMAND, 'Started updating the index… This may take a while. Please be patient…');

var backup = (0, _child_process.spawn)('cp', [INDEX_FILE, INDEX_FILE + '.backup']);

backup.stdout.on('end', function () {
    console.log('geronimo!');

    var inStream = (0, _byline2['default'])((0, _fs.createReadStream)(INDEX_FILE, { encoding: 'utf8' }));

    var tmpExistingFileWriteStream = (0, _fs.createWriteStream)(TMP_EXISTING_FILE, { encoding: 'utf8' });
    var tmpProcessedFileWriteStream = (0, _fs.createWriteStream)(TMP_PROCESSED_FILE, { encoding: 'utf8' });

    // can be done with promises too.
    var remainingMetaDataRequests = 0;
    var inStreamEnded = false;

    var maybeEndProcessedFileWriteStream = null;

    maybeEndProcessedFileWriteStream = function () {
        if (inStreamEnded && remainingMetaDataRequests === 0) {
            (function () {
                var counter = 2;

                var copyAssets = function copyAssets() {
                    var cat = (0, _child_process.spawn)('cat', [TMP_EXISTING_FILE, TMP_PROCESSED_FILE]);
                    var sort = (0, _child_process.spawn)('sort', ['-u']);

                    var indexWriteStream = (0, _fs.createWriteStream)(INDEX_FILE, { encoding: 'utf8' });

                    cat.stdout.on('data', function (line) {
                        sort.stdin.write(line);
                    });

                    // rs | ws
                    sort.stdout.pipe(indexWriteStream);

                    sort.stdout.on('end', function () {
                        (0, _libTerminalOut.print)(COMMAND, 'Done!');

                        indexWriteStream.end();
                    });

                    cat.stdout.on('end', function () {
                        sort.stdin.end();
                    });
                };

                var maybeCopyAssets = null;

                maybeCopyAssets = function () {
                    counter--;

                    if (counter === 0) {
                        copyAssets();
                    }

                    maybeCopyAssets = function () {};
                };

                tmpProcessedFileWriteStream.on('finish', maybeCopyAssets);
                tmpExistingFileWriteStream.on('finish', maybeCopyAssets);

                tmpProcessedFileWriteStream.end();
                tmpExistingFileWriteStream.end();

                maybeEndProcessedFileWriteStream = function () {};
            })();
        }
    };

    inStream.on('data', function (line) {

        // TODO: to a util library function.
        var occurrences = line.split('<::sif::>').length - 1;
        var needsProcessing = occurrences === 0;
        var alreadyProcessed = occurrences === 1;
        var malformed = !needsProcessing && !alreadyProcessed;

        if (malformed) {
            (0, _libTerminalOut.printError)(COMMAND, 'badly-formatted line: "' + line.replace(/sif/g, '__sif__') + '"');

            return;
        }

        if (needsProcessing) {
            var _ret2 = (function () {
                remainingMetaDataRequests++;

                var url = line.trim();

                (0, _request2['default'])(url, function (error, response, body) {
                    remainingMetaDataRequests--;

                    if (error || response.statusCode !== SUCCESS) {
                        maybeEndProcessedFileWriteStream();

                        return;
                    }

                    var replaced = body.replace(/\s+/g, ' ');
                    var result = /<title>(.*?)<\/title>/i.exec(replaced);
                    var title = result[1];

                    if (title) {
                        tmpProcessedFileWriteStream.write(url + ' <::sif::> ' + title + '\n');
                    } else {
                        error(COMMAND, 'no title found for: "' + url + '"; I\'ll leave it untouched. — Please file a bug at xxx to get it fixed.');

                        tmpExistingFileWriteStream.write(url + '\n');
                    }

                    maybeEndProcessedFileWriteStream();
                });

                return {
                    v: undefined
                };
            })();

            if (typeof _ret2 === 'object') return _ret2.v;
        }

        tmpExistingFileWriteStream.write(line.trim() + '\n');
    });

    inStream.on('end', function () {
        inStreamEnded = true;

        // on `end`, all the data is consumed.
        maybeEndProcessedFileWriteStream();
    });
});

//# sourceMappingURL=sif-update.js.map