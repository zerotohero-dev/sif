#!/usr/bin/env node

'use strict';

/*    _,                           ,--.   ,---.
 *   /(_                    ,---.  `--'  /  .-'
 *  |   '-._       . ' .   (  .-'  ,--.  |  `-,
 *  \    ,-.)     -= * =- .-'  `)  |  |  |  .-'
 *   \((` .(       '/. '  `----'   `--'  `--'
 *    )\  _/       /         just like magic
 * .-'   '--.     /
 *',         \   /|
 * ';,_) _)'\ \,//    This program is distributed
 *  `\   (   '._/   under the terms of the MIT license.
 *   |  . '.
 *   |      \   Please see the `LICENSE.md` file for details.
 *   |  \|   |
 *    \  |  /    Send your comments and suggestions to…
 *     '.| /      <https://github.com/v0lkan/sif/issues>.
 */

import chalk from 'chalk';

let printBanner = () => {
    console.log("     _,");
    console.log("    /(_");
    console.log("   |   '-._       . ' .");
    console.log("   \\    ,-.)     -= * =-");
    console.log("    \\((` .(       '/. '");
    console.log("     )\\  _/       /");
    console.log("  .-'   '--.     /");
    console.log(" ',         \\   /|");
    console.log("  ';,_) _)'\\ \\,//");
    console.log("");
};

let printHeader = (text) => {
    console.log(
        chalk.white.bgGreen(text.toUpperCase())
    )
};

let print = (commandName, text) => {
    console.log('  ' + chalk.white.bgGreen(commandName.toUpperCase()) + ': ' + text);
};

let printBlank = () => {
    console.log('');
};

export {print, printHeader, printBanner, printBlank};
