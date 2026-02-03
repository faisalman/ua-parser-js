const assert = require('assert');
const { UAParser } = require('../../../src/main/ua-parser');
const { getDeviceVendor, isAppleSilicon } = require('../../../src/device-detection/device-detection');
const { DeviceVendor } = require('../../../src/enums/ua-parser-enums');

describe('getDeviceVendor()', () => {
    it('Can guess the device vendor from a model name', () => {
        
        const sm = 'SM-A605G';
        const redmi = 'Redmi Note 8';
        const nexus = 'Nexus 6P';
        const aquos = 'AQUOS-TVX19B';

        assert.equal(getDeviceVendor(sm), DeviceVendor.SAMSUNG);
        assert.equal(getDeviceVendor(redmi), DeviceVendor.XIAOMI);
        assert.equal(getDeviceVendor(nexus), DeviceVendor.HUAWEI);
        assert.equal(getDeviceVendor(aquos), DeviceVendor.SHARP);
    });
});

describe('isAppleSilicon()', () => {
    it('Can detect Apple Silicon device', () => {
        
        const macARM = 'Mozilla/5.0 (Macintosh; ARM; Mac OS X 10.15; rv:97.0) Gecko/20100101 Firefox/97.0';
        const macIntel = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:97.0) Gecko/20100101 Firefox/97.0';

        assert.equal(isAppleSilicon(UAParser(macIntel)), false);
        assert.equal(isAppleSilicon(macIntel), false);
        assert.equal(isAppleSilicon(UAParser(macARM)), true);
        assert.equal(isAppleSilicon(macARM), true);
    });
});