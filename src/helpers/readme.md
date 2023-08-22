# @ua-parser-js/helpers

This package contains a collection of utility methods for [UAParser.js](https://github.com/faisalman/ua-parser-js)

```sh
npm i @ua-parser-js/helpers
```

### * `isFrozenUA(ua:string):boolean`

Check whether a user-agent string match with [frozen user-agent pattern](https://www.chromium.org/updates/ua-reduction/)

### * `unfreezeUA():Promise<string>`

Construct new unfreezed user-agent string using real data from client hints

### * `UACHParser(headers: object): object`

Parse client hints HTTP headers (sec-ch-ua) into its JS API equivalent

## Code Example

```js
import { isFrozenUA } from '@ua-parser-js/helpers';

const regularMobileUA = "Mozilla/5.0 (Linux; Android 9; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.1234.56 Mobile Safari/537.36";
const freezedMobileUA = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Mobile Safari/537.36";

console.log(isFrozenUA(regularMobileUA));
// false

console.log(isFrozenUA(freezedMobileUA));
// true
```

```js
import { unfreezeUA } from '@ua-parser-js/helpers';

/* 
    Suppose we're in a browser having this client hints data:
    
    {
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
        platformVersion: '13.0.0'
    }

    And a freezed user-agent:
    
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Safari/537.36'
*/

unfreezeUA()
    .then(ua => console.log(ua));
// 'Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) New Browser/110.1.2.3 Chromium/110.1.2.3 Safari/537.36'
```

```js
import { UACHParser } from '@ua-parser-js/helpers';

/* 
    Suppose we're in a server having this client hints data:

    const headers = {
        'sec-ch-ua' : '"Chromium";v="93", "Google Chrome";v="93", " Not;A Brand";v="99"',
        'sec-ch-ua-full-version-list' : '"Chromium";v="93.0.1.2", "Google Chrome";v="93.0.1.2", " Not;A Brand";v="99.0.1.2"',
        'sec-ch-ua-arch' : 'arm',
        'sec-ch-ua-bitness' : '64',
        'sec-ch-ua-mobile' : '?1',
        'sec-ch-ua-model' : 'Pixel 99',
        'sec-ch-ua-platform' : 'Linux',
        'sec-ch-ua-platform-version' : '13',
        'user-agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
    };
*/

const userAgentData = UACHParser(headers);

console.log(userAgentData);
/*
    {
        "architecture": "arm",
        "bitness": "64",
        "brands": [
            {
                "brand": "Chromium",
                "version": "93"
            },
            {
                "brand": "Google Chrome",
                "version": "93"
            },
            {
                "brand": " Not;A Brand",
                "version": "99"
            }
        ],
        "fullVersionList": [
            {
                "brand": "Chromium",
                "version": "93.0.1.2"
            },
            {
                "brand": "Google Chrome",
                "version": "93.0.1.2"
            },
            {
                "brand": " Not;A Brand",
                "version": "99.0.1.2"
            }
        ],
        "mobile": true,
        "model": "Pixel 99",
        "platform": "Linux",
        "platformVersion": "13"
    }
*/
```