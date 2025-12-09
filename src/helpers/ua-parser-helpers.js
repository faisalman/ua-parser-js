///////////////////////////////////////////////
/*  Helpers for UAParser.js v2.0.7
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    AGPLv3 License */
//////////////////////////////////////////////

/*jshint esversion: 6 */ 

const { UAParser } = require('../main/ua-parser');
const { EngineName } = require('../enums/ua-parser-enums');
const { getDeviceVendor: _getDeviceVendor, isAppleSilicon: _isAppleSilicon } = require('../device-detection/device-detection');
const { isBot: _isBot, isAICrawler } = require('../bot-detection/bot-detection');
const { isChromeFamily: _isChromeFamily, isElectron: _isElectron, isStandalonePWA: _isStandalonePWA } = require('../browser-detection/browser-detection');
const { isFromEU: _isFromEU } = require('../browser-detection/browser-detection');
const { isFrozenUA } = require('ua-is-frozen');

/**
 * @deprecated Moved to `device-detection` submodule
 */
const getDeviceVendor = _getDeviceVendor;

/**
 * @deprecated Moved to `device-detection` submodule
 */
const isAppleSilicon = _isAppleSilicon;

/**
 * @deprecated Moved to `bot-detection` submodule
 */
const isAIBot = isAICrawler;

/**
 * @deprecated Moved to `bot-detection` submodule
 */
const isBot = _isBot;

/**
 * @deprecated Moved to `browser-detection` submodule
 */
const isChromeFamily = _isChromeFamily;

/**
 * @deprecated Moved to `browser-detection` submodule
 */
const isElectron = () => _isElectron;

/**
 * @deprecated Moved to `browser-detection` submodule
 */
const isFromEU = _isFromEU;

/**
 * @deprecated Moved to `browser-detection` submodule
 */
const isStandalonePWA = _isStandalonePWA;

module.exports = { 
    getDeviceVendor,
    isAppleSilicon,
    isAIBot,
    isBot,
    isChromeFamily,
    isElectron,
    isFromEU,
    isFrozenUA,
    isStandalonePWA
}