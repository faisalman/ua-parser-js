const assert = require('assert');
const { UAParser } = require('../../src/main/ua-parser');
const { BrowserName, CPUArch, DeviceType, DeviceVendor, EngineName, OSName } = require('../../src/enums/ua-parser-enums');
const UACHTests = require('../data/ua-ch/headers');

describe('Map UA-CH headers', () => {

    const headers = {
        'sec-ch-ua' : '"Chromium";v="93", "Google Chrome";v="93", " Not;A Brand";v="99"',
        'sec-ch-ua-full-version-list' : '"Chromium";v="93.0.1.2", "Google Chrome";v="93.0.1.2", " Not;A Brand";v="99.0.1.2"',
        'sec-ch-ua-arch' : '"arm"',
        'sec-ch-ua-bitness' : '"64"',
        'sec-ch-ua-mobile' : '?1',
        'sec-ch-ua-model' : '"Pixel 99"',
        'sec-ch-ua-platform' : '"Windows"',
        'sec-ch-ua-platform-version' : '"13"',
        'user-agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
    };
    
    let uap = UAParser(headers).withClientHints();
    let browser = new UAParser(headers).getBrowser().withClientHints();
    let cpu = new UAParser(headers).getCPU().withClientHints();
    let device = new UAParser(headers).getDevice().withClientHints();
    let engine = new UAParser(headers).getEngine().withClientHints();
    let os = new UAParser(headers).getOS().withClientHints();

    it('Can read from client-hints headers using `withClientHints()`', () => {  

        assert.strictEqual(uap.ua, "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36");
        assert.strictEqual(uap.browser.name, BrowserName.CHROME);
        assert.strictEqual(uap.browser.version, "93.0.1.2");
        assert.strictEqual(uap.browser.major, "93");        
        assert.strictEqual(browser.name, BrowserName.CHROME);
        assert.strictEqual(browser.version, "93.0.1.2");
        assert.strictEqual(browser.major, "93");
        assert.strictEqual(uap.cpu.architecture, CPUArch.ARM_64);
        assert.strictEqual(cpu.architecture, CPUArch.ARM_64);
        assert.strictEqual(uap.device.type, DeviceType.MOBILE);
        assert.strictEqual(uap.device.model, "Pixel 99");
        assert.strictEqual(uap.device.vendor, DeviceVendor.GOOGLE);
        assert.strictEqual(device.type, DeviceType.MOBILE);
        assert.strictEqual(device.model, "Pixel 99");
        assert.strictEqual(device.vendor, DeviceVendor.GOOGLE);
        assert.strictEqual(uap.engine.name, EngineName.BLINK);
        assert.strictEqual(uap.engine.version, '93.0.1.2');
        assert.strictEqual(engine.name, EngineName.BLINK);
        assert.strictEqual(engine.version, '93.0.1.2');
        assert.strictEqual(uap.os.name, OSName.WINDOWS);
        assert.strictEqual(uap.os.version, "11");
        assert.strictEqual(os.name, OSName.WINDOWS);
        assert.strictEqual(os.version, "11");
    });

    it('Only read from user-agent header when called without `withClientHints()`', () => { 

        uap = UAParser(headers);
        browser = new UAParser(headers).getBrowser();
        cpu = new UAParser(headers).getCPU();
        device = new UAParser(headers).getDevice();
        engine = new UAParser(headers).getEngine();
        os = new UAParser(headers).getOS();

        assert.strictEqual(uap.browser.name, BrowserName.CHROME);
        assert.strictEqual(uap.browser.version, "110.0.0.0");
        assert.strictEqual(uap.browser.major, "110");
        assert.strictEqual(uap.cpu.architecture, CPUArch.X86_64);
        assert.strictEqual(uap.device.type, undefined);
        assert.strictEqual(uap.device.model, undefined);
        assert.strictEqual(uap.device.vendor, undefined);
        assert.strictEqual(uap.engine.name, EngineName.BLINK);
        assert.strictEqual(uap.engine.version, '110.0.0.0');
        assert.strictEqual(uap.os.name, OSName.LINUX);
        assert.strictEqual(uap.os.version, undefined);
    });

    it('Fallback to user-agent header when using `withClientHints()` but found no client hints-related headers',  () => {  

        const headers2 = {
            'sec-ch-ua-mobile' : '?1',
            'user-agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
        };
        
        uap = UAParser(headers2).withClientHints();

        assert.strictEqual(uap.browser.name, BrowserName.CHROME);
        assert.strictEqual(uap.browser.version, "110.0.0.0");
        assert.strictEqual(uap.browser.major, "110");
        assert.strictEqual(uap.cpu.architecture, CPUArch.X86_64);
        assert.strictEqual(uap.device.type, DeviceType.MOBILE);
        assert.strictEqual(uap.device.model, undefined);
        assert.strictEqual(uap.device.vendor, undefined);
        assert.strictEqual(uap.engine.name, EngineName.BLINK);
        assert.strictEqual(uap.engine.version, '110.0.0.0');
        assert.strictEqual(uap.os.name, OSName.LINUX);
        assert.strictEqual(uap.os.version, undefined);
    });

    it('Can detect Apple silicon from client hints data', () => {  

        // https://github.com/faisalman/ua-parser-js/issues/489#issuecomment-1479213579
        const httpHeadersFromAppleSilicon = {
            'sec-ch-ua-arch' : 'arm',
            'sec-ch-ua-platform' : 'macOS',
            'sec-ch-ua-mobile' : '?0',
            'sec-ch-ua' : '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
            'user-agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:97.0) Gecko/20100101 Firefox/97.0'
        };
        
        UAParser(httpHeadersFromAppleSilicon).withClientHints().then(ua => {

            // Only works in Chrome
            /* 
                if (ua.os.is("macOS") && 
                    ua.cpu.is("arm") &&
                    !ua.device.is("mobile") && 
                    !ua.device.is("tablet")) {
                        // possibly an Apple silicon device
                    }
            */

            assert.strictEqual(ua.os.is(OSName.MACOS), true);
            assert.strictEqual(ua.cpu.is(CPUArch.ARM), true);            
            assert.strictEqual(ua.device.is(DeviceType.MOBILE), false);
            assert.strictEqual(ua.device.is(DeviceType.TABLET), false);
        });
    });

    it('Can detect form-factors from client-hints', () => {  

        const FFVR = {
            'sec-ch-ua-form-factors' : '"VR"'
        };

        const FFEInk = {
            'sec-ch-ua-form-factors' : '"Tablet", "EInk"'
        };

        const FFUnknown = {
            'sec-ch-ua-form-factors' : '"Unknown"'
        };
        
        UAParser(FFVR).withClientHints().then(ua => {
            assert.strictEqual(ua.device.type, DeviceType.XR);
        });

        UAParser(FFEInk).withClientHints().then(ua => {
            assert.strictEqual(ua.device.type, DeviceType.TABLET);
        });


        UAParser(FFUnknown).withClientHints().then(ua => {
            assert.strictEqual(ua.device.type, undefined);
        });
    });

    it('Avoid error on headers variation', () => {  

        const headers2 = {
            'sec-ch-ua' : '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            'sec-ch-ua-full-version-list' : '"Google Chrome", "Chromium", "Not?A_Brand";v="24.0.0.0"',
            'sec-ch-ua-full-version' : '""',
            'sec-ch-ua-mobile' : '?0',
            'sec-ch-ua-arch' : '""',
            'sec-ch-ua-bitness' : '""',
            'sec-ch-ua-model' : '""',
            'sec-ch-ua-platform' : '"Windows"',
            'sec-ch-ua-platform-version' : '""',
            'sec-ch-ua-wow64' : '?0',
        };
        
        uap = UAParser(headers2).withClientHints();

        assert.strictEqual(uap.browser.name, BrowserName.CHROME);
        assert.strictEqual(uap.browser.version, undefined);
        assert.strictEqual(uap.browser.major, undefined);
    });

    it('Prioritize more specific brand name regardless the order', () => {  

        const headers3a = {
            'sec-ch-ua-full-version-list' : '"Not_A Brand;v=8, Chromium;v=120.0.6099.131, Google Chrome;v=120.0.6099.132"'
        };
        const headers3b = {
            'sec-ch-ua-full-version-list' : '"Chromium;v=120.0.6099.131, Not_A Brand;v=8, Google Chrome;v=120.0.6099.132"'
        };
        const headers3c = {
            'sec-ch-ua-full-version-list' : '"Google Chrome;v=120.0.6099.132, Chromium;v=120.0.6099.131, Not_A Brand;v=8"'
        };
        const headers3d = {
            'sec-ch-ua-full-version-list' : '"Microsoft Edge;v=120.0.6099.133, Google Chrome;v=120.0.6099.132, Chromium;v=120.0.6099.131, Not_A Brand;v=8"'
        };
        const headers3e = {
            'sec-ch-ua-full-version-list' : '"Chromium;v=120.0.6099.131, Google Chrome;v=120.0.6099.132, Microsoft Edge;v=120.0.6099.133, Not_A Brand;v=8"'
        };
        const headers3f = {
            'sec-ch-ua-full-version-list' : '"Not_A Brand;v=8, Microsoft Edge;v=120.0.6099.133, Google Chrome;v=120.0.6099.132, Chromium;v=120.0.6099.131"'
        };
        
        uap = UAParser(headers3a).withClientHints();
        assert.strictEqual(uap.browser.name, BrowserName.CHROME);
        assert.strictEqual(uap.browser.version, "120.0.6099.132");

        uap = UAParser(headers3b).withClientHints();
        assert.strictEqual(uap.browser.name, BrowserName.CHROME);
        assert.strictEqual(uap.browser.version, "120.0.6099.132");

        uap = UAParser(headers3c).withClientHints();
        assert.strictEqual(uap.browser.name, BrowserName.CHROME);
        assert.strictEqual(uap.browser.version, "120.0.6099.132");

        uap = UAParser(headers3d).withClientHints();
        assert.strictEqual(uap.browser.name, BrowserName.EDGE);
        assert.strictEqual(uap.browser.version, "120.0.6099.133");

        uap = UAParser(headers3e).withClientHints();
        assert.strictEqual(uap.browser.name, BrowserName.EDGE);
        assert.strictEqual(uap.browser.version, "120.0.6099.133");

        uap = UAParser(headers3f).withClientHints();
        assert.strictEqual(uap.browser.name, BrowserName.EDGE);
        assert.strictEqual(uap.browser.version, "120.0.6099.133");
    });
});

