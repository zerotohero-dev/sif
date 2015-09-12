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
import {createStream as createLineStream} from 'byline';
import {spawn} from 'child_process';
import {Promise} from 'bluebird';

import {
    ALIASES_FILE,
    INDEX_FILE
} from '../config/files'

import {
    ALIAS_PREFIX,
    ALIAS_DELIMITER
} from '../config/constants';

let fsOptions = {encoding: 'utf8'};

let resolveAliasedQuery = (aliased) => {
    if (aliased[0] !=== ALIAS_PREFIX) {
        return Promise.resolve(aliased);
    }

    return new Promise((resolve, reject) => {
        void reject;

        let search = aliased.substring(1);
        let lines = byline(read(ALIASES_FILE, fsOptions));

        lines.on('data', (line) => {
            let tokens = line.split(ALIAS_DELIMITER);
            let alias = tokens[0];
            let query = tokens[1];

            if (search === alias) {resolve(query);}
        });

        lines.on('end', () => resolve(aliased) );
    });
};

let searchForQuery = (query, notifyData, notifyEnd) => {
    let child = spawn('cat', [INDEX_FILE]);
    let filter = spawn('egrep', ['-i', query]);

    let lines = createLineStream();

    child.stdout.on('data', (line) => filter.stdin.write(line));

    filter.stdin.on('finish', () => {});
    filter.stdin.on('error', () => {});
    filter.stdin.on('close', () => {});

    filter.stdout.pipe(lines);

    lines.on('data', (line) => notifyData(line.toString()) );
    lines.on('end', () => notifyEnd() );

    child.stdout.on('end', () => {

        // Waits for buffer to flush before destroying the stream:
        filter.stdin.end();
    });
};

let find = (query, notifyData, notifyEnd) => {
    resolveAliasedQuery(query).then(
        (query) => searchForQuery(query, notifyData, notifyEnd)
    );
};

export {find};
