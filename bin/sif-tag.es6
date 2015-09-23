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
    MATCH_TAGS_DELIMITER
} from '../lib/config/regexp';

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
        console.log( 'tempstream finished' );

        let backup = spawn( 'cp', [ INDEX_FILE, INDEX_FILE + '.backup' ] );

        backup.stdout.on( 'end', () => {
            spawn( 'sort', [ '-u', PROCESS_TMP_EXISTING_FILE ] )
                .stdout.pipe( write( INDEX_FILE, fsOptions ) ) 
        } );

    } );

    find( query, false, ( line ) => {
        let parts = line.split( MATCH_DELIMITER );
        let url = parts[ 0 ];
        let meta = parts[ 1 ];

        console.log( parts );

        if ( meta ) {
            let metaParts = meta.split( MATCH_TAGS_DELIMITER );
            let description = metaParts[ 0 ];
            let metaTags = metaParts[ 1 ];

            console.log( 'descriptions', metaParts[ 0 ] );

            let mergedTags = [];

            let MATCH_DELIMITER = /,/;
            let DELIMITER = ',';

            let uniq = ( el, i, ar ) => ar.indexOf( el ) === i;

            let tagLiteral = ( metaTags || '' ) 
                .split( MATCH_DELIMITER )
                .filter( tag => '' + tag )
                .concat( tags.filter( tag => '' + tag ) )
                .map( ( tag ) => tag.trim() )
                .filter( uniq )
                .sort()
                .join( DELIMITER );

            console.log( metaTags );
            console.log( tags );
            console.log( `tagLiteral "${tagLiteral}"`)

            tempStream.write( `${url} <::sif::> ${description} <::tags::> ${tagLiteral}\n` );
        } else {
            tempStream.write( `${line}\n` );
        }

    }, () => {
        console.log( 'Ending tempstream' );
        tempStream.end(); 
        console.log ( 'Ended tempstream ' );
    } );
} );

find( query, true, ( line ) => {
    tempStream.write( `${line}\n` );
}, () => {
   tempStream.end(); 
} );

// When file is closed, perform a search with query
//    for each line split the line into non-tag, and tag portions
//    for the tag portion compile a tags array. 
//    for every tag that is not contained in the tags array
//    add that tag to the search array.
//    sort the array.
//    concat the nontag part with the sorted and parsed tags.
//    append the result to the temp file.
// when temp file is closed, backup index.idx and 
//  save the sorted temp file onto index.idx
// console.log( program.args );

// rmtag will work similarly, and instead of adding into the array it will
// remove from the array.

