const assert = require('assert');
const { UAParser } = require('../../../src/main/ua-parser');
const { isChromeFamily } = require('../../../src/browser-detection/browser-detection');

describe('isChromeFamily()', () => {
    it('Can detect Chromium-based browser', () => {
        
        const edge = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.2151.58';
        const firefox = 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0';

        assert.equal(isChromeFamily(UAParser(edge)), true);
        assert.equal(isChromeFamily(edge), true);
        assert.equal(isChromeFamily(UAParser(firefox)), false);
        assert.equal(isChromeFamily(firefox), false);
    });
});