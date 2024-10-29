///////////////////////////////////////////////
/*  Helpers for UAParser.js v2.0.0-rc.1
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    AGPLv3 License */
//////////////////////////////////////////////

/*jshint esversion: 6 */ 

const { CPU, OS, Engine } = require('../enums/ua-parser-enums');
const { UAParser } = require('../main/ua-parser');
const { isFromEU } = require('detect-europe-js');

const getDeviceVendor = (model) => UAParser(`Mozilla/5.0 (Linux; Android 10; ${model}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36`).device.vendor;

const isAppleSilicon = (res) => {
    if (res.os.is(OS.MACOS)) {
        if (res.cpu.is(CPU.ARM)) {
            return true;
        }
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
    return false;
}

const isChromeFamily = (res) => res.engine.is(Engine.BLINK);

const isElectron = () => !!(process?.versions?.hasOwnProperty('electron') ||    // node.js
                            / electron\//i.test(navigator?.userAgent));         // browser

const isFrozenUA = (ua) => /^Mozilla\/5\.0 \((Windows NT 10\.0; Win64; x64|Macintosh; Intel Mac OS X 10_15_7|X11; Linux x86_64|X11; CrOS x86_64 14541\.0\.0|Fuchsia|Linux; Android 10; K)\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) Chrome\/\d+\.0\.0\.0 (Mobile )?Safari\/537\.36/.test(ua);

const isStandalonePWA = () => window && (window.matchMedia('(display-mode: standalone)').matches || 
                                // iOS
                                navigator.standalone ||
                                // Android
                                document.referrer.startsWith('android-app://') ||
                                // Windows
                                window.Windows ||
                                /trident.+(msapphost|webview)\//i.test(navigator.userAgent) ||
                                document.referrer.startsWith('app-info://platform/microsoft-store'));

module.exports = { 
    getDeviceVendor,
    isAppleSilicon,
    isChromeFamily,
    isElectron,
    isFromEU,
    isFrozenUA,
    isStandalonePWA
}