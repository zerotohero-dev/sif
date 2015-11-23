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

 import {
     DELIMITER_REPLACEMENT
 } from './config/constants';
 import {
     MATCH_ALL_DELIMITERS
 } from './config/regexp';

export default {
    noTitleFoundForUrlMessage: ( url ) => `no title found for: "${url}"; I'll leave it untouched. — Please file an issue at https://github.com/v0lkan/sif/issues/new to get it fixed.`,
    cannotFindInTitleMessage( url ) => `Cannot find title in ${url}.`,
    badlyFormattedLineMessage: ( line ) => `badly-formatted line: "${line.replace( MATCH_ALL_DELIMITERS, DELIMITER_REPLACEMENT )}"`,
    startedUpdatingIndexMessage: () => 'Started updating the index… This may take a while. Please be patient…',
    indexUpdatedSuccessfullyMessage: () => 'Index file has been successfully updated.',
    completedMessage() => 'Done!'
};
