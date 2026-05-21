// GHSA-9h5v-pfqq-x599

const assert = require('assert');
const { UAParser } = require('../../src/main/ua-parser');

const headers = {
  'sec-ch-ua-platform': '"Android"',
  'sec-ch-ua-mobile': '?1',
  'sec-ch-ua-model': '"' + 'A '.repeat(25000) + '"'
};

const t0 = process.hrtime.bigint();
UAParser(headers).withClientHints();
const ms = Number(process.hrtime.bigint() - t0) / 1e6;

assert(ms < 100);