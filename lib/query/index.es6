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

import byline from 'byline';
import { createStream as createLineStream } from 'byline';
import { createReadStream as read } from 'fs';
import { spawn } from 'child_process';
import { Promise } from 'bluebird';
import {
    ALIASES_FILE,
    INDEX_FILE
} from '../config/files'
import {
    ALIAS_PREFIX,
    ALIAS_DELIMITER
} from '../config/constants';

let fsOptions = { encoding: 'utf8' };

let resolveAliasedQuery = ( aliased ) => {
    if ( aliased[ 0 ] !== ALIAS_PREFIX ) {
        return Promise.resolve( aliased );
    }

    return new Promise( ( resolve, reject ) => {
        void reject;

        let search = aliased.substring( 1 );
        let lines = byline( read( ALIASES_FILE, fsOptions ) );

        lines.on( 'data', ( line ) => {
            let tokens = line.split( ALIAS_DELIMITER );
            let alias = tokens[ 0 ];
            let query = tokens[ 1 ];

            if ( search === alias ) { resolve( query ); }
        });

        lines.on( 'end', () => resolve( aliased ) );
    } );
};

let searchForQuery = ( query, inverted, notifyData, notifyEnd ) => {
    let eGrepOptions = [ '-i' ];

    if (inverted) {
        eGrepOptions.push( '-v' );
    }

    eGrepOptions.push( query );

    let child = spawn( 'cat', [ INDEX_FILE ] );
    let filter = spawn( 'egrep', eGrepOptions );

    let lines = createLineStream();

    child.stdout.pipe( filter.stdin );
    filter.stdout.pipe( lines );

    lines.on( 'data', ( line ) => notifyData( line.toString() ) );
    lines.on('end', () => notifyEnd() );

    child.stdout.on( 'end', () => {

        // Waits for buffer to flush before destroying the stream:
        filter.stdin.end();
    } );
};

let find = ( query, inverted, notifyData, notifyEnd ) => {
    resolveAliasedQuery( query ).then(
        ( query ) => searchForQuery( query, inverted, notifyData, notifyEnd )
    );
};

export { find };

