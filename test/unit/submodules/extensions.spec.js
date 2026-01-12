const fs = require('fs');
const assert = require('assert');
const parseJS = require('@babel/parser').parse;
const traverse = require('@babel/traverse').default;
const safe = require('safe-regex');
const { UAParser } = require('../../../src/main/ua-parser');
const { Bots, CLIs, Crawlers, Emails, Fetchers, InApps, Libraries, Vehicles } = require('../../../src/extensions/ua-parser-extensions');
const { BrowserType, OSName, Extension } = require('../../../src/enums/ua-parser-enums');
const { CLI, Crawler, Email, Fetcher, Library } = Extension.BrowserName;

describe('Extensions', () => {
    [   
        ['CLIs', 'cli', CLIs], 
        ['Crawlers', 'crawler', Crawlers], 
        ['Emails', 'email', Emails], 
        ['Fetchers', 'fetcher', Fetchers],
        ['InApps', 'inapp', InApps],
        ['Libraries', 'library', Libraries],
        ['Vehicles', 'vehicle', Vehicles]
    ]
    .forEach(([desc, path, ext]) => {
        const tests = require(`../../data/ua/extension/${path}.json`);
        describe(desc, () => {
            tests.forEach((test) => {
                it(`Can detect ${test.desc}: "${test.ua}"`, () => {
                    const { browser, device } = UAParser(test.ua, ext);
                    if ('browser' in ext) {
                        assert.strictEqual(String(browser.name), test.expect.name);
                        assert.strictEqual(String(browser.version), test.expect.version);
                        assert.strictEqual(String(browser.type), test.expect.type);
                    } else if ('device' in ext) {
                        assert.strictEqual(String(device.vendor), test.expect.vendor);
                        assert.strictEqual(String(device.model), test.expect.model);
                        assert.strictEqual(String(device.type), test.expect.type);
                    }
                });
            });
        });
    });

    // Existing test cases
    const outlook = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; Microsoft Outlook 16.0.9126; Microsoft Outlook 16.0.9126; ms-office; MSOffice 16)';
    const thunderbird = 'Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Thunderbird/78.13.0';
    const axios = 'axios/1.3.5';
    const jsdom = 'Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/20.0.3';
    const scrapy = 'Scrapy/1.5.0 (+https://scrapy.org)';

    // New test cases for updated Regex logic
    const macOutlook = 'MacOutlook/16.61.22041701 (Intel Mac OS X 10.15.7)';
    const yahooMobile = 'YahooMobile/1.0 (mail; 3.0.5.1311380)';

    assert.equal(UAParser(scrapy, Bots).browser.name, Library.SCRAPY);

    const emailParser = new UAParser(Emails);
    
    // Verify Standard Outlook
    assert.deepEqual(emailParser.setUA(outlook).getBrowser(), {name: Email.MICROSOFT_OUTLOOK, version: "16.0.9126", major: "16", type: BrowserType.EMAIL});
    
    // Verify Thunderbird
    assert.deepEqual(emailParser.setUA(thunderbird).getBrowser(), {name: Email.THUNDERBIRD, version: "78.13.0", major: "78", type: BrowserType.EMAIL});

    // Verify New MacOutlook Logic (Distinguishing it from Windows Outlook)
    assert.deepEqual(emailParser.setUA(macOutlook).getBrowser(), {name: Email.MICROSOFT_OUTLOOK_MAC, version: "16.61.22041701", major: "16", type: BrowserType.EMAIL});

    // Verify Yahoo Mobile Logic (Tightened Regex)
    // Note: We expect 'Yahoo Mail' (Email.YAHOO_MAIL) because of the normalization helper.
    assert.deepEqual(emailParser.setUA(yahooMobile).getBrowser(), {name: Email.YAHOO_MAIL, version: "1.0", major: "1", type: BrowserType.EMAIL});

    const libraryParser = new UAParser(Libraries);
    assert.deepEqual(libraryParser.setUA(axios).getBrowser(), {name: Library.AXIOS, version: "1.3.5", major: "1", type: BrowserType.LIBRARY});
    assert.deepEqual(libraryParser.setUA(jsdom).getBrowser(), {name: Library.JSDOM, version: "20.0.3", major: "20", type: BrowserType.LIBRARY});
    assert.deepEqual(libraryParser.setUA(scrapy).getBrowser(), {name: Library.SCRAPY, version: "1.5.0", major: "1", type: BrowserType.LIBRARY});

    // Bluesky
    const bluesky = 'Mozilla/5.0 (compatible; Bluesky Cardyb/1.1; +mailto:support@bsky.app)';
    assert.deepEqual(new UAParser(bluesky, Bots).getBrowser(), {
        name: Fetcher.BLUESKY,
        version: '1.1',
        major: '1',
        type: BrowserType.FETCHER
    });

    const whatsapp = "WhatsApp/2.0 A";
    assert.deepEqual(new UAParser(whatsapp, Fetchers).getOS(), {
        name : OSName.ANDROID,
        version : undefined
    });
});

describe('Merge', () => {
    it('Can merge multiple extensions', () => {
        const wget = 'Wget/1.21.1';
        const facebookBot = 'Mozilla/5.0 (compatible; FacebookBot/1.0; +https://developers.facebook.com/docs/sharing/webmasters/facebookbot/)';

        // try merging crawlers & CLIs
        const crawlersAndCLIs = { browser : [...Crawlers.browser, ...CLIs.browser]};
        const crawlersAndCLIsParser = new UAParser(crawlersAndCLIs);
        assert.deepEqual(crawlersAndCLIsParser.setUA(wget).getBrowser(), {name: CLI.WGET, version: "1.21.1", major: "1", type: BrowserType.CLI});
        assert.deepEqual(crawlersAndCLIsParser.setUA(facebookBot).getBrowser(), {name: Crawler.META_FACEBOOKBOT, version: "1.0", major: "1", type: BrowserType.CRAWLER});

        // alternative merge options
        const crawlersAndCLIsParser2 = new UAParser([Crawlers, CLIs]);
        const crawlersAndCLIsParser3 = new UAParser(facebookBot, [Crawlers, CLIs]);
        assert.deepEqual(crawlersAndCLIsParser2.setUA(wget).getBrowser(), {name: CLI.WGET, version: "1.21.1", major: "1", type: BrowserType.CLI});
        assert.deepEqual(crawlersAndCLIsParser3.getBrowser(), {name: Crawler.META_FACEBOOKBOT, version: "1.0", major: "1", type: BrowserType.CRAWLER});
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