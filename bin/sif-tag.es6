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
import { createWriteStream as write, createReadStream as read } from 'fs';
import { spawn } from 'child_process';
import { print, error } from '../lib/terminal/out';
import { find } from '../lib/query';
import {
    INDEX_FILE,
    PROCESS_TMP_EXISTING_FILE,
    PROCESS_TMP_PROCESSED_FILE
} from '../lib/config/files';
import {
    MATCH_DELIMITER,
    MATCH_TAGS_DELIMITER,
    MATCH_TAG_DELIMITER
} from '../lib/config/regexp';
import {
    DELIMITER,
    TAGS_DELIMITER,
    TAG_DELIMITER
} from '../lib/config/consants';

program.parse( process.argv );

const COMMAND = 'tag';

let fsOptions = { encoding: 'utf8' };
let fsAppendOptions = { encoding: 'utf8', flags: 'a' };

if ( program.args.length === 0 ) {
    error(COMMAND, 'Usage: sif tag [searchExpression] [tagName]')
    exit(1);
}

let query = program.args[0];
let tags = program.args.splice(1);

// Perform an inverted search with query, save it to a temp file.
let tempStream = write( PROCESS_TMP_EXISTING_FILE, fsOptions );

tempStream.on( 'finish', () => {
    let tempStream = write( PROCESS_TMP_EXISTING_FILE, fsAppendOptions );

    tempStream.on( 'finish', () => {
        spawn( 'cp', [ INDEX_FILE, INDEX_FILE + '.backup' ] )
            .stdout.on( 'end', () => {
                spawn( 'sort', [ '-u', PROCESS_TMP_EXISTING_FILE ] )
                    .stdout.pipe( write( INDEX_FILE, fsOptions ) )
            } );
    } );

    find( query, false, ( line ) => {
        let parts = line.split( MATCH_DELIMITER );
        let url = parts[ 0 ];
        let meta = parts[ 1 ];

        if ( meta ) {
            let metaParts = meta.split( MATCH_TAGS_DELIMITER );
            let description = metaParts[ 0 ];
            let metaTags = metaParts[ 1 ];

            let mergedTags = [];

            // TODO: to some util module.
            let uniq = ( el, i, ar ) => ar.indexOf( el ) === i;
            let notEmpty = what => '' + what !== '';
            let trim = tag => tag.trim();

            let tagLiteral = ( metaTags || '' )
                .split( MATCH_TAG_DELIMITER )
                // TODO: for remove case "exclude" instead of "concat".
                .concat( tags )
                .filter( notEmpty )
                .map( trim )
                .filter( uniq )
                .sort()
                .join( TAG_DELIMITER );

            tempStream.write( `${url} ${DELIMITER} ${description} ${TAGS_DELIMITER} ${tagLiteral}\n` );
        } else {
            MATCH_TAGS_DELIMITER.test( line ) ?
                tempStream.write( `${line}\n` ) :
                tempStream.write( `${line} ${TAGS_DELIMITER}\n` );
        }
    }, () => {
        tempStream.end();
    } );
} );

find( query, true, ( line ) => {
    tempStream.write( `${line}\n` );
}, () => {
   tempStream.end();
} );

// rmtag will work similarly, and instead of adding into the array it will
// remove from the array.

