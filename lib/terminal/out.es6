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
import {
    MATCH_DELIMITER, 
    MATCH_TAGS_DELIMITER 
} from '../config/regexp';

let printBanner = () => {

    // TODO: move this to a banner.txt or something.
    console.log( "     _,");
    console.log( "    /(_");
    console.log( "   |   '-._        . ' ." );
    console.log( "   \\    ,-.)      -= * =-" );
    console.log( "    \\((` .(        '/. '" );
    console.log( "     )\\  _/        /" );
    console.log( "  .-'   '--.      /" );
    console.log( "  \\,         \\   /| ");
    console.log( "   ';,_) _)'\\ \\,//" );
    console.log( "" );
};

let printHeader = ( text ) => {
    console.log( chalk.green( text.toUpperCase() ) );
};

let print = ( commandName, text ) => {
    let parts = text.split( MATCH_DELIMITER );

    if ( parts.length >= 2 ) {
        console.log(
            '  ' +
            chalk.green( commandName.toUpperCase() ) + ': ' +
            chalk.underline( parts[ 0 ] ) +
            chalk.magenta(' ("') + ( parts[ 1 ].replace( MATCH_TAGS_DELIMITER, '' ) ) + chalk.magenta('")') + '.'
        );

        return;
    }

    console.log(
        '  ' +
        chalk.green( commandName.toUpperCase() ) +
        ': ' +
        text
    );
};

let printError = ( commandName, text ) => {
    print( commandName,
        chalk.red.underline.bold( 'ERROR ->' ) +
        ' ' +
        chalk.red( text )
    );
};

let printBlank = () => console.log( '' );

export { print, printBlank, printError, printHeader, printBanner };
