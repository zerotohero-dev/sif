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

var _libQuery = require('../lib/query');

var COMMAND = 'find';

_commander2['default']
// TODO: add this `usage` block to all the subcommands.
.usage('<what> [options]')
//    .command('<what>')
.option('-i, --invert', 'Inverts the selection so that anything that does NOT match the search criteria will be listed.')
//    .action(() => {
//        console.log('action');
//        console.log('action');
//        console.log('action');
//        console.log('action');
//        //console.log('options', what, options);
//    })
.parse(process.argv);

//console.log(program.commands[0].invert);
//console.log(program.commands[0].args);

console.log(_commander2['default']);

//search(
//    program.args.length ? program.args[ 0 ] : '*',
//   program.invert,
// ( found ) => print( COMMAND, found ),
//   () => print( COMMAND, 'Done.')
//);

//# sourceMappingURL=sif-find.js.map