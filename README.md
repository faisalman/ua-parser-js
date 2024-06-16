<p align="center">
    <a href="https://uaparser.dev"><img src="https://raw.githubusercontent.com/faisalman/ua-parser-js/gh-pages/images/uap-header.png"></a>
</p>

<p align="center">
<a href="https://www.npmjs.com/package/ua-parser-js"><img src="https://img.shields.io/npm/dw/ua-parser-js?color=red&logo=npm&label=NPM%20DOWNLOADS&style=for-the-badge"></a>
<a href="https://www.jsdelivr.com/package/npm/ua-parser-js"><img src="https://img.shields.io/jsdelivr/gh/hw/faisalman/ua-parser-js?logo=jsdelivr&style=for-the-badge"></a>
<a href="https://github.com/faisalman/ua-parser-js"><img src="https://img.shields.io/github/stars/faisalman/ua-parser-js?color=yellow&logo=github&style=for-the-badge"></a>
<a href="https://bundlephobia.com/package/ua-parser-js@1.0.35"><img src="https://img.shields.io/bundlephobia/minzip/ua-parser-js?logo=hackthebox&logoColor=white&style=for-the-badge"/></a>
<a href="https://github.com/faisalman/ua-parser-js/graphs/contributors"><img src="https://img.shields.io/github/contributors/faisalman/ua-parser-js?color=purple&logo=githubsponsors&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/ua-parser-js"><img src="https://img.shields.io/npm/v/ua-parser-js.svg?logo=npm&color=red&style=for-the-badge"></a>
<a href="https://cdnjs.com/libraries/UAParser.js"><img src="https://img.shields.io/cdnjs/v/UAParser.js.svg?color=orange&style=for-the-badge"></a>
<img src="https://img.shields.io/ossf-scorecard/github.com/faisalman/ua-parser-js?label=openssf%20scorecard&style=for-the-badge">
</p>

# UAParser.js

The most comprehensive, compact, & up-to-date isomorphic JavaScript library to detect 
user's Browser, Engine, OS, CPU, and Device type/model. Runs either in browser 
(client-side) or node.js (server-side).

# Overview

```js
import { UAParser } from 'ua-parser-js';

// 1. Problem: 
// Imagine getting this wild user-agent string from a visitor:
const ua = `Mozilla/5.0 (Linux; Android 10; STK-LX1 
Build/HONORSTK-LX1; wv) AppleWebKit/537.36 (KHTML, 
like Gecko) Version/4.0 Chrome/110.0.5481.153 Mobile 
Safari/537.36 musical_ly_2022803040 JsSdk/1.0 
NetType/WIFI Channel/huaweiadsglobal_int 
AppName/musical_ly app_version/28.3.4 ByteLocale/en 
ByteFullLocale/en Region/IQ Spark/1.2.7-alpha.8 
AppVersion/28.3.4 PIA/1.5.11 BytedanceWebview/d8a21c6`;
// Note: this is a real user-agent (what???)

// 2. Solution:
// Just pass the complex user-agent string to `UAParser`
const parser = new UAParser(ua);

// 3. Result:
// And voila!
console.log(parser.getBrowser());
// { name : "TikTok", version : "28.3.4", major : "28", type: undefined }

console.log(parser.getCPU());
// { architecture : undefined }

console.log(parser.getEngine());
// { name : "Blink", version : "110.0.5481.153" }

console.log(parser.getDevice());
// { type : "mobile", vendor : "Huawei", model : "STK-LX1" }

console.log(parser.getOS());
// { name : "Android", version : "10" }

console.log(parser.getResult());
/*
{
    ua: "Mozilla/5.0 (Linux; Android 10; STK-LX1 Build/HONORSTK-LX1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/110.0.5481.153 Mobile Safari/537.36 musical_ly_2022803040 JsSdk/1.0 NetType/WIFI Channel/huaweiadsglobal_int AppName/musical_ly app_version/28.3.4 ByteLocale/en ByteFullLocale/en Region/IQ Spark/1.2.7-alpha.8 AppVersion/28.3.4 PIA/1.5.11 BytedanceWebview/d8a21c6",
    browser: {
        name: "TikTok",
        version: "28.3.4",
        major: "28"
    },
    cpu: {},
    device: {
        type: "mobile",
        model: "STK-LX1",
        vendor: "Huawei"
    },
    engine: {
        name: "Blink",
        version: "110.0.5481.153"
    },
    os: {
        name: "Android",
        version: "10"
    }
}
*/

// 4. Conclusion:
// The visitor is browsing from a TikTok app using an Android-powered Huawei device
// Phew! Thanks, UAParser.js!
```

  * Live demo: https://uaparser.dev

