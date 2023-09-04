const { UAClientHints } = require('../ua-client-hints');
const assert = require('assert');

describe('Parse CH Headers', () => {
    it('parse client hints HTTP headers (sec-ch-ua) into a client hints-like JavaScript object', () => {

        const req = {
            headers : {
            'sec-ch-ua' : '"Chromium";v="93", "Google Chrome";v="93", " Not;A Brand";v="99"',
            'sec-ch-ua-full-version-list' : '"Chromium";v="93.0.1.2", "Google Chrome";v="93.0.1.2", " Not;A Brand";v="99.0.1.2"',
            'sec-ch-ua-arch' : '"arm"',
            'sec-ch-ua-bitness' : '"64"',
            'sec-ch-ua-mobile' : '?1',
            'sec-ch-ua-model' : '"Pixel 99"',
            'sec-ch-ua-platform' : '"Linux"',
            'sec-ch-ua-platform-version' : '"13"',
            'user-agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
        }};

        assert.deepEqual(new UAClientHints().setUAData(req.headers).getUAData(['architecture', 'bitness']), {
            "architecture": "arm",
            "bitness": "64"
        });
        
        assert.deepEqual(new UAClientHints().setUAData(req.headers).getUAData(), {
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