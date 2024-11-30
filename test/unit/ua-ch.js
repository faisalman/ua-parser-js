const assert = require('assert');
const { UAParser } = require('../../src/main/ua-parser');

describe('Browser naming adjustments', () => {

    it('Google Chrome => Chrome', () => {
        const headers = {
            'sec-ch-ua' : '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
        };
        const { browser } = UAParser(headers).withClientHints();
        assert.strictEqual(browser.name, 'Chrome');
    });

    it('Microsoft Edge => Edge', () => {
        const headers = {
            'sec-ch-ua' : '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
        };
        const { browser } = UAParser(headers).withClientHints();
        assert.strictEqual(browser.name, 'Edge');
    });

    it('Android WebView => Chrome WebView', () => {
        const headers = {
            'sec-ch-ua' : '"Android WebView";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        };
        const { browser } = UAParser(headers).withClientHints();
        assert.strictEqual(browser.name, 'Chrome WebView');
    });

    it('HeadlessChrome => Chrome Headless', () => {
        const headers = {
            'sec-ch-ua' : '"Chromium";v="124", "HeadlessChrome";v="124", "Not-A.Brand";v="99"',
        };
        const { browser } = UAParser(headers).withClientHints();
        assert.strictEqual(browser.name, 'Chrome Headless');
    });
});