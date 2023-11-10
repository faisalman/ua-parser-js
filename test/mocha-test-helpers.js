const assert = require('assert');
const UAParser = require('ua-parser-js');
const { isAppleSilicon, isChromiumBased } = require('ua-parser-js/helpers');

describe('isAppleSilicon', () => {
    it('Can detect Apple Silicon device', () => {
        
        // non-real ua
        const macARM = 'Mozilla/5.0 (Macintosh; ARM; Mac OS X 10.15; rv:97.0) Gecko/20100101 Firefox/97.0';
        const macIntel = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:97.0) Gecko/20100101 Firefox/97.0';

        assert.equal(isAppleSilicon(UAParser(macIntel)), false);
        assert.equal(isAppleSilicon(UAParser(macARM)), true);
    });
});

describe('isChromiumBased', () => {
    it('Can detect Chromium-based browser', () => {
        
        const edge = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.2151.58';
        const firefox = 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0';

        assert.equal(isChromiumBased(UAParser(edge)), true);
        assert.equal(isChromiumBased(UAParser(firefox)), false);
    });
});