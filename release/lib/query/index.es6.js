'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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

var _byline = require('byline');

var _byline2 = _interopRequireDefault(_byline);

var _fs = require('fs');

var _child_process = require('child_process');

var _bluebird = require('bluebird');

var _configFiles = require('../config/files');

var _configConstants = require('../config/constants');

var fsOptions = { encoding: 'utf8' };

var resolveAliasedQuery = function resolveAliasedQuery(aliased) {
    if (aliased[0] !== _configConstants.ALIAS_PREFIX) {
        return _bluebird.Promise.resolve(aliased);
    }

    return new _bluebird.Promise(function (resolve, reject) {
        void reject;

        var search = aliased.substring(1);
        var lines = (0, _byline2['default'])((0, _fs.createReadStream)(_configFiles.ALIASES_FILE, fsOptions));

        lines.on('data', function (line) {
            var tokens = line.split(_configConstants.ALIAS_DELIMITER);
            var alias = tokens[0];
            var query = tokens[1];

            if (search === alias) {
                resolve(query);
            }
        });

        lines.on('end', function () {
            return resolve(aliased);
        });
    });
};

var searchForQuery = function searchForQuery(query, notifyData, notifyEnd) {
    var child = (0, _child_process.spawn)('cat', [_configFiles.INDEX_FILE]);
    var filter = (0, _child_process.spawn)('egrep', ['-i', query]);

    var lines = (0, _byline.createStream)();

    child.stdout.pipe(filter.stdin);
    filter.stdout.pipe(lines);

    lines.on('data', function (line) {
        return notifyData(line.toString());
    });
    lines.on('end', function () {
        return notifyEnd();
    });

    child.stdout.on('end', function () {

        // Waits for buffer to flush before destroying the stream:
        filter.stdin.end();
    });
};

var find = function find(query, notifyData, notifyEnd) {
    resolveAliasedQuery(query).then(function (query) {
        return searchForQuery(query, notifyData, notifyEnd);
    });
};

exports.find = find;

//# sourceMappingURL=index.es6.js.map