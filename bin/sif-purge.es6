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
import chalk;
import { print, printBlank as blank } from '../lib/terminal/out';

import {start, get} from 'prompt';

const COMMAND = 'purge';

program.parse( process.argv );

let schema = {
    properties: {
        answer: {
            description: chalk.black.bgWhite('This will IRREVERSIBLY delete everything. — Are you absolutely sure? [y/n]'),
            pattern: /^(yes|no)$/i,
            message: 'Please reply with "yes" or "no".',
            required: true
        }
    }
};

start();

get(schema, (err, result) => {
    let answer = result.answer;

    if ( answer.toLowerCase() === 'yes' ) {

    }
});

//print( COMMAND, 'Command not implemented yet!' );
//blank();
