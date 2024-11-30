const assert = require('assert');
const { UAParser } = require('../../src/main/ua-parser');

describe('Browser naming adjustments', () => {

    it('Google Chrome => Chrome', () => {
        const headers = {
            'sec-ch-ua' : '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
        };
        const { browser } = UAParser(headers).withClientHints();
        assert.strictEqual(browser.name, 'Chrome');
    });

    it('Microsoft Edge => Edge', () => {
        const headers = {
            'sec-ch-ua' : '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
        };
        const { browser } = UAParser(headers).withClientHints();
        assert.strictEqual(browser.name, 'Edge');
    });

    it('Android WebView => Chrome WebView', () => {
        const headers = {
            'sec-ch-ua' : '"Android WebView";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        };
        const { browser } = UAParser(headers).withClientHints();
        assert.strictEqual(browser.name, 'Chrome WebView');
    });

    it('HeadlessChrome => Chrome Headless', () => {
        const headers = {
            'sec-ch-ua' : '"Chromium";v="124", "HeadlessChrome";v="124", "Not-A.Brand";v="99"',
        };
        const { browser } = UAParser(headers).withClientHints();
        assert.strictEqual(browser.name, 'Chrome Headless');
    });
});

describe('Identify vendor & type of device from given model name', () => {

    [
        {
            model: '220733SG',
            expect: {
                vendor : 'Xiaomi',
                type : 'mobile'
            }
        },
        {
            model: '5087Z',
            expect: {
                vendor : 'TCL',
                type : 'mobile'
            }
        },
        {
            model: '9137W',
            expect: {
                vendor : 'TCL',
                type : 'tablet'
            }
        },
        {
            model: 'BE2015',
            expect: {
                vendor : 'OnePlus',
                type : 'mobile'
            }
        },
        {
            model: 'CPH2389',
            expect: {
                vendor : 'OPPO',
                type : 'mobile'
            }
        },
        {
            model: 'Infinix X669C',
            expect: {
                vendor : 'Infinix',
                type : 'mobile'
            }
        },
        {
            model: 'itel L6502',
            expect: {
                vendor : 'itel',
                type : 'mobile'
            }
        },
        {
            model: 'Lenovo TB-X606F',
            expect: {
                vendor : 'Lenovo',
                type : 'tablet'
            }
        },
        {
            model: 'LM-Q720',
            expect: {
                vendor : 'LG',
                type : 'mobile'
            }
        },
        {
            model: 'M2003J15SC',
            expect: {
                vendor : 'Xiaomi',
                type : 'mobile'
            }
        },
        {
            model: 'MAR-LX1A',
            expect: {
                vendor : 'Huawei',
                type : 'mobile'
            }
        },
        {
            model: 'moto g(20)',
            expect: {
                vendor : 'Motorola',
                type : 'mobile'
            }
        },
        {
            model: 'Nokia C210',
            expect: {
                vendor : 'Nokia',
                type : 'mobile'
            }
        },
        {
            model: 'Pixel 8',
            expect: {
                vendor : 'Google',
                type : 'mobile'
            }
        },
        {
            model: 'Redmi Note 9S',
            expect: {
                vendor : 'Xiaomi',
                type : 'mobile'
            }
        },
        {
            model: 'RMX3830',
            expect: {
                vendor : 'Realme',
                type : 'mobile'
            }
        },
        {
            model: 'SM-S536DL',
            expect: {
                vendor : 'Samsung',
                type : 'mobile'
            }
        },
        {
            model: 'SM-S546VL',
            expect: {
                vendor : 'Samsung',
                type : 'mobile'
            }
        },
        {
            model: 'SM-T875',
            expect: {
                vendor : 'Samsung',
                type : 'tablet'
            }
        },
        {
            model: 'STK-L21',
            expect: {
                vendor : 'Huawei',
                type : 'mobile'
            }
        },
        {
            model: 'T430W',
            expect: {
                vendor : 'TCL',
                type : 'mobile'
            }
        },
        {
            model: 'TECNO KI5k',
            expect: {
                vendor : 'TECNO',
                type : 'mobile'
            }
        },
        {
            model: 'vivo 1820',
            expect: {
                vendor : 'Vivo',
                type : 'mobile'
            }
        },
        {
            model: 'Xbox',
            expect: {
                vendor : 'Microsoft',
                type : 'console'
            }
        }
    ]
    .forEach((test) => {
        it(`Solve "${test.model}"`, () => {
            const headers = {
                'sec-ch-ua-model' : test.model,
            };
            const { device } = UAParser(headers).withClientHints();
            assert.strictEqual(device.model, test.model);
            assert.strictEqual(device.vendor, test.expect.vendor);
            assert.strictEqual(device.type, test.expect.type);
        });
    });
});