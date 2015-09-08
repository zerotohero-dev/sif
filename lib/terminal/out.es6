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
import chalk from 'chalk';

let printBanner = () => {
    console.log("     _,");
    console.log("    /(_");
    console.log("   |   '-._        . ' .");
    console.log("   \\    ,-.)      -= * =-");
    console.log("    \\((` .(        '/. '");
    console.log("     )\\  _/        /");
    console.log("  .-'   '--.      /");
    console.log("  \\,         \\   /|");
    console.log("   ';,_) _)'\\ \\,//");
    console.log("");
};

let printHeader = (text) => {
    console.log(
        chalk.white.bgGreen(text.toUpperCase())
    )
};

let print = (commandName, text) => {
    let parts = text.split(/\s*<::sif::>\s*/);

    if (parts.length >= 2) {
        console.log('  ' + chalk.white.bgGreen(commandName.toUpperCase()) + ': ' + chalk.underline.black.bgYellow(parts[0]) + ' ("' + chalk.cyan.bgBlack(parts[1]) + '").');

        return;
    }

    console.log('  ' + chalk.white.bgGreen(commandName.toUpperCase()) + ': ' + text);
};

let printError = (commandName, text) => {
    print(commandName, chalk.red.bold('ERROR ->') + ' ' + chalk.black.bgRed(text) )
};

let printBlank = () => {
    console.log('');
};

export {print, printHeader, printBanner, printBlank, printError};