describe('UA-CH Headers tests', () => {
    UACHTests.forEach(test => {
        it(`Test for ${test.desc}`, () => {
            const { browser } = UAParser(test.headers).withClientHints();
            assert.deepEqual(browser, test.expect.browser);
        });
    });
});

describe('Identify vendor & type of device from given model name', () => {
    [
        {
            model: '220733SG',
            expect: {
                vendor : DeviceVendor.XIAOMI,
                type : DeviceType.MOBILE
            }
        },
        {
            model: '5087Z',
            expect: {
                vendor : DeviceVendor.TCL,
                type : DeviceType.MOBILE
            }
        },
        {
            model: '9137W',
            expect: {
                vendor : DeviceVendor.TCL,
                type : DeviceType.TABLET
            }
        },
        {
            model: 'BE2015',
            expect: {
                vendor : DeviceVendor.ONEPLUS,
                type : DeviceType.MOBILE
            }
        },
        {
            model: 'CPH2389',
            expect: {
                vendor : DeviceVendor.ONEPLUS,
                type : DeviceType.MOBILE
            }
        },
        {
            model: 'Infinix X669C',
            expect: {
                vendor : DeviceVendor.INFINIX,
                type : DeviceType.MOBILE
            }
        },
        {
            model: 'itel L6502',
            expect: {
                vendor : DeviceVendor.ITEL,
                type : DeviceType.MOBILE
            }
        },
        {
            model: 'Lenovo TB-X606F',
            expect: {
                vendor : DeviceVendor.LENOVO,
                type : DeviceType.TABLET
            }
        },
        {
            model: 'LM-Q720',
            expect: {
                vendor : DeviceVendor.LG,
                type : DeviceType.MOBILE
            }
        },
        {
            model: 'M2003J15SC',
            expect: {
                vendor : DeviceVendor.XIAOMI,
                type : DeviceType.MOBILE
            }
        },
        {
            model: 'MAR-LX1A',
            expect: {
                vendor : DeviceVendor.HUAWEI,
                type : DeviceType.MOBILE
            }
        },
        {
            model: 'moto g(20)',
            expect: {
                vendor : DeviceVendor.MOTOROLA,
                type : DeviceType.MOBILE
            }
        },
        {
            model: 'Nokia C210',
            expect: {
                vendor : DeviceVendor.NOKIA,
                type : DeviceType.MOBILE
            }
        },
        {
            model: 'Pixel 8',
            expect: {
                vendor : DeviceVendor.GOOGLE,
                type : DeviceType.MOBILE
            }
        },
        {
            model: 'Redmi Note 9S',
            expect: {
                vendor : DeviceVendor.XIAOMI,
                type : DeviceType.MOBILE
            }
        },
        {
            model: 'RMX3830',
            expect: {
                vendor : DeviceVendor.REALME,
                type : DeviceType.MOBILE
            }
        },
        {
            model: 'SM-S536DL',
            expect: {
                vendor : DeviceVendor.SAMSUNG,
                type : DeviceType.MOBILE
            }
        },
        {
            model: 'SM-S546VL',
            expect: {
                vendor : DeviceVendor.SAMSUNG,
                type : DeviceType.MOBILE
            }
        },
        {
            model: 'SM-T875',
            expect: {
                vendor : DeviceVendor.SAMSUNG,
                type : DeviceType.TABLET
            }
        },
        {
            model: 'STK-L21',
            expect: {
                vendor : DeviceVendor.HUAWEI,
                type : DeviceType.MOBILE
            }
        },
        {
            model: 'T430W',
            expect: {
                vendor : DeviceVendor.TCL,
                type : DeviceType.MOBILE
            }
        },
        {
            model: 'TECNO KI5k',
            expect: {
                vendor : DeviceVendor.TECNO,
                type : DeviceType.MOBILE
            }
        },
        {
            model: 'vivo 1820',
            expect: {
                vendor : DeviceVendor.VIVO,
                type : DeviceType.MOBILE
            }
        },
        {
            model: 'Xbox',
            expect: {
                vendor : DeviceVendor.MICROSOFT,
                type : DeviceType.CONSOLE
            }
        }
    ]
    .forEach(test => {
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