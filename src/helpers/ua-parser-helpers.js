///////////////////////////////////////////////
/*  Helpers for UAParser.js v2.0.5
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    AGPLv3 License */
//////////////////////////////////////////////

/*jshint esversion: 6 */ 

const { UAParser } = require('../main/ua-parser');
const { CPUArch, OSName, EngineName, Extension, BrowserType } = require('../enums/ua-parser-enums');
const { Bots, Crawlers } = require('../extensions/ua-parser-extensions');
const { isFromEU } = require('detect-europe-js');
const { isFrozenUA } = require('ua-is-frozen');
const { isStandalonePWA } = require('is-standalone-pwa');
const { Crawler } = Extension.BrowserName;

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
    Crawler.AI2_BOT,

    // Amazon
    Crawler.AMAZON_BOT,

    // Anthropic
    Crawler.ANTHROPIC_AI,
    Crawler.ANTHROPIC_CLAUDE_BOT,
    Crawler.ANTHROPIC_CLAUDE_SEARCHBOT,
    Crawler.ANTHROPIC_CLAUDE_WEB,

    // Apple
    Crawler.APPLE_BOT,
    Crawler.APPLE_BOT_EXTENDED,

    // Brave
    Crawler.BRAVE_BOT,

    // ByteDance
    Crawler.BYTEDANCE_BYTESPIDER,
    Crawler.BYTEDANCE_TIKTOKSPIDER,

    // Cohere
    Crawler.COHERE_TRAINING_DATA_CRAWLER,

    // Common Crawl
    Crawler.COMMON_CRAWL_CCBOT,
    
    // Coveo
    Crawler.COVEO_BOT,

    // DataForSeo
    Crawler.DATAFORSEO_BOT,

    // DeepSeek
    Crawler.DEEPSEEK_BOT,

    // Diffbot
    Crawler.DIFFBOT,

    // Google
    Crawler.GOOGLE_EXTENDED,
    Crawler.GOOGLE_OTHER,
    Crawler.GOOGLE_OTHER_IMAGE,
    Crawler.GOOGLE_OTHER_VIDEO,
    Crawler.GOOGLE_CLOUDVERTEXBOT,

    // Hive AI
    Crawler.HIVE_IMAGESIFTBOT,

    // Huawei
    Crawler.HUAWEI_PETALBOT,
    Crawler.HUAWEI_PANGUBOT,

    // Hugging Face
    Crawler.HUGGINGFACE_BOT,

    // Kangaroo
    Crawler.KANGAROO_BOT,

    // Mendable.ai
    Crawler.FIRECRAWL_AGENT,

    // Meta
    Crawler.META_FACEBOOKBOT,
    Crawler.META_EXTERNALAGENT,

    // OpenAI
    Crawler.OPENAI_GPTBOT,
    Crawler.OPENAI_SEARCH_BOT,

    // Perplexity
    Crawler.PERPLEXITY_BOT,

    // Replicate
    Crawler.REPLICATE_BOT,

    // Runpod
    Crawler.RUNPOD_BOT,

    // SB Intuitions
    Crawler.SB_INTUITIONS_BOT,

    // Semrush
    Crawler.SEMRUSH_BOT_CONTENTSHAKE,

    // Timpi
    Crawler.TIMPI_BOT,

    // Together AI
    Crawler.TOGETHER_BOT,

    // Velen.io
    Crawler.HUNTER_VELENPUBLICWEBCRAWLER,

    // Vercel
    Crawler.VERCEL_V0BOT,

    // Webz.io
    Crawler.WEBZIO_OMGILI,
    Crawler.WEBZIO_OMGILI_BOT,
    Crawler.WEBZIO_EXTENDED,

    // X
    Crawler.XAI_BOT,

    // You.com
    Crawler.YOU_BOT,

    // Zhipu AI
    Crawler.ZHIPU_CHATGLM_SPIDER
    ]
    .map((s) => s.toLowerCase())
    .includes(String(toResult(resultOrUA, Crawlers).browser.name).toLowerCase());

const isBot = (resultOrUA) => [
    BrowserType.CLI, 
    BrowserType.CRAWLER, 
    BrowserType.FETCHER, 
    BrowserType.LIBRARY
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