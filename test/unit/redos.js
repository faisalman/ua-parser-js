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

// Archos device regex: polynomial backtracking on a crafted User-Agent
const archosUA = 'archos '.repeat(15) + '1'.repeat(395);

const t1 = process.hrtime.bigint();
UAParser(archosUA);
const archosMs = Number(process.hrtime.bigint() - t1) / 1e6;

assert(archosMs < 100);

// Valid Archos UA still detected
const archos = UAParser('Mozilla/5.0 (Linux; Android 13; ARCHOS T101 FHD WiFi Build/T00624; wv) AppleWebKit/537.36').device;
assert.strictEqual(archos.vendor, 'Archos');
assert.strictEqual(archos.model, 'T101 FHD WiFi');
assert.strictEqual(archos.type, 'tablet');