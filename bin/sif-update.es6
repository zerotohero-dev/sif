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
import {join} from 'path';
import {createReadStream as read, createWriteStream as write} from 'fs';

import {printHeader as header, print, printBlank as blank, printError as error} from '../lib/terminal/out';

const COMMAND = 'update';
const INDEX_FILE = join(__dirname, '../data/index.idx');

program.parse(process.argv);

let inStream = byline(read(INDEX_FILE, {encoding: 'utf8'}));

print(COMMAND, 'This may take a while. Please be patient…');

inStream.on('data', (line) => {
    if ( line.split('<::sif::>').length > 2) {
        error(COMMAND, `badly-formatted line: "${line.replace(/sif/g, '__sif__')}"`);

        return;
    }


    //console.log( line.indexOf('<::sif::>') );

   // print(COMMAND, 'bazinga');
});

// For each line in index
// check if it is processed already
// if not process it and apend the result to a temp file.
// concat index and temp file, sort the result and write it back to index.

blank();
