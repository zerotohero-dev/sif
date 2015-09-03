'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

// TODO: get version from config.
_commander2['default'].version('0.1.0').command('alias <new>', 'Adds a new alias <new>. An alias is a single word with no spaces in it.').command('rmalias <index>', 'Removes the alias at the <index>.').command('aliases', 'Lists all aliases.').command('*', 'Performs a search. See README.md for details').command('purge', 'Removes ALL the indexed data, and ALL the aliases. This process is IRREVERSIBLE.');

//# sourceMappingURL=index.js.map