# Documentation

  * v1.0: https://github.com/faisalman/ua-parser-js/tree/1.0.38#documentation
  * v2.0: https://docs.uaparser.dev

Before upgrading from `v0.7` / `v1.0`, please read [CHANGELOG](CHANGELOG.md) to 
see what's new & breaking.

# License Options

<table>
    <thead>
        <tr>
            <th></th>
            <th colspan="2">Open-Source Editions</th>
            <th colspan="3">PRO / Commercial Editions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>License options</td>
            <td>MIT (v1.x)</td>
            <td>AGPL (v2.x)</td>
            <td>PRO Personal</td>
            <td>PRO Business</td>
            <td>PRO Enterprise</td>
        </tr>
        <tr>
            <td>Browser detection</td>
            <td><strong title="Basic detection">⚠️</strong></td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>CPU detection</td>
            <td><strong title="Basic detection">⚠️</strong></td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>Device detection</td>
            <td><strong title="Basic detection">⚠️</strong></td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>Engine detection</td>
            <td><strong title="Basic detection">⚠️</strong></td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>OS detection</td>
            <td><strong title="Basic detection">⚠️</strong></td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>Enhanced detection</td>
            <td>⛔️</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>Client Hints support</td>
            <td>⛔️</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>Extras (Apps, Bots, Libs, Emails, Media Players, etc)</td>
            <td>⛔️</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>CommonJS support</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>ES modules support</td>
            <td>⛔️</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>npm module available</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>TypeScript declarations available</td>
            <td><strong title="Community version">⚠️</strong></td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>Allowed for commercial use</td>
            <td>✅</td>
            <td>✅</td>
            <td>⛔️</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>Permissive (non-copyleft) license</td>
            <td>✅</td>
            <td><strong title="Copyleft license">⛔️</strong></td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>Unlimited use per 1 license</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td><strong title="1 project per 1 license">⚠️</strong></td>
            <td>✅</td>
        </tr>
        <tr>
            <td>1-year support</td>
            <td>⛔️</td>
            <td>⛔️</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>Lifetime updates</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
        </tr>
        <tr>
            <td>Price</td>
            <td><strong title="Pay as you want">FREE (<a target="_blank" href="https://raw.githubusercontent.com/faisalman/ua-parser-js/1.0.x/license.md">License</a>)</strong></td>
            <td><strong title="Pay as you want">FREE (<a target="_blank" href="https://raw.githubusercontent.com/faisalman/ua-parser-js/master/LICENSE.md">License</a>)</strong></td>
            <td><strong title="$12 (one-time fee)">$12 (<a target="_blank" href="https://raw.githubusercontent.com/faisalman/ua-parser-js/pro-personal/LICENSE.md">License</a>)</strong></td>
            <td><strong title="$25 (one-time fee)">$25 (<a target="_blank" href="https://raw.githubusercontent.com/faisalman/ua-parser-js/pro-business/LICENSE.md">License</a>)</strong></td>
            <td><strong title="$500 (one-time fee)">$500 (<a target="_blank" href="https://raw.githubusercontent.com/faisalman/ua-parser-js/pro-enterprise/LICENSE.md">License</a>)</strong></td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th align="right" colspan="6">
                <a target="_blank" href="https://store.faisalman.com/checkout/buy/e236ea87-9b2b-400e-9683-24367f731b35"> GET THE PRO PACKAGES 📥</a>
            </th>
        </tr>
    </tfoot>
</table>

# Development

## Contributors

Please read [CONTRIBUTING](CONTRIBUTING.md) guide first for the instruction details.

<a href="https://github.com/faisalman/ua-parser-js/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=faisalman/ua-parser-js" />
</a>

Made with [contributors-img](https://contrib.rocks).

## Backers & Sponsors

<a href="https://opencollective.com/ua-parser-js"><img src="https://opencollective.com/ua-parser-js/organizations.svg?avatarHeight=64"></a>
<a href="https://opencollective.com/ua-parser-js"><img src="https://opencollective.com/ua-parser-js/individuals.svg?avatarHeight=64"></a>
