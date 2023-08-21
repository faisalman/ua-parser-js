// @ts-check
import { test, expect } from '@playwright/test';
import { unfreezeUA } from '@ua-parser-js/helpers';

test('test for unfreezeUA() method', async ({ page }) => {
    

    await page.addInitScript(() => {
        Object.defineProperty(navigator, 'userAgentData', {
            value: {
                brands: [],
                platform: 'Windows',
                mobile: false,
                getHighEntropyValues: () => {
                    return Promise.resolve({
                        architecture: 'x86',
                        bitness: '64',
                        fullVersionList: [
                            {
                                brand: 'New Browser',
                                version: '110.1.2.3'
                            },
                            {
                                brand: 'Chromium',
                                version: '110.1.2.3'
                            },
                            {
                                brand: 'Not(A:Brand',
                                version: '110'
                            }
                        ],
                        platform: 'Windows',
                        platformVersion: '0.3'
                    });
                }
            }
        });
        Object.defineProperty(navigator, 'userAgent', {
            value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Safari/537.36'
        });
    });
    await page.goto('about:blank');
    await page.addScriptTag({ path: './src/helpers/ua-parser-helpers.js' });
    // @ts-ignore
    const ua = await page.evaluate(async () => await unfreezeUA());
    expect(ua).toBe('Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) New Browser/110.1.2.3 Chromium/110.1.2.3 Safari/537.36');
});