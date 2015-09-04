#!/usr/bin/env node

import program from 'commander';

import {printHeader as header} from './lib/out';

program.parse(process.argv);

header('alias');
