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
import byline from 'byline';

import { spawn } from 'child_process';
import { createReadStream as read, createWriteStream as write } from 'fs';

import { print } from '../lib/terminal/out';

import { ALIASES_FILE, ALIASES_TMP_FILE } from '../lib/config/files';
import { ALIAS_DELIMITER } from '../lib/config/constants';

program.parse( process.argv );

let args = program.args;

let fsOptions = { encoding: 'utf8' };

if ( args.length < 1 ) {
    error( 'alias', 'Invalid arguments. — Usage: "sif rmalias <alias>".' );

    process.exit(1);
}

let alias = program.args[ 0 ];

let cat = spawn( 'cat', [ ALIASES_FILE ] );
let lines = byline( cat.stdout );

let tempStream = write( ALIASES_TMP_FILE, fsOptions );

lines.on( 'data', ( line ) => {
    let text = line.toString();
    let parts = text.split( ALIAS_DELIMITER );

    if ( parts.length === 1 ) { return; }

    let currentAlias = parts[ 0 ];

    if ( currentAlias === alias.trim() ) { return; }

    tempStream.write( `${text}\n` );
});

tempStream.on( 'finish', () => {
    read( ALIASES_TMP_FILE, fsOptions )
        .pipe( write( ALIASES_FILE, fsOptions ) )
        .on( 'finish', () => {
            print( 'rmalias', 'Done!' );
        });
});

lines.on( 'end', () => tempStream.end() );
