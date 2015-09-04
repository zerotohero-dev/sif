'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var printHeader = function printHeader(text) {
    console.log(_chalk2['default'].white.bgBlue('««sif»»') + _chalk2['default'].white.bgGreen(text.toUpperCase()));
};

exports.printHeader = printHeader;

//# sourceMappingURL=out.js.map