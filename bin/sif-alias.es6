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

import {
    printHeader as header,
    printError as error,
    printBlank as blank,
    print
} from '../lib/terminal/out';

const ALIASES_FILE = join(__dirname, '../data/aliases.dat');
const ALIASES_TMP_FILE = join(__dirname, '__tmp_aliases');
program.parse(process.argv);

let args = program.args;

if (args.length < 2) {
    error('alias', 'Invalid arguments. — Usage: "sif alias <shorthand> <query>".');
}

let shorthand = args[0];
let query = args[1];

let cat = spawn('cat', [ALIASES_FILE]);

let lines = byline(cat.stdout);

let processed = false;

let tempStream = write(ALIASES_TMP_FILE, {encoding: 'utf8'});

lines.on('data', (line) => {
    let currentLine = line.toString();
    let parts = currentLine.split('=');

    if (!parts.length) {return;}

    // TODO: adding a line to a file based on a predicate is a common task; make it a module.
    let alias = parts[0];
    let command = parts[1];

    if (alias === shorthand.trim()) {
        tempStream.write(`${alias}=${query.trim()}\n`);
        processed = true;

        return;
    }

    tempStream.write(`${alias}=${command}\n`);
});

tempStream.on('finish', () => {
    let aliasWriteStream = write(ALIASES_FILE, {encoding: 'utf8'});

    let cat = spawn('cat', [ALIASES_TMP_FILE]);
    let sort = spawn('sort', ['-u']);

    cat.stdout.on('data', (line) => sort.stdin.write(line) );
    cat.stdout.on('end', () => sort.stdin.end() );
    sort.stdout.on('end', () => aliasWriteStream.end() );

    sort.stdout.pipe(aliasWriteStream);
});

lines.on('end', () => {
    if (processed) {
        tempStream.end();
        return;
    }

    tempStream.write(`${shorthand}=${query}\n`);
    tempStream.end();
});
