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

var watch = require( 'chokidar' ).watch;
var spawn = require( 'child_process' ).spawn;
var join = require('path').join;

var GLOB = join( __dirname, '../**/*.es6' );
var TRANSPILE_CMD = join( __dirname, '../devbin/transpile.sh' );

watch( GLOB, {} )
  .on( 'change', function( path ) { 
      var child = spawn( TRANSPILE_CMD, [ path ] );

      child.stdout.on( 'data', function( chunk ) {
        console.log(chunk.toString());
      } );

      child.stderr.on( 'data', function( chunk ) {
        console.log(chunk.toString());
      } );
   } );

