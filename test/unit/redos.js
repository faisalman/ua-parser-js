const assert = require('assert');
const { UAParser } = require('../../src/main/ua-parser');

const MAX_MS = 100;

const elapsedMs = (fn) => {
    const start = process.hrtime.bigint();
    fn();
    return Number(process.hrtime.bigint() - start) / 1e6;
};

describe('ReDoS: crafted input should be parsed in linear time', () => {

    const cases = [

        // GHSA-9h5v-pfqq-x599
        {
            desc    : 'Client Hints `sec-ch-ua-model`',
            parse   : () => UAParser({
                'sec-ch-ua-platform'  : '"Android"',
                'sec-ch-ua-mobile'    : '?1',
                'sec-ch-ua-model'     : '"' + 'A '.repeat(25000) + '"'
            }).withClientHints()
        },

        // Archos (issue #855)
        {
            desc    : 'Archos device regex',
            parse   : () => UAParser('archos '.repeat(15) + '1'.repeat(395))
        },

        // Naver
        {
            desc    : 'Naver InApp browser regex',
            parse   : () => UAParser('naver('.repeat(28) + '1.1'.repeat(110))
        }
    ];

    cases.forEach(({ desc, parse }) => {
        it(`${desc} completes within ${MAX_MS}ms`, () => {
            assert(elapsedMs(parse) < MAX_MS);
        });
    });
});