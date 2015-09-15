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

import { createWriteStream as write } from 'fs';
import { start, get } from 'prompt';

import { print } from '../lib/terminal/out';

import {
    ALIASES_FILE,
    INDEX_FILE
} from '../lib/config/files'

const COMMAND = 'purge';

program.parse( process.argv );

let schema = {
    properties: {
        answer: {
            description: 'This will IRREVERSIBLY delete everything. — Are you absolutely sure? [yes/no]',
            pattern: /^(yes|no)$/i,
            message: 'Please reply with "yes" or "no".',
            required: true
        }
    }
};

start();

get( schema, ( err, result ) => {
    let answer = result.answer;

    if ( answer.toLowerCase() === 'yes' ) {
        write( ALIASES_FILE ).write( '' );
        write( INDEX_FILE ).write( '' );

        print( COMMAND, 
            'Wiped everything! It\'s as clean as a baby\'s butt.' 
        );
    }
} );

