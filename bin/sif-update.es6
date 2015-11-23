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
import { print, printError as error } from '../lib/terminal/out';
import {
    PROCESS_TMP_EXISTING_FILE,
    PROCESS_TMP_PROCESSED_FILE,
    INDEX_FILE
} from '../lib/config/files';
import {
    noTitleFoundForUrlMessage,
    badlyFormattedLineMessage,
    startedUpdatingIndexMessage,
    indexUpdatedSuccessfullyMessage,
    completedMessage
} from '../lib/config/messages';
import {
    trimmedLine,
    urlWithTitleLine,
    urlWithoutTitleLine
} from '../lib/config/lines';
import {
    DELIMITER,
    TAGS_DELIMITER
} from '../lib/config/constants';
import {
    MATCH_ALL_WHITESPACES,
    MATCH_PAGE_TITLE
} from '../lib/config/regexp';

const COMMAND = 'update';
const SUCCESS = 200;

program.parse( process.argv );

// TODO: this file needs some cleanup.

print( COMMAND,  startedUpdatingIndexMessage() );

let copyAssets = () => {

    // TODO: this is repeated; move it to a module.
    // TODO: sort can do concatanetion, no need to pipe with cat.
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
        () => print( COMMAND, indexUpdatedSuccessfullyMessage() )
    );
};

let backup = spawn( 'cp', [ INDEX_FILE, INDEX_FILE + '.backup' ] );

let fsOptions = { encoding: 'utf8' };

backup.stdout.on( 'end', () => {
    let inStream = byline( read( INDEX_FILE, fsOptions ) );

    let tmpExistingFileWriteStream = write(
        PROCESS_TMP_EXISTING_FILE,
        fsOptions
    );
    let tmpProcessedFileWriteStream = write(
        PROCESS_TMP_PROCESSED_FILE,
        fsOptions
    );

    // can be done with promises too.
    let remainingMetaDataRequests = 0;
    let inStreamEnded = false;

    let tryPersistTemporaryData = null;

    tryPersistTemporaryData = () => {
        if ( !inStreamEnded || remainingMetaDataRequests !== 0 ) { return; }

        let copyAssets = () => {
            let cat = spawn( 'cat', [
                PROCESS_TMP_EXISTING_FILE,
                PROCESS_TMP_PROCESSED_FILE
            ] );
            let sort = spawn( 'sort', [ '-u' ] );

            let indexWriteStream = write( INDEX_FILE, fsOptions );

            cat.stdout.pipe( sort.stdin );
            sort.stdout.pipe( indexWriteStream );

            indexWriteStream.on( 'finish', () => print(
                COMMAND, completedMessage()
            ) );
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
            error( COMMAND, badlyFormattedLineMessage( line ) );

            return;
        }

        if ( needsProcessing ) {
            remainingMetaDataRequests++;

            let url = line.replace( TAGS_DELIMITER, '' ).trim();

            // {gzip: true} to add an `Accept-Encoding` header to the request.
            // Although `request` library does automatic gzip decoding,
            // certain websites
            // get confused if the header is not present in the initial request.
            request(
                { method: 'GET', 'uri': url, gzip: true },
                ( err, response, body ) => {
                    remainingMetaDataRequests--;

                    if ( err || response.statusCode !== SUCCESS ) {
                        tryPersistTemporaryData();

                        return;
                    }

                    //TODO: these replacements should go to a transformer module of some sort.
                    let replaced = body.replace( MATCH_ALL_WHITESPACES, ' ' );
                    let result = MATCH_PAGE_TITLE.exec( replaced );

                    if ( !result ) {
                        error( COMMAND,  cannotFindInTitleMessage( url ) );

                        tmpExistingFileWriteStream.write(
                            urlWithoutTitleLine( url )
                        );

                        tryPersistTemporaryData();

                        return;
                    }

                    let title = result[ 1 ];

                    if ( title ) {
                        tmpProcessedFileWriteStream.write(
                            urlWithTitleLine( url, title )
                        );
                    } else {
                        error( COMMAND, noTitleFoundForUrlMessage( url ) ) ;

                        tmpExistingFileWriteStream.write(
                            urlWithoutTitleLine( url )
                        );
                    }

                    tryPersistTemporaryData();
                }
            );

            return;
        }

        tmpExistingFileWriteStream.write( trimmedLine( line ) );
    } );

    inStream.on( 'end', () => {
        inStreamEnded = true;

        // on `end`, all the data is consumed.
        tryPersistTemporaryData();
    } );
} );
