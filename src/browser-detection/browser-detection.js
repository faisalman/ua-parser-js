//////////////////////////////////////////////////////
/*  browser-detection submodule of UAParser.js v2.0.7
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    AGPLv3 License */
/////////////////////////////////////////////////////

/*jshint esversion: 6 */ 

const { UAParser } = require('../main/ua-parser');
const { isStandalonePWA } = require('is-standalone-pwa');
const { isFromEU } = require('detect-europe-js');

const isChromeFamily = val => !!(
    (typeof val === 'string' ? 
        new UAParser(val).getEngine() : 
        val.engine
    )?.is(EngineName.BLINK));

const isElectron = () => !!(process?.versions?.hasOwnProperty('electron') ||    // node.js
                            / electron\//i.test(navigator?.userAgent));         // browser

module.exports = { 
    isChromeFamily,
    isElectron,
    isFromEU,
    isStandalonePWA
}