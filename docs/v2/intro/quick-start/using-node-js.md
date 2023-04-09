# Using Node.js

```sh
$ npm install ua-parser-js
```

## Code Example

```js
var http = require('http');
var uap = require('ua-parser-js');

http.createServer(function (req, res) {
    // get user-agent header
    var ua = uap(req.headers['user-agent']);

    /* // BEGIN since@2.0 - you can also pass client-hints data to UAParser

    // note: only works in secure context (https:// or localhost or file://)

    var getHighEntropyValues = 'Sec-CH-UA-Full-Version-List, Sec-CH-UA-Mobile, Sec-CH-UA-Model, Sec-CH-UA-Platform, Sec-CH-UA-Platform-Version, Sec-CH-UA-Arch, Sec-CH-UA-Bitness';
    res.setHeader('Accept-CH', getHighEntropyValues);
    res.setHeader('Critical-CH', getHighEntropyValues);
    
    var ua = uap(req.headers).withClientHints();

    // END since@2.0 */

    // write the result as response
    res.end(JSON.stringify(ua, null, '  '));
})
.listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
```