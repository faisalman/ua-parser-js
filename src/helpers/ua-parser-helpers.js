///////////////////////////////////////////////
/*  Helpers for UAParser.js v2.0.9
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    UAParser.js PRO Enterprise License */
//////////////////////////////////////////////

/*jshint esversion: 6 */ 

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

/**
 * Translates a raw Outlook User-Agent name/version into a 
 * Developer-friendly Edition (e.g., "Outlook 2019 (Modern Word)").
 */
const getOutlookEdition = (name, version) => {
    if (!name || !version) return name;
    const cleanName = name.toLowerCase().replace(/microsoft\s+/, '');
    
    // 1. Handle Mac Separately (Different Rendering Engine)
    if (cleanName === 'macoutlook') {
        const major = parseInt(version.split('.')[0], 10);
        if (major >= 16) return "Outlook for Mac (Modern)";
        return "Outlook for Mac (Legacy)";
    }

    // 2. Handle Windows Outlook
    if (cleanName === 'outlook') {
        const parts = version.split('.').map(Number);
        const major = parts[0];
        const build = parts[2] || 0; // Build number is usually the 3rd part

        // Pre-2016 Versions (Clear Major Version mapping)
        if (major === 15) return "Outlook 2013";
        if (major === 14) return "Outlook 2010";
        if (major === 12) return "Outlook 2007";
        if (major < 12)   return "Outlook (Legacy)";

        // The Version 16.0 Confusion
        if (major === 16) {
            // Build < 10000 = MSI (Volume License 2016/2019)
            // These render poorly (No SVG, older bugs)
            if (build < 10000) {
                return "Outlook 2016 (MSI / Volume License)";
            }
            // Build >= 10000 = Click-to-Run (Retail 2016 / 2019 / 365)
            // These render well (SVG support, modern CSS)
            return "Outlook 365 / 2019+ (Modern)";
        }
    }

    // 3. Fallback for 'Outlook Express' or 'New Outlook' (Browser)
    return name;
};

module.exports = { 
    getDeviceVendor,
    isAppleSilicon,
    isAIBot,
    isBot,
    isChromeFamily,
    isElectron,
    isFromEU,
    isFrozenUA,
    isStandalonePWA,
    getOutlookEdition
}