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

var _entities = require('entities');

var _fs = require('fs');

var _libTerminalOut = require('../lib/terminal/out');

var _libConfigFiles = require('../lib/config/files');

var _libConfigMessage = require('../lib/config/message');

var _libConfigConstants = require('../lib/config/constants');

var _libConfigRegexp = require('../lib/config/regexp');

var COMMAND = 'update';
var SUCCESS = 200;

_commander2['default'].parse(process.argv);

// TODO: this file needs some cleanup.

(0, _libTerminalOut.print)(COMMAND, 'Started updating the index… This may take a while. Please be patient…');

var copyAssets = function copyAssets() {

    // TODO: this is repeated; move it to a module.
    // TODO: sort can do concatanetion, no need to pipe with cat.
    var cat = (0, _child_process.spawn)('cat', [_libConfigFiles.PROCESS_TMP_EXISTING_FILE, _libConfigFiles.PROCESS_TMP_PROCESSED_FILE]);
    var sort = (0, _child_process.spawn)('sort', ['-u']);

    var indexWriteStream = (0, _fs.createWriteStream)(_libConfigFiles.INDEX_FILE, { encoding: 'utf8' });

    sort.stdout.pipe(indexWriteStream);

    cat.stdout.on('data', function (line) {
        return sort.stdin.write(line);
    });
    cat.stdout.on('end', function () {
        return sort.stdin.end();
    });

    sort.stdout.on('end', function () {
        return indexWriteStream.end();
    });
    sort.stdout.on('end', function () {
        return (0, _libTerminalOut.print)(COMMAND, 'Index file has been successfully updated.');
    });
};

var backup = (0, _child_process.spawn)('cp', [_libConfigFiles.INDEX_FILE, _libConfigFiles.INDEX_FILE + '.backup']);

var fsOptions = { encoding: 'utf8' };

backup.stdout.on('end', function () {
    var inStream = (0, _byline2['default'])((0, _fs.createReadStream)(_libConfigFiles.INDEX_FILE, fsOptions));

    var tmpExistingFileWriteStream = (0, _fs.createWriteStream)(_libConfigFiles.PROCESS_TMP_EXISTING_FILE, fsOptions);
    var tmpProcessedFileWriteStream = (0, _fs.createWriteStream)(_libConfigFiles.PROCESS_TMP_PROCESSED_FILE, fsOptions);

    // can be done with promises too.
    var remainingMetaDataRequests = 0;
    var inStreamEnded = false;

    var tryPersistTemporaryData = null;

    tryPersistTemporaryData = function () {
        if (!inStreamEnded || remainingMetaDataRequests !== 0) {
            return;
        }

        var copyAssets = function copyAssets() {
            var cat = (0, _child_process.spawn)('cat', [_libConfigFiles.PROCESS_TMP_EXISTING_FILE, _libConfigFiles.PROCESS_TMP_PROCESSED_FILE]);
            var sort = (0, _child_process.spawn)('sort', ['-u']);

            var indexWriteStream = (0, _fs.createWriteStream)(_libConfigFiles.INDEX_FILE, fsOptions);

            cat.stdout.pipe(sort.stdin);
            sort.stdout.pipe(indexWriteStream);

            indexWriteStream.on('finish', function () {
                return (0, _libTerminalOut.print)(COMMAND, 'Done!');
            });
        };

        var maybeCopyAssets = null;
        var counter = 2;

        maybeCopyAssets = function () {
            counter--;

            if (counter === 0) {
                copyAssets();
            }

            maybeCopyAssets = function () {};
        };

        // TODO: this part "begs" for promises.
        tmpProcessedFileWriteStream.on('finish', maybeCopyAssets);
        tmpExistingFileWriteStream.on('finish', maybeCopyAssets);

        tmpProcessedFileWriteStream.end();
        tmpExistingFileWriteStream.end();

        tryPersistTemporaryData = function () {};
    };

    inStream.on('data', function (line) {

        // TODO: to a util library function.
        var occurrences = line.split(_libConfigConstants.DELIMITER).length - 1;
        var needsProcessing = occurrences === 0;
        var alreadyProcessed = occurrences === 1;
        var malformed = !needsProcessing && !alreadyProcessed;

        if (malformed) {
            (0, _libTerminalOut.printError)(COMMAND, 'badly-formatted line: "' + line.replace(_libConfigRegexp.MATCH_ALL_DELIMITERS, _libConfigConstants.DELIMITER_REPLACEMENT) + '"');

            return;
        }

        if (needsProcessing) {
            var _ret = (function () {
                remainingMetaDataRequests++;

                var url = line.replace(_libConfigConstants.TAGS_DELIMITER, '').trim();

                // {gzip: true} to add an `Accept-Encoding` header to the request.
                // Although `request` library does automatic gzip decoding, certain websites
                // get confused if the header is not present in the initial request.
                (0, _request2['default'])({ method: 'GET', 'uri': url, gzip: true }, function (err, response, body) {
                    remainingMetaDataRequests--;

                    if (err || response.statusCode !== SUCCESS) {
                        tryPersistTemporaryData();

                        return;
                    }

                    var replaced = body.replace(_libConfigRegexp.MATCH_ALL_WHITESPACES, ' ');
                    var result = _libConfigRegexp.MATCH_PAGE_TITLE.exec(replaced);

                    if (!result) {
                        (0, _libTerminalOut.printError)(COMMAND, 'Cannot find title in ' + url + '.');

                        tmpExistingFileWriteStream.write((0, _entities.decodeHTML)(url + ' ' + _libConfigConstants.TAGS_DELIMITER + '\n'));

                        tryPersistTemporaryData();

                        return;
                    }

                    var title = result[1];

                    if (title) {
                        tmpProcessedFileWriteStream.write((0, _entities.decodeHTML)(url + ' ' + _libConfigConstants.DELIMITER + ' ' + title.trim() + ' ' + _libConfigConstants.TAGS_DELIMITER + '\n'));
                    } else {
                        (0, _libTerminalOut.printError)(COMMAND, (0, _libConfigMessage.noTitleFoundForUrl)(url));

                        tmpExistingFileWriteStream.write((0, _entities.decodeHTML)(url + ' ' + _libConfigConstants.TAGS_DELIMITER + '\n'));
                    }

                    tryPersistTemporaryData();
                });

                return {
                    v: undefined
                };
            })();

            if (typeof _ret === 'object') return _ret.v;
        }

        tmpExistingFileWriteStream.write((0, _entities.decodeHTML)(line.trim() + '\n'));
    });

    inStream.on('end', function () {
        inStreamEnded = true;

        // on `end`, all the data is consumed.
        tryPersistTemporaryData();
    });
});

//# sourceMappingURL=sif-update.js.map