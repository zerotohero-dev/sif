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
import { printBanner as banner } from '../lib/terminal/out';
import { version } from '../package.json';

banner();

program
    .version( version )
    .command( 'aliases', 'Lists all aliases.' )
    .command( 'alias <shorthand> <query>', 'Adds a new alias <shorthand> for <query>.' )
    .command( 'rmalias <alias>', 'Removes the alias named <alias>.' )
    .command( 'tag <query> [tag1 tag2...]', 'Adds tags to all the results that match the search query <query>.' )
    .command( 'rmtag <query> [tag1 tag2...]', 'Removes tags from all the results that match the search query <query>.' )
    .command('purge', 'Removes ALL the indexed data, and ALL the aliases. This process is IRREVERSIBLE.' )
    .command( 'update', 'Updates and re-sorts the index by fetching metadata for the newly-added items.' )
    .command( 'find <what> [options]', 'Performs a search. See README.md for details.' )
    .parse( process.argv );

