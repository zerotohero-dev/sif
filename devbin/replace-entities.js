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

var decode = require( 'entities' ).decodeHTML;
var read = require( 'fs' ).createReadStream;
var byline = require( 'byline' );

var INDEX_FILE = require( '../lib/config/files' ).INDEX_FILE;

var fsOptions = { encoding: 'utf8' };
var lines = byline( read( INDEX_FILE, fsOptions ) );

lines.on( 'data', function( line ) {
    let decoded = decode( line );

    if ( decoded.indexOf( '<::tags::>' ) === -1 ) {
        decoded += ' <::tags::>';
    }

    console.log( decoded );
} );

