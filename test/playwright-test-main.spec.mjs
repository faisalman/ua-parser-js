import { test, expect } from '@playwright/test';
import path from 'path';
import url from 'url';

const localHtml = `file://${path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '../')}/dist/ua-parser.html`;

test.describe('test input', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(localHtml);
    });

    test('accept empty string', async ({ page }) => {
        // @ts-ignore
        const uap = await page.evaluate(async () => await UAParser(''));
        expect(uap).toHaveProperty('ua', '');
    });
});

test('read client hints data', async ({ page }) => {
    await page.addInitScript(() => {
        Object.defineProperty(navigator, 'userAgentData', {
            value: {
                brands: [],
                platform: '',
                mobile: false,
                getHighEntropyValues: () => {
                    return Promise.resolve({
                        brands: [
                            {
                                brand: 'Chromium',
                                version: '110'
                            },
                            {
                                brand: 'Not(A:Brand',
                                version: '110'
                            },
                            {
                                brand: 'New Browser',
                                version: '110'
                            }
                        ],
                        platform: 'New OS',
                        formFactors: 'New Form Factor'
                    });
                }
            }
        });
    });

    await page.goto(localHtml);

    // @ts-ignore
    const uap = await page.evaluate(async () => await UAParser().withClientHints());

    expect(uap).toHaveProperty('browser.name', 'New Browser');
    expect(uap).toHaveProperty('os.name', 'New OS');
    expect(uap).toHaveProperty('device.type', undefined);
});

test('detect Brave', async ({ page }) => {
    await page.addInitScript(() => {
        Object.defineProperty(navigator, 'brave', {
            value: {
                isBrave: () => true
            }
        });
    });

    await page.goto(localHtml);

    // @ts-ignore
    let uap = await page.evaluate(() => UAParser());
    expect(uap).toHaveProperty('browser.name', 'Chrome Headless');

    // @ts-ignore
    uap = await page.evaluate(() => UAParser().withFeatureCheck());
    expect(uap).toHaveProperty('browser.name', 'Brave');
});