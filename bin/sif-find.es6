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

import program from 'commander';
import { print } from '../lib/terminal/out';
import { find as search } from '../lib/query';

const COMMAND = 'find';

program
    .usage('<what> [options]')
    .option( '-i, --invert', 'Inverts the selection so that anything that does NOT match the search criteria will be listed.' )
    .parse( process.argv );

search(
    program.args.length ? program.args[ 0 ] : '*',
    program.invert,
    ( found ) => print( COMMAND, found ),
    () => print( COMMAND, 'Done.')
);
 
