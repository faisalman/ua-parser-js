const assert = require('assert');
const { UAParser } = require('../../src/main/ua-parser');
const { getDeviceVendor, isAppleSilicon, isAIBot, isBot, isChromeFamily } = require('../../src/helpers/ua-parser-helpers');
const { Bots, Emails } = require('../../src/extensions/ua-parser-extensions');

describe('getDeviceVendor', () => {
    it('Can guess the device vendor from a model name', () => {
        
        const modelSM = 'SM-A605G';
        const modelRedmi = 'Redmi Note 8';
        const modelNexus = 'Nexus 6P';
        const modelAquos = 'AQUOS-TVX19B';

        assert.equal(getDeviceVendor(modelSM), 'Samsung');
        assert.equal(getDeviceVendor(modelRedmi), 'Xiaomi');
        assert.equal(getDeviceVendor(modelNexus), 'Huawei');
        assert.equal(getDeviceVendor(modelAquos), 'Sharp');
    });
});

describe('isAppleSilicon', () => {
    it('Can detect Apple Silicon device', () => {
        
        // non-real ua
        const macARM = 'Mozilla/5.0 (Macintosh; ARM; Mac OS X 10.15; rv:97.0) Gecko/20100101 Firefox/97.0';
        const macIntel = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:97.0) Gecko/20100101 Firefox/97.0';

        assert.equal(isAppleSilicon(UAParser(macIntel)), false);
        assert.equal(isAppleSilicon(macIntel), false);
        assert.equal(isAppleSilicon(UAParser(macARM)), true);
        assert.equal(isAppleSilicon(macARM), true);
    });
});

describe('isAIBot', () => {
    it('Can detect AI Bots', () => {
        
        const claudeBot = 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)';
        const firefox = 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0';
        const searchGPT = 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot';
        const semrushAI = 'Mozilla/5.0 (compatible; SemrushBot-OCOB/1; +https://www.semrush.com/bot/)';

        assert.equal(isAIBot(UAParser(claudeBot, Bots)), true);
        assert.equal(isAIBot(claudeBot), true);
        assert.equal(isAIBot(firefox), false);
        assert.equal(isAIBot(searchGPT), true);
        assert.equal(isAIBot(semrushAI), true);
    });
});

describe('isBot', () => {
    it('Can detect Bots', () => {
        
        // non-real ua
        const ahrefsBot = 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)';
        const firefox = 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0';
        const scrapy = 'Scrapy/1.5.0 (+https://scrapy.org)';
        const thunderbird = 'Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Thunderbird/78.13.0';

        const botParser = new UAParser(firefox, { Bots, Emails });
        assert.equal(isBot(botParser.getResult()), false);
        assert.equal(isBot(botParser.setUA(ahrefsBot).getResult()), true);
        assert.equal(isBot(botParser.setUA(scrapy).getResult()), true);
        assert.equal(isBot(botParser.setUA(thunderbird).getResult()), false);

        assert.equal(isBot(ahrefsBot), true);
        assert.equal(isBot(firefox), false);
        assert.equal(isBot(scrapy), true);
        assert.equal(isBot(thunderbird), false);
    });
});

describe('isChromeFamily', () => {
    it('Can detect Chromium-based browser', () => {
        
        const edge = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.2151.58';
        const firefox = 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0';

        assert.equal(isChromeFamily(UAParser(edge)), true);
        assert.equal(isChromeFamily(UAParser(firefox)), false);
        assert.equal(isChromeFamily(edge), true);
        assert.equal(isChromeFamily(firefox), false);
    });
});