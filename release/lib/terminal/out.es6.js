'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _configRegexp = require('../config/regexp');

var printBanner = function printBanner() {

    // TODO: move this to a banner.txt or something.
    console.log('     _,');
    console.log('    /(_');
    console.log('   |   \'-._        . \' .');
    console.log('   \\    ,-.)      -= * =-');
    console.log('    \\((` .(        \'/. \'');
    console.log('     )\\  _/        /');
    console.log('  .-\'   \'--.      /');
    console.log('  \\,         \\   /| ');
    console.log('   \';,_) _)\'\\ \\,//');
    console.log('');
};

var printHeader = function printHeader(text) {
    console.log(_chalk2['default'].white.bgGreen(text.toUpperCase()));
};

var print = function print(commandName, text) {
    var parts = text.split(_configRegexp.MATCH_DELIMITER);

    if (parts.length >= 2) {
        console.log('  ' + _chalk2['default'].white.bgGreen(commandName.toUpperCase()) + ': ' + _chalk2['default'].underline.black.bgYellow(parts[0]) + ' ("' + _chalk2['default'].cyan.bgBlack(parts[1]) + '").');

        return;
    }

    console.log('  ' + _chalk2['default'].white.bgGreen(commandName.toUpperCase()) + ': ' + text);
};

var printError = function printError(commandName, text) {
    print(commandName, _chalk2['default'].red.bold('ERROR ->') + ' ' + _chalk2['default'].black.bgRed(text));
};

var printBlank = function printBlank() {
    return console.log('');
};

exports.print = print;
exports.printBlank = printBlank;
exports.printError = printError;
exports.printHeader = printHeader;
exports.printBanner = printBanner;

//# sourceMappingURL=out.es6.js.map