const assert = require('assert');
const { UAParser } = require('../../../src/main/ua-parser');
const { isAICrawler, isBot } = require('../../../src/bot-detection/bot-detection');
const { Bots, Emails } = require('../../../src/extensions/ua-parser-extensions');

describe('isAICrawler()', () => {
    it('Can detect AI Crawlers', () => {
        
        // AI Crawlers
        const claudeBot = 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)';
        const searchGPT = 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot';
        const semrushAI = 'Mozilla/5.0 (compatible; SemrushBot-OCOB/1; +https://www.semrush.com/bot/)';

        assert.equal(isAICrawler(claudeBot), true);
        assert.equal(isAICrawler(searchGPT), true);
        assert.equal(isAICrawler(semrushAI), true);

        // Non-AI Crawlers
        const firefox = 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0';

        assert.equal(isAICrawler(firefox), false);
    });
});

describe('isBot()', () => {
    it('Can detect general Bots', () => {
        
        // Bots
        const ahrefsBot = 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)';
        const scrapy = 'Scrapy/1.5.0 (+https://scrapy.org)';

        assert.equal(isBot(ahrefsBot), true);
        assert.equal(isBot(scrapy), true);

        // Non-bots
        const firefox = 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0';
        const thunderbird = 'Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Thunderbird/78.13.0';

        assert.equal(isBot(firefox), false);
        assert.equal(isBot(thunderbird), false);
    });
});