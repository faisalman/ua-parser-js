const fs = require('fs');
const assert = require('assert');
const parseJS = require('@babel/parser').parse;
const traverse = require('@babel/traverse').default;
const safe = require('safe-regex');
const { UAParser } = require('../../src/main/ua-parser');
const clis = require('../data/ua/extension/cli.json');
const crawlers = require('../data/ua/extension/crawler.json');
const emails = require('../data/ua/extension/email.json');
const fetchers = require('../data/ua/extension/fetcher.json');
const inapps = require('../data/ua/extension/inapp.json');
const libraries = require('../data/ua/extension/library.json');
const { Bots, CLIs, Crawlers, Emails, Fetchers, InApps, Libraries } = require('../../src/extensions/ua-parser-extensions');

describe('Extensions', () => {
    [   
        ['CLIs', clis, CLIs], 
        ['Crawlers', crawlers, Crawlers], 
        ['Emails', emails, Emails], 
        ['Fetchers', fetchers, Fetchers],
        ['InApps', inapps, InApps],
        ['Libraries', libraries, Libraries]
    ]
    .forEach((list) => {
        describe(list[0], () => {
            list[1].forEach((agent) => {
                it(`Can detect ${agent.desc}: "${agent.ua}"`, () => {
                    let browser = UAParser(agent.ua, list[2]).browser;
                    assert.strictEqual(String(browser.name), agent.expect.name);
                    assert.strictEqual(String(browser.version), agent.expect.version);
                    assert.strictEqual(String(browser.type), agent.expect.type);
                });
            });
        });
    });

    const outlook = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; Microsoft Outlook 16.0.9126; Microsoft Outlook 16.0.9126; ms-office; MSOffice 16)';
    const thunderbird = 'Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Thunderbird/78.13.0';
    const axios = 'axios/1.3.5';
    const jsdom = 'Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/20.0.3';
    const scrapy = 'Scrapy/1.5.0 (+https://scrapy.org)';

    assert.equal(UAParser(scrapy, Bots).browser.name, 'Scrapy');

    const emailParser = new UAParser(Emails);
    assert.deepEqual(emailParser.setUA(outlook).getBrowser(), {name: "Microsoft Outlook", version: "16.0.9126", major: "16", type: "email"});
    assert.deepEqual(emailParser.setUA(thunderbird).getBrowser(), {name: "Thunderbird", version: "78.13.0", major: "78", type: "email"});

    const libraryParser = new UAParser(Libraries);
    assert.deepEqual(libraryParser.setUA(axios).getBrowser(), {name: "axios", version: "1.3.5", major: "1", type: "library"});
    assert.deepEqual(libraryParser.setUA(jsdom).getBrowser(), {name: "jsdom", version: "20.0.3", major: "20", type: "library"});
    assert.deepEqual(libraryParser.setUA(scrapy).getBrowser(), {name: "Scrapy", version: "1.5.0", major: "1", type: "library"});

    // Bluesky
    const bluesky = 'Mozilla/5.0 (compatible; Bluesky Cardyb/1.1; +mailto:support@bsky.app)';
    assert.deepEqual(new UAParser(bluesky, Bots).getBrowser(), {
        name: 'Bluesky',
        version: '1.1',
        major: '1',
        type: 'fetcher'
    });
});

describe('Merge', () => {
    it('Can merge multiple extensions', () => {
        const wget = 'Wget/1.21.1';
        const facebookBot = 'Mozilla/5.0 (compatible; FacebookBot/1.0; +https://developers.facebook.com/docs/sharing/webmasters/facebookbot/)';

        // try merging crawlers & CLIs
        const crawlersAndCLIs = { browser : [...Crawlers.browser, ...CLIs.browser]};
        const crawlersAndCLIsParser = new UAParser(crawlersAndCLIs);
        assert.deepEqual(crawlersAndCLIsParser.setUA(wget).getBrowser(), {name: "Wget", version: "1.21.1", major: "1", type:"cli"});
        assert.deepEqual(crawlersAndCLIsParser.setUA(facebookBot).getBrowser(), {name: "FacebookBot", version: "1.0", major: "1", type:"crawler"});

        // alternative merge options
        const crawlersAndCLIsParser2 = new UAParser([Crawlers, CLIs]);
        const crawlersAndCLIsParser3 = new UAParser(facebookBot, [Crawlers, CLIs]);
        assert.deepEqual(crawlersAndCLIsParser2.setUA(wget).getBrowser(), {name: "Wget", version: "1.21.1", major: "1", type:"cli"});
        assert.deepEqual(crawlersAndCLIsParser3.getBrowser(), {name: "FacebookBot", version: "1.0", major: "1", type:"crawler"});
    });
});

describe('Testing the safety of regexes', () => {

    let regexes;
    let code = fs.readFileSync('src/extensions/ua-parser-extensions.js', 'utf8').toString();
    let ast = parseJS(code, { sourceType: 'script' });
    regexes = [];
    traverse(ast, {
        RegExpLiteral: (path) => {
            regexes.push(path.node.pattern);
        }
    });

    if (regexes.length === 0) {
        throw new Error('Regexes cannot be empty!');
    }

    describe('Checking for potentially vulnerable regex', () => {
        for (let regex of regexes) {
            it('Test against `safe-regex` : ' + regex, () => {
                assert.strictEqual(safe(regex), true);
            });
        }
    });
});