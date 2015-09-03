'use strict';

import program from 'commander';

// TODO: get version from config.
program
    .version('0.1.0')
    .command('alias <new>', 'Adds a new alias <new>. An alias is a single word with no spaces in it.')
    .command('rmalias <index>', 'Removes the alias at the <index>.')
    .command('aliases', 'Lists all aliases.')
    .command('*', 'Performs a search. See README.md for details')
    .command('purge', 'Removes ALL the indexed data, and ALL the aliases. This process is IRREVERSIBLE.')

