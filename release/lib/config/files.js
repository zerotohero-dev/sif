'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
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

var _path = require('path');

exports['default'] = {
  ALIASES_FILE: (0, _path.join)(__dirname, '../../data/aliases.dat'),
  ALIASES_TMP_FILE: (0, _path.join)(__dirname, '../../tmp/__tmp_aliases'),
  INDEX_FILE: (0, _path.join)(__dirname, '../../data/index.idx'),
  PROCESS_TMP_EXISTING_FILE: (0, _path.join)(__dirname, '../../tmp/__tmp_existing'),
  PROCESS_TMP_PROCESSED_FILE: (0, _path.join)(__dirname, '../../tmp/__tmp_processed')
};
module.exports = exports['default'];

//# sourceMappingURL=files.js.map