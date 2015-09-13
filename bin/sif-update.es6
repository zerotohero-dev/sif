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
import request from 'request';

import { join } from 'path';
import { spawn } from 'child_process';
import { createReadStream as read, createWriteStream as write } from 'fs';

import {
    print,
    printBlank as blank,
    printError as error
} from '../lib/terminal/out';

import {
    PROCESS_TMP_EXISTING_FILE,
    PROCESS_TMP_PROCESSED_FILE,
    INDEX_FILE
} from '../lib/config/files';

import {
    noTitleForUrlFound
} from '../lib/config/message';

import {
    DELIMITER,
    DELIMITER_REPLACEMENT
} from '../lib/config/constants';

import {
    MATCH_ALL_DELIMITERS,
    MATCH_ALL_WHITESPACES,
    MATCH_PAGE_TITLE
} from '../lib/config/regexp';

const COMMAND = 'update';
const SUCCESS = 200;

program.parse( process.argv );

// TODO: this file needs some cleanup.

print( COMMAND, 'Started updating the index… This may take a while. Please be patient…' );

let copyAssets = () => {

    // TODO: this is repeated; move it to a module.
    let cat = spawn( 'cat', [
        PROCESS_TMP_EXISTING_FILE,
        PROCESS_TMP_PROCESSED_FILE]
    );
    let sort = spawn( 'sort', [ '-u' ] );

    let indexWriteStream = write( INDEX_FILE, { encoding: 'utf8' } );

    sort.stdout.pipe( indexWriteStream );

    cat.stdout.on( 'data', ( line ) => sort.stdin.write( line ) );
    cat.stdout.on( 'end', () => sort.stdin.end() );

    sort.stdout.on( 'end', () => indexWriteStream.end() );
    sort.stdout.on( 'end',
        () => print( COMMAND, 'Index file has been successfully updated.' )
    );
};

let backup = spawn( 'cp', [ INDEX_FILE, INDEX_FILE + '.backup' ] );

let fsOptions = { encoding: 'utf8' };

backup.stdout.on( 'end', () => {
    let inStream = byline( read( INDEX_FILE, fsOptions ) );

    let tmpExistingFileWriteStream = write( PROCESS_TMP_EXISTING_FILE, fsOptions );
    let tmpProcessedFileWriteStream = write( PROCESS_TMP_PROCESSED_FILE, fsOptions );

    // can be done with promises too.
    let remainingMetaDataRequests = 0;
    let inStreamEnded = false;

    let tryPersistTemporaryData = null;

    tryPersistTemporaryData = () => {
        if ( !inStreamEnded || remainingMetaDataRequests !== 0 ) { return; }

        let copyAssets = () => {
            let cat = spawn( 'cat', [ PROCESS_TMP_EXISTING_FILE, PROCESS_TMP_PROCESSED_FILE ] );
            let sort = spawn( 'sort', [ '-u' ] );

            let indexWriteStream = write( INDEX_FILE, fsOptions );

            cat.stdout.pipe( sort.stdin );
            sort.stdout.pipe( indexWriteStream );

            indexWriteStream.on( 'finish', () => print( COMMAND, 'Done!' ) );

            sort.stdout.on( 'end', () => indexWriteStream.end() );
            cat.stdout.on( 'end', () => sort.stdin.end() );
        };

        let maybeCopyAssets = null;
        let counter = 2;

        maybeCopyAssets = () => {
            counter--;

            if ( counter === 0 ) {
                copyAssets();
            }

            maybeCopyAssets = () => {};
        };

        // TODO: this part "begs" for promises.
        tmpProcessedFileWriteStream.on( 'finish', maybeCopyAssets );
        tmpExistingFileWriteStream.on( 'finish', maybeCopyAssets );

        tmpProcessedFileWriteStream.end();
        tmpExistingFileWriteStream.end();

        tryPersistTemporaryData = () => {};
    };

    inStream.on( 'data', ( line ) => {

        // TODO: to a util library function.
        let occurrences = line.split( DELIMITER ).length - 1;
        let needsProcessing = occurrences === 0;
        let alreadyProcessed = occurrences === 1;
        let malformed = !needsProcessing && !alreadyProcessed;

        if ( malformed ) {
            error(
                COMMAND,
                `badly-formatted line: "${line.replace( MATCH_ALL_DELIMITERS, DELIMITER_REPLACEMENT )}"`
            );

            return;
        }

        if ( needsProcessing ) {
            remainingMetaDataRequests++;

            let url = line.trim();

            request( url, ( err, response, body ) => {
                remainingMetaDataRequests--;

                if ( err || response.statusCode !== SUCCESS ) {
                    tryPersistTemporaryData();

                    return;
                }

                let replaced = body.replace( MATCH_ALL_WHITESPACES, ' ' );
                let result = MATCH_PAGE_TITLE.exec( replaced );

                if ( !result ) {
                    error( COMMAND, `Cannot find title in ${url}.` );

                    tryPersistTemporaryData();

                    return;
                }

                let title = result[ 1 ];

                if ( title ) {
                    tmpProcessedFileWriteStream.write( `${url} ${DELIMITER} ${title}\n` );
                } else {
                    err( COMMAND, noTitleForUrlFound( url ) ) ;

                    tmpExistingFileWriteStream.write( `${url}\n` );
                }

                tryPersistTemporaryData();
            });

            return;
        }

        tmpExistingFileWriteStream.write( `${line.trim()}\n` );
    });

    inStream.on( 'end', () => {
        inStreamEnded = true;

        // on `end`, all the data is consumed.
        tryPersistTemporaryData();
    });
});
