// Generated ESM version of ua-parser-js/helpers
// DO NOT EDIT THIS FILE!
// Source: /src/helpers/ua-parser-helpers.js

///////////////////////////////////////////////
/*  Helpers for UAParser.js v2.0.0
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    UAParser.js PRO Personal License */
//////////////////////////////////////////////

/*jshint esversion: 6 */ 

import { UAParser } from '../main/ua-parser.mjs';
import { CPU, OS, Engine } from '../enums/ua-parser-enums.mjs';
import { Bots } from '../extensions/ua-parser-extensions.mjs';
import { isFromEU } from 'detect-europe-js';
import { isFrozenUA } from 'ua-is-frozen';
import { isStandalonePWA } from 'is-standalone-pwa';

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

export { 
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