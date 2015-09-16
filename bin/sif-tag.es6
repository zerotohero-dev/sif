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

import { print, error } from '../lib/terminal/out';

program.parse( process.argv );

const COMMAND = 'tag';

if ( program.args.length === 0 ) {
    error(COMMAND, 'Usage: sif tag [searchExpression] [tagName]')
    exit(1);
}

let query = program.args[0];
let tags = program.args.splice(1);

// update the query library to perform an inverted search.

// Perform an inverted search with query, save it to a temp file.
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

