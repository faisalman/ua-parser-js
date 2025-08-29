///////////////////////////////////////////////
/*  Helpers for UAParser.js v2.0.4
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    AGPLv3 License */
//////////////////////////////////////////////

/*jshint esversion: 6 */ 

const { UAParser } = require('../main/ua-parser');
const { CPUArch, OSName, EngineName } = require('../enums/ua-parser-enums');
const { Bots } = require('../extensions/ua-parser-extensions');
const { isFromEU } = require('detect-europe-js');
const { isFrozenUA } = require('ua-is-frozen');
const { isStandalonePWA } = require('is-standalone-pwa');

const toResult = (value, head, ext) => typeof value === 'string' ? UAParser(value, head, ext) : value;

const getDeviceVendor = (model) => UAParser(`Mozilla/5.0 (Linux; Android 10; ${model}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36`).device.vendor;

const isAppleSilicon = (resultOrUA) => {
    const res = toResult(resultOrUA);
    if (res.os.is(OSName.MACOS)) {
        if (res.cpu.is(CPUArch.ARM)) {
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
    'claude-searchbot',
    'claudebot',

    // Apple
    'applebot',
    'applebot-extended',

    // Brave
    'bravebot',

    // ByteDance
    'bytespider',
    'tiktokspider',

    // Cohere
    'cohere-training-data-crawler',

    // Common Crawl
    'ccbot',
    
    // Coveo
    'coveobot',

    // DataForSeo
    'dataforseobot',

    // DeepSeek
    'deepseekbot',

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
    'pangubot',

    // Hugging Face
    'huggingface-bot',

    // Kangaroo
    'kangaroo bot',

    // Mendable.ai
    'firecrawlagent',

    // Meta
    'facebookbot',
    'meta-externalagent',

    // OpenAI
    'gptbot',
    'oai-searchbot',

    // Perplexity
    'perplexitybot',

    // Replicate
    'replicate-bot',

    // Runpod
    'runpod-bot',

    // Semrush
    'semrushbot-ocob',

    // Timpi
    'timpibot',

    // Together AI
    'together-bot',

    // Velen.io
    'velenpublicwebcrawler',

    // Vercel
    'v0bot',

    // Webz.io
    'omgili',
    'omgilibot',
    'webzio-extended',

    // X
    'xai-bot',

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

const isChromeFamily = (resultOrUA) => toResult(resultOrUA).engine.is(EngineName.BLINK);

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