//////////////////////////////////////////////////
/*  bot-detection submodule of UAParser.js v2.0.7
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    AGPLv3 License */
/////////////////////////////////////////////////

/*jshint esversion: 6 */ 

const { UAParser } = require('../main/ua-parser');
const { Extension, BrowserType } = require('../enums/ua-parser-enums');
const { Bots, Crawlers } = require('../extensions/ua-parser-extensions');
const { Crawler } = Extension.BrowserName;

const BotTypesList = [
    BrowserType.CLI, 
    BrowserType.CRAWLER, 
    BrowserType.FETCHER, 
    BrowserType.LIBRARY
];

const AICrawlersList = [
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
];

const isAICrawler = ua => 
    AICrawlersList
        .map(s=>s.toLowerCase())
        .includes(
            (typeof ua === 'string' ? 
                new UAParser(ua, Crawlers).getBrowser() : 
                ua.browser
            ).name?.toLowerCase());

const isBot = ua => 
    BotTypesList
        .includes(
            (typeof ua === 'string' ? 
                new UAParser(ua, Bots).getBrowser() : 
                ua.browser
            ).type);

module.exports = { 
    isAICrawler,
    isBot
}