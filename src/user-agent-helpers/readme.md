# @ua-parser-js/user-agent-helpers

This is a [UAParser.js](https://github.com/faisalman/ua-parser-js) module that contains a collection of utility methods for working with user-agent.

```sh
npm i @ua-parser-js/user-agent-helpers
```

### * `isFrozenUA(ua:string):boolean`

Check whether a user-agent string match with [frozen user-agent pattern](https://www.chromium.org/updates/ua-reduction/)

### * `unfreezeUA([ua:string,ch:object]|[headers:object]):Promise<string>`

Construct new unfreezed user-agent string using real data from client hints

## Code Example

```js
import { isFrozenUA } from '@ua-parser-js/user-agent-helpers';

const regularMobileUA = "Mozilla/5.0 (Linux; Android 9; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.1234.56 Mobile Safari/537.36";
const freezedMobileUA = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Mobile Safari/537.36";

console.log(isFrozenUA(regularMobileUA));
// false

console.log(isFrozenUA(freezedMobileUA));
// true
```

```js
import { unfreezeUA } from '@ua-parser-js/user-agent-helpers';

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
        platformVersion: '13.0.0',
        architecture: 'arm'
    }

    With a frozen user-agent:
    
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Safari/537.36'
*/

// Now let's generate a complete user-agent:
unfreezeUA()
    .then(newUA => console.log(newUA));
// 'Mozilla/5.0 (Windows NT 11.0; ARM) AppleWebKit/537.36 (KHTML, like Gecko) New Browser/110.1.2.3 Chromium/110.1.2.3 Safari/537.36'
```