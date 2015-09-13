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

import {join} from 'path';

export default {
    ALIASES_FILE: join( __dirname, '../../data/aliases.dat' ),
    ALIASES_TMP_FILE: join( __dirname, '../../tmp/__tmp_aliases' ),
    INDEX_FILE: join( __dirname, '../../data/index.idx' ),
    PROCESS_TMP_EXISTING_FILE: join( __dirname, '../../tmp/__tmp_existing' ),
    PROCESS_TMP_PROCESSED_FILE: join( __dirname, '../../tmp/__tmp_processed' )
};
