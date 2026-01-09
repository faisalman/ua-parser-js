const assert = require('assert');
const { isFrozenUA, getOutlookEdition } = require('../../../src/helpers/ua-parser-helpers');

describe('isFrozenUA()', () => {
    it('matches supplied user-agent string with known frozen user-agent pattern', () => {
    
        const regularMobileUA = "Mozilla/5.0 (Linux; Android 9; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.1234.56 Mobile Safari/537.36";
        const frozenMobileUA = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Mobile Safari/537.36";

        assert.equal(isFrozenUA(regularMobileUA), false);
        assert.equal(isFrozenUA(frozenMobileUA), true);
    });
});

describe('getOutlookEdition()', () => {
    it('identifies Windows versions correctly', () => {
        // MSI Version (Older engine)
        assert.equal(getOutlookEdition('Microsoft Outlook', '16.0.4266.1001'), 'Outlook 2016 (MSI / Volume License)');
        // Click-to-Run (Modern engine)
        assert.equal(getOutlookEdition('Microsoft Outlook', '16.0.14326.20000'), 'Outlook 365 / 2019+ (Modern)');
        // Legacy Major Version
        assert.equal(getOutlookEdition('Microsoft Outlook', '15.0.4569.1506'), 'Outlook 2013');
    });

    it('identifies Mac versions correctly', () => {
        assert.equal(getOutlookEdition('MacOutlook', '16.61'), 'Outlook for Mac (Modern)');
        assert.equal(getOutlookEdition('MacOutlook', '15.4'), 'Outlook for Mac (Legacy)');
    });

    it('returns original name for unknown inputs', () => {
        assert.equal(getOutlookEdition('Thunderbird', '91.0'), 'Thunderbird');
    });
});