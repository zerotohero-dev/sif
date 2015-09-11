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

import {Promise} from 'bluebird';

import {createReadStream as read} from 'fs';
import {join} from 'path';
import {spawn} from 'child_process';

import {
    printHeader as header,
    print,
    printBlank as blank,
    printBanner as banner
} from '../lib/terminal/out';

const DATA_FILE = join(__dirname, '../data/index.idx');
const ALIASES_FILE = join(__dirname, '../data/aliases.dat');
const COMMAND = 'find';

program.parse(process.argv);

let query = program.args.length ? program.args[0] : '*';

let resolveAliasedQuery = (aliased) => {
    return new Promise((resolve, reject) => {
        void reject;

        let search = aliased.substring(1);
        let lines = byline(read(ALIASES_FILE, {encoding: 'utf8'}));

        lines.on('data', (line) => {
            console.log(line);

            let tokens = line.split('=');
            let alias = tokens[0];
            let query = tokens[1];

            console.log(search);
            console.log(alias);

            if (search === alias) {resolve(query);}
        });

        lines.on('end', () => resolve(aliased) );
    });
};

let find = (query) => {
    let child = spawn('cat', [DATA_FILE]);
    let filter = spawn('egrep', ['-i', query]);

    let lines = byline.createStream();

    child.stdout.on('data', (line) => filter.stdin.write(line));

    filter.stdin.on('finish', () => {});
    filter.stdin.on('error', () => {});
    filter.stdin.on('close', () => {});

    filter.stdout.pipe(lines);

    lines.on('data', (line) => {
        print(COMMAND, line.toString());
    });

    lines.on('end', () => {
        print(COMMAND, 'Done.');
    });

    child.stdout.on('end', () => {

        // Waits for buffer to flush before destroying the stream:
        filter.stdin.end();
    });
};

let isAliased  = (query) => {
    return query[0] === '@';
};

// isAlias
if (isAliased(query))
    {resolveAliasedQuery(query).then(find);}
else
    {find(query);}
