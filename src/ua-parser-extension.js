///////////////////////////////////////////////
/*  Extensions for UAParser.js v2.0
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    MIT License */
//////////////////////////////////////////////

const UAParser = require("./ua-parser")

const Bots = Object.freeze({
    browser : [
        [/((?:google|bing|msn|facebook)bot(?:\-[imagevdo]{5})?|bingpreview)\/([\w\.]+)/i], [UAParser.BROWSER.NAME, UAParser.BROWSER.VERSION, ['type', 'bot']]
    ]
});

const Emails = Object.freeze({
    browser : [
        [/(microsoft outlook|thunderbird)[\s\/]([\w\.]+)/i], [UAParser.BROWSER.NAME, UAParser.BROWSER.VERSION, ['type', 'email']]
    ]
});

const Tools = Object.freeze({
    browser : [
        [/(wget|curl|lynx)\/([\w\.]+)/i], [UAParser.BROWSER.NAME, UAParser.BROWSER.VERSION, ['type', 'tool']]
    ]
});

module.exports = { 
    Bots,
    Emails,
    Tools
}