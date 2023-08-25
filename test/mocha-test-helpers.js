const { isFrozenUA, unfreezeUA } = require('@ua-parser-js/user-agent-helpers');
const { UAClientHints } = require('@ua-parser-js/ua-client-hints');
const assert = require('assert');

describe('isFrozenUA()', () => {
    it('Returns whether a user agent is frozen', () => {

        const regularWindowsUA = "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.1234.56 Safari/537.36";
        const freezedWindowsUA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Safari/537.36";

        const regularMacUA = "";
        const freezedMacUA = "";

        const regularLinuxUA = "";
        const freezedLinuxUA = "";

        const regularCrOSUA = "";
        const freezedCrOSUA = "";

        const regularFuchsiaUA = "";
        const freezedFuchsiaUA = "";

	    const regularMobileUA = "Mozilla/5.0 (Linux; Android 9; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.1234.56 Mobile Safari/537.36";
        const freezedMobileUA = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Mobile Safari/537.36";

        const regularTabletUA = "Mozilla/5.0 (Linux; Android 9; SM-T810) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.1234.56 Safari/537.36";
        const freezedTabletUA = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Safari/537.36";

        assert.strictEqual(isFrozenUA(regularWindowsUA), false);
        assert.strictEqual(isFrozenUA(freezedWindowsUA), true);
        assert.strictEqual(isFrozenUA(regularMobileUA), false);
        assert.strictEqual(isFrozenUA(freezedMobileUA), true);
        assert.strictEqual(isFrozenUA(regularTabletUA), false);
        assert.strictEqual(isFrozenUA(freezedTabletUA), true);
    });
});

const headers = {
    'sec-ch-ua' : '"Chromium";v="93", "Google Chrome";v="93", " Not;A Brand";v="99"',
    'sec-ch-ua-full-version-list' : '"Chromium";v="93.0.1.2", "Google Chrome";v="93.0.1.2", " Not;A Brand";v="99.0.1.2"',
    'sec-ch-ua-arch' : '"arm"',
    'sec-ch-ua-bitness' : '"64"',
    'sec-ch-ua-mobile' : '?1',
    'sec-ch-ua-model' : '"Pixel 99"',
    'sec-ch-ua-platform' : '"Linux"',
    'sec-ch-ua-platform-version' : '"13"',
    'user-agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
};

describe('unfreezeUA()', () => {
    it('returns an unfreezed user-agent using real data from client hints HTTP headers (sec-ch-ua)', async () => {
        const unfreezed = await unfreezeUA(headers);
        assert.strictEqual(unfreezed, 'Mozilla/5.0 (X11; Linux arm64) AppleWebKit/537.36 (KHTML, like Gecko) Chromium/93.0.1.2 Chrome/93.0.1.2 Safari/537.36');
    });
});

describe('Parse CH Headers', () => {
    it('parse client hints HTTP headers (sec-ch-ua) into a client hints-like JavaScript object', () => {
        assert.deepEqual(new UAClientHints().setUAData(headers).getUAData(['architecture', 'bitness']), {
            "architecture": "arm",
            "bitness": "64"
        });
        assert.deepEqual(new UAClientHints().setUAData(headers).getUAData(), {
            "architecture": "arm",
            "bitness": "64",
            "brands": [
              {
                "brand": "Chromium",
                "version": "93"
              },
              {
                "brand": "Google Chrome",
                "version": "93"
              },
              {
                "brand": "Not;A Brand",
                "version": "99"
              }
            ],
            "fullVersionList": [
              {
                "brand": "Chromium",
                "version": "93.0.1.2"
              },
              {
                "brand": "Google Chrome",
                "version": "93.0.1.2"
              },
              {
                "brand": "Not;A Brand",
                "version": "99.0.1.2"
              }
            ],
            "formFactor": null,
            "mobile": true,
            "model": "Pixel 99",
            "platform": "Linux",
            "platformVersion": "13",
            "wow64": null
        });
    });
});