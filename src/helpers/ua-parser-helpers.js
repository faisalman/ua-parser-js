///////////////////////////////////////////////
/*  Helpers for UAParser.js v2.0.0-rc.2
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    AGPLv3 License */
//////////////////////////////////////////////

/*jshint esversion: 6 */ 

const { UAParser } = require('../main/ua-parser');
const { CPU, OS, Engine } = require('../enums/ua-parser-enums');
const { isFromEU } = require('detect-europe-js');
const { isFrozenUA } = require('ua-is-frozen');
const { isStandalonePWA } = require('is-standalone-pwa');

const getDeviceVendor = (model) => UAParser(`Mozilla/5.0 (Linux; Android 10; ${model}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36`).device.vendor;

const isAppleSilicon = (res, useFeatureDetection) => {
    if (res.os.is(OS.MACOS)) {
        if (res.cpu.is(CPU.ARM)) {
            return true;
        }
        if (useFeatureDetection) {
            try {
                const canvas = document.createElement('canvas');
                const webgl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                const debug = webgl.getExtension('WEBGL_debug_renderer_info');
                const renderer = webgl.getParameter(debug.UNMASKED_RENDERER_WEBGL);
                if (renderer.match(/apple m\d/i)) {
                    return true;
                }
            } catch {
                return false;
            }
        }
    }
    return false;
}

const isBot = (res) => ['cli', 'crawler', 'fetcher', 'module'].includes(res.browser.type);

const isChromeFamily = (res) => res.engine.is(Engine.BLINK);

const isElectron = () => !!(process?.versions?.hasOwnProperty('electron') ||    // node.js
                            / electron\//i.test(navigator?.userAgent));         // browser

module.exports = { 
    getDeviceVendor,
    isAppleSilicon,
    isBot,
    isChromeFamily,
    isElectron,
    isFromEU,
    isFrozenUA,
    isStandalonePWA
}