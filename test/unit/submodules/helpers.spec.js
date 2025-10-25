const assert = require('assert');
const { isFrozenUA } = require('../../../src/helpers/ua-parser-helpers');

describe('isFrozenUA()', () => {
    it('matches supplied user-agent string with known frozen user-agent pattern', () => {
    
        const regularMobileUA = "Mozilla/5.0 (Linux; Android 9; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.1234.56 Mobile Safari/537.36";
        const frozenMobileUA = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Mobile Safari/537.36";

        assert.equal(isFrozenUA(regularMobileUA), false);
        assert.equal(isFrozenUA(frozenMobileUA), true);
    });
});