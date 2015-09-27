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

var _prompt = require('prompt');

var _libTerminalOut = require('../lib/terminal/out');

var _libConfigFiles = require('../lib/config/files');

var COMMAND = 'purge';

_commander2['default'].parse(process.argv);

var schema = {
    properties: {
        answer: {
            description: 'This will IRREVERSIBLY delete everything. — Are you absolutely sure? [yes/no]',
            pattern: /^(yes|no)$/i,
            message: 'Please reply with "yes" or "no".',
            required: true
        }
    }
};

(0, _prompt.start)();

(0, _prompt.get)(schema, function (err, result) {
    var answer = result.answer;

    if (answer.toLowerCase() === 'yes') {
        (0, _fs.createWriteStream)(_libConfigFiles.ALIASES_FILE).write('');
        (0, _fs.createWriteStream)(_libConfigFiles.INDEX_FILE).write('');

        (0, _libTerminalOut.print)(COMMAND, 'Wiped everything! It\'s as clean as a baby\'s butt.');
    }
});

//# sourceMappingURL=sif-purge.js.map