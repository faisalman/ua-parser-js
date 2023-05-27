const { isFrozenUA } = require('ua-parser-js/helpers');
const assert = require('assert');

describe('isFrozenUA', () => {
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