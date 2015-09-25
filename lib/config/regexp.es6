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

export default {
    MATCH_DELIMITER: /\s*<::sif::>\s*/,
    MATCH_TAGS_DELIMITER: /\s*<::tags::>\s*/,
    MATCH_TAG_DELIMITER: /\s*,\s*/,
    MATCH_ALL_DELIMITERS: /<::sif::>/g,
    MATCH_PAGE_TITLE: /<title.*?>(.*?)<\/title.*?>/i,
    MATCH_ALL_WHITESPACES: /\s+/g
};

