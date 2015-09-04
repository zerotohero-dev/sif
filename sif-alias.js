#!/usr/bin/env node
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _libOut = require('./lib/out');

_commander2['default'].parse(process.argv);

(0, _libOut.printHeader)('alias');

//# sourceMappingURL=sif-alias.js.map