'use strict';

import chalk from 'chalk';

let printHeader = (text) => {
    console.log(
        chalk.white.bgBlue('««sif»»') + chalk.white.bgGreen(text.toUpperCase())
    )
};

export {printHeader} ;
