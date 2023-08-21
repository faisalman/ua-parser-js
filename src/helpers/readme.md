# @ua-parser-js/helpers

This package contains a collection of utility methods for [UAParser.js](https://github.com/faisalman/ua-parser-js)

```sh
npm i @ua-parser-js/helpers
```

### * `isFrozenUA(ua:string):boolean`

Check whether a user-agent string match with [frozen user-agent pattern](https://www.chromium.org/updates/ua-reduction/)

### * `unfreezeUA():Promise<string>`

construct new unfreezed user-agent string using real data from client hints

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

unfreezeUA();

// 'Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) New Browser/110.1.2.3 Chromium/110.1.2.3 Safari/537.36'
```