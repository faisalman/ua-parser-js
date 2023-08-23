# @ua-parser-js/client-hints-helpers

This is a [UAParser.js](https://github.com/faisalman/ua-parser-js) module that contains a collection of utility methods for working with user-agent client-hints.

```sh
npm i @ua-parser-js/client-hints-helpers
```

### * `UACHParser(headers:object):object`

Parse user-agent client-hints HTTP headers (sec-ch-ua) into its JS API equivalent

## Code Example

```js
import { UACHParser } from '@ua-parser-js/client-hints-helpers';

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