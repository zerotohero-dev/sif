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

import { join } from 'path';
import { spawn } from 'child_process';
import { createReadStream as read, createWriteStream as write } from 'fs';

import { printError as error, print } from '../lib/terminal/out';

import { ALIASES_FILE, ALIASES_TMP_FILE } from '../lib/config/files';
import { ALIAS_DELIMITER } from '../lib/config/constants';

program
    .usage('<shorthand> <query>')
    .parse( process.argv );

const COMMAND = 'alias';

let args = program.args;

let fsOptions = { encoding: 'utf8' };

if (args.length < 2) {
    error(
        COMMAND,
        'Invalid arguments. — Usage: "sif alias <shorthand> <query>".'
    );

    process.exit( 1 );
}

let shorthand = args[ 0 ];
let query = args[ 1 ];

let tempStream = write( ALIASES_TMP_FILE, fsOptions );

{
    tempStream.on('finish', () => {
        let sort = spawn( 'sort', [ '-u', ALIASES_TMP_FILE ] );
        let sortedLines = byline( sort.stdout );
        let aliasWriteStream = write( ALIASES_FILE, fsOptions );

        sortedLines.on( 'data', line => aliasWriteStream.write( `${line}\n` ) );

        aliasWriteStream.on( 'finish', () => print( COMMAND, 'Done!' ) );

        sortedLines.on( 'end', () => { aliasWriteStream.end(); } );

        return;
    } );
}

{
    let cat = spawn( 'cat', [ ALIASES_FILE ] );
    let lines = byline( cat.stdout );

    let processed = false;

    lines.on( 'data', ( line ) => {
        let currentLine = line.toString();
        let parts = currentLine.split( ALIAS_DELIMITER );

        if ( !parts.length ) { return; }

        // TODO: adding a line to a file based on a predicate is a common task; make it a module.
        let alias = parts[ 0 ];
        let command = parts[ 1 ];

        if ( alias === shorthand.trim() ) {
            tempStream.write( `${alias}${ALIAS_DELIMITER}${query.trim()}\n` );
            processed = true;

            return;
        }

        tempStream.write( `${alias}=${command}\n` );
    });

    lines.on('end', () => {
        if ( processed ) {
            tempStream.end();

            return;
        }

        tempStream.end( `${shorthand}${ALIAS_DELIMITER}${query}\n` );
    } );
}
