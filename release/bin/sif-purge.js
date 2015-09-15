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

var _libTerminalOut = require('../lib/terminal/out');

var _prompt = require('prompt');

var COMMAND = 'purge';

_commander2['default'].parse(process.argv);

var schema = {
    properties: {
        answer: {
            description: 'This will IRREVERSIBLY delete everything. — Are you absolutely sure? [y/n]',
            pattern: /^(yes|y|no|n)$/i,
            message: 'Please reply with "yes" or "no".',
            required: true
        }
    }
};

(0, _prompt.start)();

(0, _prompt.get)(schema, function (err, result) {
    console.log(result);
});

//print( COMMAND, 'Command not implemented yet!' );
//blank();

//# sourceMappingURL=sif-purge.js.map