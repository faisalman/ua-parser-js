# `withClientHints():Promise<IData>|Thenable<IData>|IData`

Recently, Chrome limits the information that exposed through user-agent and introduces a new experimental set of data called ["Client Hints"↗](https://developer.mozilla.org/en-US/docs/Web/API/User-Agent_Client_Hints_API). 

Chrome also sends this client-hints data by default under `Sec-CH-UA-*` HTTP headers in each request, along with the legacy `User-Agent` HTTP header. In server-side development, you can capture this extra information by passing the `req.headers` to `UAParser()` (see examples below). 

In browser-environment, obtaining the client-hints data via JavaScript must be done in an asynchronous way. You can chain the result object from `get*` method with `withClientHints()` to also read the client-hints data from the browser which will return the updated data in a `Promise`.

::: info 
In Node.js or in browser-environment without client-hints support (basically anything that's not Chromium-based), `withClientHints()` will return the updated data as a new object instead of as a `Promise`.
:::

## Code Example

### Client-side Example

```js
(async function () {  
    const ua = new UAParser();

    // get browser data from user-agent only :
    let browser = ua.getBrowser();
    console.log('Using User-Agent: ', browser);

    // get browser data from client-hints 
    // (with user-agent as a fallback) :
    browser = await ua.getBrowser().withClientHints();
    console.log('Using Client-Hints: ', browser);
})();
```
```js
// alternatively without async-await:
const ua = new UAParser();

ua.getBrowser().withClientHints().then(function (browser) {
    console.log('Using Client-Hints: ', browser);
});
```

### Server-side Example

```js
// Suppose we got a request having these HTTP headers: 
const request = {
    headers : {
        'user-agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',

        'sec-ch-ua-mobile' : '?1',
        'sec-ch-ua-model' : 'Galaxy S3 Marketing',
        'sec-ch-ua-platform' : 'Android'
    }
};

// parse only "user-agent" header
const result1 = UAParser(request.headers);

// also use "sec-ch-ua" headers, in addition to "user-agent"
const result2 = UAParser(request.headers).withClientHints();    

console.log(result1.os.name);       // "Linux"
console.log(result1.device.type);   // undefined
console.log(result1.device.model);  // undefined

console.log(result2.os.name);       // "Android"
console.log(result2.device.type);   // "mobile"
console.log(result2.device.model);  // "Galaxy S3 Marketing"

new UAParser(request.headers)
        .getBrowser()
        .withClientHints()
        .then((browser) => {
    console.log(browser.toString());    // Chrome 110.0.0.0 
});
```