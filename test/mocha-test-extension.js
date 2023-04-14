const assert = require('assert');
const safeRegex = require('safe-regex');
const UAParser = require('ua-parser-js');
const { Bots, Emails, CLI } = require('ua-parser-js/extensions');

describe('Bots', () => {
    it('Can detect bots', () => {
        const googleBot = 'Googlebot-Video/1.0';
        const msnBot = 'msnbot-media/1.1 (+http://search.msn.com/msnbot.htm)';
        const bingPreview = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534+ (KHTML, like Gecko) BingPreview/1.0b';
        const opera = 'Opera/8.5 (Macintosh; PPC Mac OS X; U; en)';
        const wget = 'Wget/1.21.1';
        const facebookBot = 'Mozilla/5.0 (compatible; FacebookBot/1.0; +https://developers.facebook.com/docs/sharing/webmasters/facebookbot/)';
        const outlook = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; Microsoft Outlook 16.0.9126; Microsoft Outlook 16.0.9126; ms-office; MSOffice 16)';
        const thunderbird = 'Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Thunderbird/78.13.0';

        const botParser = new UAParser(Bots);
        assert.deepEqual(botParser.setUA(googleBot).getBrowser(), {name: "Googlebot-Video", version: "1.0", major: "1", type: "bot"});
        assert.deepEqual(botParser.setUA(msnBot).getBrowser(), {name: "msnbot-media", version: "1.1", major: "1", type: "bot"});
        assert.deepEqual(botParser.setUA(bingPreview).getBrowser(), {name: "BingPreview", version: "1.0b", major: "1", type: "bot"});
        assert.deepEqual(botParser.setUA(opera).getBrowser(), {name: "Opera", version: "8.5", major: "8"});

        // try merging Bots & CLIs
        const botsAndCLIs = { browser : [...Bots.browser, ...CLI.browser]};
        const botsAndCLIsParser = new UAParser(botsAndCLIs);
        assert.deepEqual(botsAndCLIsParser.setUA(wget).getBrowser(), {name: "Wget", version: "1.21.1", major: "1", type:"cli"});
        assert.deepEqual(botsAndCLIsParser.setUA(facebookBot).getBrowser(), {name: "FacebookBot", version: "1.0", major: "1", type:"bot"});

        const emailParser = new UAParser(Emails);
        assert.deepEqual(emailParser.setUA(outlook).getBrowser(), {name: "Microsoft Outlook", version: "16.0.9126", major: "16", type: "email"});
        assert.deepEqual(emailParser.setUA(thunderbird).getBrowser(), {name: "Thunderbird", version: "78.13.0", major: "78", type: "email"});
    });
});

// TODO : move test spec to JSON file
// TODO : check for safe-regex