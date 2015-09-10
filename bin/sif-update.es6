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
import {join} from 'path';
import {spawn} from 'child_process';
import {createReadStream as read, createWriteStream as write} from 'fs';

import {printHeader as header, print, printBlank as blank, printError as error} from '../lib/terminal/out';

const COMMAND = 'update';
const SUCCESS = 200;
const INDEX_FILE = join(__dirname, '../data/index.idx');
const TMP_EXISTING_FILE = join(__dirname, '__tmp_processed');
const TMP_PROCESSED_FILE = join(__dirname, '__tmp_existing');

program.parse(process.argv);

// TODO: this file needs some cleanup.

print(COMMAND, 'Started updating the index… This may take a while. Please be patient…');

let copyAssets = () => {
    let cat = spawn('cat', [TMP_EXISTING_FILE, TMP_PROCESSED_FILE]);
    let sort = spawn('sort', ['-u']);

    let indexWriteStream = write(INDEX_FILE, {encoding: 'utf8'});

    sort.stdout.pipe(indexWriteStream);

    cat.stdout.on('data', (line) => sort.stdin.write(line) );
    cat.stdout.on('end', () => sort.stdin.end() );
    sort.stdout.on('end', () => indexWriteStream.end() );
    sort.stdout.on('end', () => print(COMMAND, 'Index file has been successfully updated.') )
};

let backup = spawn('cp', [INDEX_FILE, INDEX_FILE + '.backup']);

backup.stdout.on('end', () => {
    let inStream = byline(read(INDEX_FILE, {encoding: 'utf8'}));

    let tmpExistingFileWriteStream = write(TMP_EXISTING_FILE, {encoding: 'utf8'});
    let tmpProcessedFileWriteStream = write(TMP_PROCESSED_FILE, {encoding: 'utf8'});

    // can be done with promises too.
    let remainingMetaDataRequests = 0;
    let inStreamEnded = false;

    let maybeEndStreamsThenCopyAssets = null;

    maybeEndStreamsThenCopyAssets = () => {
        if (inStreamEnded && remainingMetaDataRequests === 0) {
            let copyAssets = () => {
                let cat = spawn('cat', [TMP_EXISTING_FILE, TMP_PROCESSED_FILE]);
                let sort = spawn('sort', ['-u']);

                let indexWriteStream = write(INDEX_FILE, {encoding: 'utf8'});

                cat.stdout.on('data', (line) => {
                    sort.stdin.write(line);
                });

                // rs | ws
                sort.stdout.pipe(indexWriteStream);

                sort.stdout.on('end', () => {
                    print(COMMAND, 'Done!');

                    indexWriteStream.end();
                });

                cat.stdout.on('end', () => {
                    sort.stdin.end();
                });
            };

            let maybeCopyAssets = null;
            let counter = 2;

            maybeCopyAssets = () => {
                counter--;

                if (counter === 0) {
                    copyAssets();
                }

                maybeCopyAssets = () => {};
            };

            // TODO: this part "begs" for promises.
            tmpProcessedFileWriteStream.on('finish', maybeCopyAssets);
            tmpExistingFileWriteStream.on('finish', maybeCopyAssets);

            tmpProcessedFileWriteStream.end();
            tmpExistingFileWriteStream.end();

            maybeEndStreamsThenCopyAssets = () => {};
        }
    };

    inStream.on('data', (line) => {

        // TODO: to a util library function.
        let occurrences = line.split('<::sif::>').length - 1;
        let needsProcessing = occurrences === 0;
        let alreadyProcessed = occurrences === 1;
        let malformed = !needsProcessing && !alreadyProcessed;

        if (malformed) {
            error(COMMAND, `badly-formatted line: "${line.replace(/sif/g, '__sif__')}"`);

            return;
        }

        if (needsProcessing) {
            remainingMetaDataRequests++;

            let url = line.trim();

            request(url, (error, response, body) => {
                remainingMetaDataRequests--;

                if (error || response.statusCode !== SUCCESS) {
                    maybeEndStreamsThenCopyAssets();

                    return;
                }

                let replaced = body.replace(/\s+/g, ' ');
                let result = /<title>(.*?)<\/title>/i.exec(replaced);
                let title = result[1];

                if (title) {
                    tmpProcessedFileWriteStream.write(url + ' <::sif::> ' + title + '\n');
                } else {
                    error(COMMAND, `no title found for: "${url}"; I'll leave it untouched. — Please file a bug at xxx to get it fixed.`);

                    tmpExistingFileWriteStream.write(url + '\n');
                }

                maybeEndStreamsThenCopyAssets();
            });

            return;
        }

        tmpExistingFileWriteStream.write(line.trim() + '\n');
    });

    inStream.on('end', () => {
        inStreamEnded = true;

        // on `end`, all the data is consumed.
        maybeEndStreamsThenCopyAssets();
    });
});
