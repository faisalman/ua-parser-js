const fs = require('fs');
const assert = require('assert');
const parseJS = require('@babel/parser').parse;
const traverse = require('@babel/traverse').default;
const safe = require('safe-regex');
const { UAParser } = require('../src/main/ua-parser');
const clis = require('./specs/browser-clis.json');
const crawlers = require('./specs/browser-crawlers.json');
const emails = require('./specs/browser-emails.json');
const fetchers = require('./specs/browser-fetchers.json');
const modules = require('./specs/browser-modules.json');
const { CLIs, Crawlers, Emails, Fetchers, Modules } = require('../src/extensions/ua-parser-extensions');

describe('Extensions', () => {
    [   
        ['CLIs', clis, CLIs], 
        ['Crawlers', crawlers, Crawlers], 
        ['Emails', emails, Emails], 
        ['Fetchers', fetchers, Fetchers],
        ['Modules', modules, Modules]
    ]
    .forEach((list) => {
        describe(list[0], () => {
            list[1].forEach((agent) => {
                it(`Can detect ${agent.desc}`, () => {
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

    const emailParser = new UAParser(Emails);
    assert.deepEqual(emailParser.setUA(outlook).getBrowser(), {name: "Microsoft Outlook", version: "16.0.9126", major: "16", type: "email"});
    assert.deepEqual(emailParser.setUA(thunderbird).getBrowser(), {name: "Thunderbird", version: "78.13.0", major: "78", type: "email"});

    const moduleParser = new UAParser(Modules);
    assert.deepEqual(moduleParser.setUA(axios).getBrowser(), {name: "axios", version: "1.3.5", major: "1", type: "module"});
    assert.deepEqual(moduleParser.setUA(jsdom).getBrowser(), {name: "jsdom", version: "20.0.3", major: "20", type: "module"});
    assert.deepEqual(moduleParser.setUA(scrapy).getBrowser(), {name: "Scrapy", version: "1.5.0", major: "1", type: "module"});
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

describe('Testing regexes', () => {

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