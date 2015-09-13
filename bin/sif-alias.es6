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
import {spawn} from 'child_process';
import {createReadStream as read, createWriteStream as write} from 'fs';

import {printError as error, print} from '../lib/terminal/out';

import {ALIASES_FILE, ALIASES_TMP_FILE} from '../lib/config/files';
import {ALIAS_DELIMITER} from '../lib/config/constants';

program.parse(process.argv);

let args = program.args;

if (args.length < 2) {
    error('alias', 'Invalid arguments. — Usage: "sif alias <shorthand> <query>".');

    process.exit(1);
}

let shorthand = args[0];
let query = args[1];

let cat = spawn('cat', [ALIASES_FILE]);
let lines = byline(cat.stdout);

let processed = false;

let tempStream = write(ALIASES_TMP_FILE, {encoding: 'utf8'});

lines.on('data', (line) => {
    let currentLine = line.toString();
    let parts = currentLine.split(ALIAS_DELIMITER);

    if (!parts.length) {return;}

    // TODO: adding a line to a file based on a predicate is a common task; make it a module.
    let alias = parts[0];
    let command = parts[1];

    if (alias === shorthand.trim()) {
        tempStream.write(`${alias}${ALIAS_DELIMITER}${query.trim()}\n`);
        processed = true;

        return;
    }

    tempStream.write(`${alias}=${command}\n`);
});

tempStream.on('finish', () => {
    let aliasWriteStream = write(ALIASES_FILE, {encoding: 'utf8'});

    //console.log(ALIASES_TMP_FILE);

    let cat = spawn('cat', [ALIASES_TMP_FILE]);

    cat.stdout.on('data', (line) => {
        //console.log(';;;;;;;;');
        //console.log('###', line.toString().split('\n'));
        //console.log(';;;;;;;;');
    });


    let sort = spawn('sort', ['-u']);

    cat.stdout.pipe(sort.stdin);

    //cat.stdout.on('data', (buffer) => sort.stdin.write(buffer) );

    let sortedLines = byline(sort.stdout);

    sortedLines.on('data', (line) => aliasWriteStream.write(`${line.toString()}\n`, 'utf8') );

    aliasWriteStream.on('finish', () => print('alias', 'Done!') );

    cat.stdout.on('end', () => sort.stdin.end() );
    sort.stdout.on('end', () => aliasWriteStream.end() );
});

lines.on('end', () => {
    //console.log('ENDED!!!!! fiuxme');

    if (processed) {
        //console.log('processed, so ending.')
        tempStream.end();

        return;
    }

    //console.log('not processed, so appending.');

    tempStream.end(`${shorthand}${ALIAS_DELIMITER}${query}\n`);
});
