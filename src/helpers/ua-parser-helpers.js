///////////////////////////////////////////////
/*  Helpers for UAParser.js v2.0.4
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    AGPLv3 License */
//////////////////////////////////////////////

/*jshint esversion: 6 */ 

const { UAParser } = require('../main/ua-parser');
const { CPU, OS, Engine } = require('../enums/ua-parser-enums');
const { Bots } = require('../extensions/ua-parser-extensions');
const { isFromEU } = require('detect-europe-js');
const { isFrozenUA } = require('ua-is-frozen');
const { isStandalonePWA } = require('is-standalone-pwa');

const toResult = (value, head, ext) => typeof value === 'string' ? UAParser(value, head, ext) : value;

const getDeviceVendor = (model) => UAParser(`Mozilla/5.0 (Linux; Android 10; ${model}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36`).device.vendor;

const isAppleSilicon = (resultOrUA) => {
    const res = toResult(resultOrUA);
    if (res.os.is(OS.MACOS)) {
        if (res.cpu.is(CPU.ARM)) {
            return true;
        }
        if (typeof resultOrUA !== 'string' && typeof window !== 'undefined') {
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

const isAIBot = (resultOrUA) => [

    // AI2
    'ai2bot',

    // Amazon
    'amazonbot',

    // Anthropic
    'anthropic-ai',
    'claude-web',
    'claudebot',

    // Apple
    'applebot',
    'applebot-extended',

    // ByteDance
    'bytespider',

    // Common Crawl
    'ccbot',

    // DataForSeo
    'dataforseobot',

    // Diffbot
    'diffbot',

    // Google
    'googleother',
    'googleother-image',
    'googleother-video',
    'google-extended',

    // Hive AI
    'imagesiftbot',

    // Huawei
    'petalbot',

    // Meta
    'facebookbot',
    'meta-externalagent',

    // OpenAI
    'gptbot',
    'oai-searchbot',

    // Perplexity
    'perplexitybot',

    // Semrush
    'semrushbot-ocob',

    // Timpi
    'timpibot',

    // Velen.io
    'velenpublicwebcrawler',

    // Webz.io
    'omgili',
    'omgilibot',
    'webzio-extended',

    // You.com
    'youbot',

    // Zhipu AI
    'chatglm-spider',

    // Zyte
    'scrapy'

    ].includes(String(toResult(resultOrUA, Bots).browser.name).toLowerCase());

const isBot = (resultOrUA) => [
    'cli', 
    'crawler', 
    'fetcher', 
    'library'
    ].includes(toResult(resultOrUA, Bots).browser.type);

const isChromeFamily = (resultOrUA) => toResult(resultOrUA).engine.is(Engine.BLINK);

const isElectron = () => !!(process?.versions?.hasOwnProperty('electron') ||    // node.js
                            / electron\//i.test(navigator?.userAgent));         // browser

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