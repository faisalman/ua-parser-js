//////////////////////////////////////////////////////
/*  browser-detection submodule of UAParser.js v2.0.9
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    AGPLv3 License */
/////////////////////////////////////////////////////

/*jshint esversion: 6 */ 

const { UAParser } = require('../main/ua-parser');
const { EngineName } = require('../enums/ua-parser-enums');
const { isStandalonePWA } = require('is-standalone-pwa');
const { isFromEU } = require('detect-europe-js');

const isChromeFamily = val => !!(
    (typeof val === 'string' ? 
        new UAParser(val).getEngine() : 
        val.engine
    )?.is(EngineName.BLINK));

const isElectron = () => !!(
    // in node.js environment
    (typeof process !== 'undefined' && process.versions?.hasOwnProperty('electron')) ||
    // in browser environment
    (typeof navigator !== 'undefined' && / electron\//i.test(navigator.userAgent))
);

module.exports = { 
    isChromeFamily,
    isElectron,
    isFromEU,
    isStandalonePWA
}