// @ts-check
import { test, expect } from '@playwright/test';
import path from 'path';
import url from 'url';

test('read client hints data', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'userAgentData', { 
      value : {
        brands : [],
        platform : '',
        mobile : false,
        getHighEntropyValues : () => {
          return Promise.resolve({
            brands : [
              {
                brand : 'Chromium',
                version : '110'
              },
              {
                brand : 'Not(A:Brand',
                version : '110'
              },
              {
                brand : 'New Browser',
                version : '110'
              }
            ],
            platform : 'New OS'
          });
        }
      }
    });
  });

  const dirname = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '../');
  await page.goto(`file://${dirname}/dist/ua-parser.html`);

  // @ts-ignore
  const uap = await page.evaluate(async () => await UAParser().withClientHints());
  
  expect(uap).toHaveProperty('browser.name', 'New Browser');
  expect(uap).toHaveProperty('os.name', 'New OS');
});