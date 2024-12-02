const assert = require('assert');
const { UAParser } = require('../../src/main/ua-parser');
const { isMobile, isSmartTV, isTablet, isWearable, isXR } = require('../../src/device-utils/ua-parser-device-utils');

describe('Device type check', () => {

    const advanM4 = 'Mozilla/5.0 (Linux; U; Android 6.0; ADVAN M4 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/44.0.2403.119 Mobile Safari/537.36 OPR/28.0.2254.119214';
    const galaxyWatch5 = 'Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-R925U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/3.2. Chrome/111.0.5563.116 Mobile Safari/537.36';
    const miTV = 'Mozilla/5.0 (Linux; Android 10; MiTV-MOOQ0 Build/QTG3.200305.006; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/94.0.4606.61 Mobile Safari/537.36';
    const nokiaT20 = 'Mozilla/5.0 (Linux; Android 11; Nokia T20 Build/RP1A.201005.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/93.0.4577.62 Safari/537.36';
    const questPro = 'Mozilla/5.0 (X11; Linux x86_64; Quest Pro) AppleWebKit/537.36 (KHTML, like Gecko) OculusBrowser/24.4.0.22.60.426469926 SamsungBrowser/4.0 Chrome/106.0.5249.181 VR Safari/537.36';

    it('isMobile()', () => {
        assert.strictEqual(isMobile(advanM4), true);
        assert.strictEqual(isMobile(galaxyWatch5), false);
        assert.strictEqual(isMobile(nokiaT20), false);
        assert.strictEqual(isMobile(miTV), false);

        const uaResult = UAParser(advanM4);
        const { device: uaDevice } = uaResult;
        assert.strictEqual(isMobile(uaResult), true);
        assert.strictEqual(isMobile(uaDevice), true);
        assert.strictEqual(isMobile(isMobile), false);
    });

    it('isSmartTV()', () => {
        assert.strictEqual(isSmartTV(nokiaT20), false);
        assert.strictEqual(isSmartTV(galaxyWatch5), false);
        assert.strictEqual(isSmartTV(miTV), true);
    });

    it('isTablet()', () => {
        assert.strictEqual(isTablet(nokiaT20), true);
        assert.strictEqual(isTablet(questPro), false);
    });

    it('isWearable()', () => {
        assert.strictEqual(isWearable(advanM4), false);
        assert.strictEqual(isWearable(galaxyWatch5), true);
        assert.strictEqual(isWearable(miTV), false);
    });

    it('isXR()', () => {
        assert.strictEqual(isXR(advanM4), false);
        assert.strictEqual(isXR(questPro), true);
    });
});
