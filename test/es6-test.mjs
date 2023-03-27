import { UAParser } from '../src/ua-parser.mjs'
import * as assert from 'assert'

describe('Returns', () => {
    it('getResult() should returns object', () => {
        assert.deepEqual(new UAParser('').getResult(), 
            {
                ua : '',
                ua_ch : { architecture: undefined, bitness: undefined, brands: undefined, fullVersionList: undefined, mobile: false, model: undefined, platform: undefined, platformVersion: undefined },
                browser: { name: undefined, version: undefined, major: undefined },
                cpu: { architecture: undefined },
                device: { vendor: undefined, model: undefined, type: undefined },
                engine: { name: undefined, version: undefined},
                os: { name: undefined, version: undefined }
        });
    });
});