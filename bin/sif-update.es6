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

import {printHeader as header, print, printBlank as blank} from '../lib/terminal/out';

const COMMAND = 'update';

program.parse(process.argv);

print(COMMAND, 'This may take a while. Please be patient…');

print(COMMAND, 'Command not implemented yet!');


// For each line in index
// check if it is processed already
// if not process it and apend the result to a temp file.
// concat index and temp file, sort the result and write it back to index.

blank();
