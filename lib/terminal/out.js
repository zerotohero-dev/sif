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

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _configRegexp = require('../config/regexp');

var printBanner = function printBanner() {
    console.log("     _,");
    console.log("    /(_");
    console.log("   |   '-._        . ' .");
    console.log("   \\    ,-.)      -= * =-");
    console.log("    \\((` .(        '/. '");
    console.log("     )\\  _/        /");
    console.log("  .-'   '--.      /");
    console.log("  \\,         \\   /| ");
    console.log("   ';,_) _)'\\ \\,//");
    console.log("");
};

var printHeader = function printHeader(text) {
    console.log(_chalk2['default'].green(text.toUpperCase()));
};

var print = function print(commandName, text) {
    var parts = text.split(_configRegexp.MATCH_DELIMITER);

    if (parts.length >= 2) {
        console.log('  ' + _chalk2['default'].green(commandName.toUpperCase()) + ': ' + _chalk2['default'].underline(parts[0]) + _chalk2['default'].magenta(' ("') + parts[1].replace(_configRegexp.MATCH_TAGS_DELIMITER, _chalk2['default'].magenta(' ««')) + _chalk2['default'].magenta('»» ")') + '.');

        return;
    }

    console.log('  ' + _chalk2['default'].green(commandName.toUpperCase()) + ': ' + text);
};

var printError = function printError(commandName, text) {
    print(commandName, _chalk2['default'].red.underline.bold('ERROR ->') + ' ' + _chalk2['default'].red(text));
};

var printBlank = function printBlank() {
    return console.log('');
};

exports.print = print;
exports.printBlank = printBlank;
exports.printError = printError;
exports.printHeader = printHeader;
exports.printBanner = printBanner;

//# sourceMappingURL=out.js.map