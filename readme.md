<p align="center">
    <img src="https://raw.githubusercontent.com/faisalman/ua-parser-js/gh-pages/images/logo.png" width="256" height="256"> 
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

JavaScript library to detect Browser, Engine, OS, CPU, and Device type/model from User-Agent & Client-Hints data that can be used either in browser (client-side) or node.js (server-side).

* Author    : Faisal Salman <<f@faisalman.com>>
* Demo      : https://faisalman.github.io/ua-parser-js
* Source    : https://github.com/faisalman/ua-parser-js
* Documentation : https://faisalman.github.io/ua-parser-js-docs/v2

***

### From Our Sponsors:
<table>
<thead>
</thead>
<tbody>
<tr>
<td align="center" width="200px" rowspan="2"><a href="https://www.npmjs.com/package/@51degrees/ua-parser-js"><img src="images/51degrees.svg" alt="51degrees" width="75%" height="75%" ></a></td>
<td align="left" width="400px"><a href="https://www.npmjs.com/package/@51degrees/ua-parser-js">↗ @51degrees/ua-parser-js</a></td> 
</tr>
<tr>
<td><br/><p>UAParser.js has been upgraded to detect comprehensive device data based on the User-Agent and User-Agent Client Hints.</p><p>This package supports all device types including Apple and Android devices and can be used either in a browser (client-side) or Node.js environment (server-side).</p><p>Visit <a href="https://www.npmjs.com/package/@51degrees/ua-parser-js">↗ 51Degrees <u>UAParser</u></a> to get started.</p>
</td>
</tr>
<tr>
<td colspan="2">
<a href="https://opencollective.com/ua-parser-js">↗ Become a sponsor</a>
</td>
</tr>
</tbody>
</table>

---

# Version 2.0
What's new & breaking, please read [CHANGELOG](changelog.md) before upgrading.

# Documentation
### `UAParser([user-agent:string][,extensions:object][,headers:object(since@2.0)]):IData`

In browser environment you don't need to pass the user-agent string to the function, as it should automatically get the string from the `window.navigator.userAgent`. Whereas in nodejs environment, the user-agent string must be passed in order for the function to work (usually you can find the user-agent in: `request.headers["user-agent"]`).

## Constructor

#### * `new UAParser([user-agent:string][,extensions:object][,headers:object(since@2.0)]):UAParser`

When you call `UAParser` with the `new` keyword, `UAParser` will return a new instance with an empty result object, you have to call one of the available methods to get the information from the user-agent string.
Like so:

```js
let parser = new UAParser("your user-agent here"); // you need to pass the user-agent for nodejs
console.log(parser); // {}
let parserResults = parser.getResult();
console.log(parserResults);
/* 
  {
    ua      : "",
    browser : {},
    engine  : {},
    os      : {},
    device  : {},
    cpu     : {}
  } 
*/
```

#### * `UAParser([user-agent:string][,extensions:object][,headers:object(since@2.0)]):IData`

When you call `UAParser` without the `new` keyword, it will automatically call `getResult()` function and return the parsed results.

```sh
returns result object `{ ua: '', browser: {}, cpu: {}, device: {}, engine: {}, os: {} }`
```

## `UAParser`:

#### Methods table
The methods are self explanatory, here's a small overview on all the available methods:
 *  `getResult()` - returns all function object calls, user-agent string, browser info, cpu, device, engine, os:
`{ ua: '', browser: {}, cpu: {}, device: {}, engine: {}, os: {} }`.

 *  `getBrowser()`      - returns the browser name and version.
 *  `getDevice()`       - returns the device model, type, vendor.
 *  `getEngine()`       - returns the current browser engine name and version.
 *  `getOS()`           - returns the running operating system name and version.
 *  `getCPU()`          - returns CPU architectural design name.
 *  `getUA()`           - returns the user-agent string.
 *  `setUA(ua)`         - set a custom user-agent to be parsed.

---

#### * `getResult():IData`

```sh
returns `{ ua: '', browser: {}, cpu: {}, device: {}, engine: {}, os: {} }`
```

#### * `getBrowser():IData`

```sh
returns `{ name: '', version: '' }`

# Possible 'browser.name':
2345Explorer, 360 Browser, Amaya, Android Browser, Arora, Avant, Avast, AVG,
BIDUBrowser, Baidu, Basilisk, Blazer, Bolt, Brave, Bowser, Camino, Chimera,
[Mobile] Chrome [Headless/WebView], Chromium, Cobalt, Comodo Dragon, Dillo,
Dolphin, Doris, DuckDuckGo, Edge, Electron, Epiphany, Facebook, Falkon, Fennec, 
Firebird, [Mobile] Firefox [Focus/Reality], Flock, Flow, GSA, GoBrowser, HeyTap,
Huawei Browser, ICE Browser, IE, IEMobile, IceApe, IceCat, IceDragon, Iceweasel, 
Instagram, Iridium, Iron, Jasmine, Kakao[Story/Talk], K-Meleon, Kindle, Klar, 
Konqueror, LBBROWSER, Line, LinkedIn, Links, Lunascape, Lynx, MIUI Browser, 
Maemo Browser, Maemo, Maxthon, MetaSr Midori, Minimo, Mosaic, Mozilla, NetFront, 
NetSurf, Netfront, Netscape, NokiaBrowser, Obigo, Oculus Browser, OmniWeb, 
Opera Coast, Opera [Mini/Mobi/Tablet], PaleMoon, PhantomJS, Phoenix, Polaris, 
Puffin, QQ, QQBrowser, QQBrowserLite, Quark, QupZilla, RockMelt, [Mobile] Safari, 
Sailfish Browser, Samsung Browser, SeaMonkey, Silk, Skyfire, Sleipnir, Slim, 
SlimBrowser, Swiftfox, Tesla, TikTok, Tizen Browser, UCBrowser, UP.Browser, Viera, 
Vivaldi, Waterfox, WeChat, Weibo, Yandex, baidu, iCab, w3m, Whale Browser, ...

# 'browser.version' determined dynamically
```

#### * `getDevice():IData`

```sh
returns `{ model: '', type: '', vendor: '' }`

# Possible 'device.type':
console, mobile, tablet, smarttv, wearable, embedded

##########
# NOTE: 'desktop' is not a possible device type. 
# UAParser only reports info directly available from the UA string, which is not the case for 'desktop' device type.
# If you wish to detect desktop devices, you must handle the needed logic yourself.
# You can read more about it in this issue: https://github.com/faisalman/ua-parser-js/issues/182
##########

# Possible 'device.vendor':
Acer, Alcatel, Amazon, Apple, Archos, ASUS, AT&T, BenQ, BlackBerry, Dell,
Essential, Facebook, Fairphone, GeeksPhone, Google, HP, HTC, Huawei, Jolla, Kobo,
Lenovo, LG, Meizu, Microsoft, Motorola, Nexian, Nintendo, Nokia, Nvidia, OnePlus, 
OPPO, Ouya, Palm, Panasonic, Pebble, Polytron, Realme, RIM, Roku, Samsung, Sharp, 
Siemens, Sony[Ericsson], Sprint, Tesla, Vivo, Vodafone, Xbox, Xiaomi, Zebra, ZTE, ...

# 'device.model' determined dynamically
```

#### * `getEngine():IData`

```sh
returns `{ name: '', version: '' }`

# Possible 'engine.name'
Amaya, Blink, EdgeHTML, Flow, Gecko, Goanna, iCab, KHTML, LibWeb, Links, Lynx, 
NetFront, NetSurf, Presto, Tasman, Trident, w3m, WebKit

# 'engine.version' determined dynamically
```

#### * `getOS():IData`

```sh
returns `{ name: '', version: '' }`

# Possible 'os.name'
AIX, Amiga OS, Android[-x86], Arch, Bada, BeOS, BlackBerry, CentOS, Chromium OS,
Contiki, Fedora, Firefox OS, FreeBSD, Debian, Deepin, DragonFly, elementary OS, 
Fuchsia, Gentoo, GhostBSD, GNU, Haiku, HarmonyOS, HP-UX, Hurd, iOS, Joli, KaiOS, 
Linpus, Linspire,Linux, Mac OS, Maemo, Mageia, Mandriva, Manjaro, MeeGo, Minix, 
Mint, Morph OS, NetBSD, NetRange, NetTV, Nintendo, OpenBSD, OpenVMS, OS/2, Palm, 
PC-BSD, PCLinuxOS, Plan9, PlayStation, QNX, Raspbian, RedHat, RIM Tablet OS, 
RISC OS, Sabayon, Sailfish, SerenityOS, Series40, Slackware, Solaris, SUSE, Symbian, 
Tizen, Ubuntu, Unix, VectorLinux, Viera, watchOS, WebOS, Windows [Phone/Mobile], 
Zenwalk, ...

# 'os.version' determined dynamically
```

#### * `getCPU():IData`

```sh
returns `{ architecture: '' }`

# Possible 'cpu.architecture'
68k, amd64, arm[64/hf], avr, ia[32/64], irix[64], mips[64], pa-risc, ppc, sparc[64]
```

#### * `getUA():string`

```sh
returns user-agent string of current instance
```

#### * `setUA(ua:string):UAParser`

```sh
set user-agent string to be parsed
returns current instance
```

---

## `IData`: `since@2.0`

#### Methods table
The methods are self explanatory, here's a small overview on all the available methods:
 *  `is(value)`             - returns `true` if the passed value matches a value of current object, `false` otherwise
 *  `toString()`            - returns the full-name values of current object as a string
 *  `withClientHints()`     - returns an object with re-updated data from client hints
 *  `withFeatureCheck()`    - returns an object with re-updated data from feature detection

---

#### * `is(value:string):boolean`

```js
// Is just a shorthand comparison to check whether the value of specified item equals one of its properties (in a case-insensitive way)
// so that instead of write it using `==` operator like this:

let ua = UAParser();
let device = ua.device;
let os = ua.os;

if (device.type == "mobile" && os.name != "iOS") {}
if (device.type == "smarttv" || device.vendor == "Samsung") {}

// we can also write the comparison above into as follow:

if (device.is("mobile") && !os.is("iOS")) {}
if (device.is("SmartTV") || device.is("SaMsUnG")) {}

/*
    For device, properties will be checked in this particular order: type, model, vendor
*/

// Another examples:

let uap = new UAParser('Mozilla/5.0 (Mobile; Windows Phone 8.1; Android 4.0; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; NOKIA; Lumia 635) like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML, like Gecko) Mobile Safari/537');

uap.getBrowser().name;              // "IEMobile"
uap.getBrowser().is("IEMobile");    // true
uap.getCPU().is("ARM");             // true

uap.getOS().name;                   // "Windows Phone"
uap.getOS().is("Windows Phone");    // true

uap.getDevice();                    // { vendor: "Nokia", model: "Lumia 635", type: "mobile" }
uap.getResult().device;             // { vendor: "Nokia", model: "Lumia 635", type: "mobile" }

let device = uap.getDevice();
device.is("mobile");                // true
device.is("Lumia 635");             // true
device.is("Nokia");                 // true
device.is("iPhone");                // false
uap.getResult().device.is("Nokia"); // true
uap.getResult().device.model;       // "Lumia 635"

uap.setUA("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36");

let browser = uap.getBrowser();
browser.is("IEMobile");             // false 
browser.is("Chrome");               // true

uap.getResult().browser.is("Edge"); // false
uap.getResult().os.name             // "Mac OS"
uap.getResult().os.is("Mac OS");    // true
uap.getResult().os.version;         // "10.6.8"

let engine = uap.getEngine();
engine.is("Blink");                 // true
```

#### * `toString():string`

```js
// Retrieve full-name values as a string

/*
    Values will be concatenated following this pattern:
    * browser : name + version
    * cpu : architecture 
    * device : vendor + model
    * engine : name + version
    * os : name + version
*/

// Usage examples

let uap = new UAParser('Mozilla/5.0 (Mobile; Windows Phone 8.1; Android 4.0; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; NOKIA; Lumia 635) like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML, like Gecko) Mobile Safari/537');

uap.getDevice();                    // { 
                                    //    vendor: "Nokia", 
                                    //    model: "Lumia 635", 
                                    //    type: "mobile"
                                    // }
uap.getDevice().toString();         // "Nokia Lumia 635"

uap.getResult().os.name;            // "Windows Phone"
uap.getResult().os.version;         // "8.1"
uap.getResult().os.toString();      // "Windows Phone 8.1"

uap.setUA("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36");
uap.getBrowser().name;              // "Chrome"
uap.getBrowser().version;           // "28.0.1500.95"
uap.getBrowser().major;             // "28"
uap.getBrowser().toString();        // "Chrome 28.0.1500.95"

let engine = uap.getEngine();
engine.name;                        // "Blink"
engine.version;                     // "28.0.1500.95"
engine.toString();                  // "Blink 28.0.1500.95"
```

#### * `withClientHints():Promise<IData>|Thenable<IData>|IData`

Recently, Chrome limits the information exposed through user-agent and introduces a new experimental set of data called "client-hints". In browser-environment, obtaining the client-hints data via JavaScript must be done in an asynchronous way. In `UAParser` you can chain the result object from `get*` method with `withClientHints()` to also read the client-hints data from the browser and return the updated data as a `Promise`.

```js
// client-side example
(async function () {  
    let ua = new UAParser();

    // get browser data from user-agent only :
    let browser = ua.getBrowser();
    console.log('Using User-Agent: ', browser);

    // get browser data from client-hints (with user-agent as fallback) :
    browser = await ua.getBrowser().withClientHints();
    console.log('Using Client-Hints: ', browser);

    // alternatively :
    ua.getBrowser().withClientHints().then(function (browser) {
        console.log('Using Client-Hints: ', browser);
    });
})();
```

Along with `User-Agent` HTTP header, Chrome also sends this client-hints data by default under `Sec-CH-UA-*` HTTP headers in each request. In server-side development, you can capture this extra information by passing the `req.headers` to `UAParser()` (see examples below). When using `withClientHints()` in nodejs environment and browser without client-hints support (basically anything that's not Chromium-based), it will returns a new object with updated data.

```js
// server-side example

// Suppose we got a request having these HTTP headers: 
const request = {
    headers : {
        'user-agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',

        'sec-ch-ua-mobile' : '?1',
        'sec-ch-ua-model' : 'Galaxy S3 Marketing',
        'sec-ch-ua-platform' : 'Android'
    }
};

const result1 = UAParser(request.headers);                      // parse only "user-agent" header
const result2 = UAParser(request.headers).withClientHints();    // update with "sec-ch-ua" headers

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

#### * `withFeatureCheck():IData`

This method allows us to examine other features beyond `navigator.userAgent` to further improve detection of the following:
- browser : Brave (check for `navigator.isBrave`)
- device  : iPad (check for `navigator.standalone` & `navigator.maxTouchPoints`)

```js
// suppose this code runs on iPad
const withoutFeatureCheck = UAParser();
const withFeatureCheck = UAParser().withFeatureCheck();

console.log(withoutFeatureCheck.device); // { vendor : "Apple", model : "Macintosh", type : undefined }
console.log(withFeatureCheck.device);    // { vendor : "Apple", model : "iPad", type : "tablet" }
```

## Extending Regex

If you want to detect something that's not currently provided by UAParser.js (eg: `bots`, specific apps, etc), you can pass a list of regexes to extend internal UAParser.js regexes with your own.

* `UAParser([uastring,] extensions [,headers:object(since@2.0)])`

```js
// Example:
const myOwnListOfBrowsers = [
    [/(mybrowser)\/([\w\.]+)/i], [UAParser.BROWSER.NAME, UAParser.BROWSER.VERSION, ['type', 'bot']]
];

const myUA = 'Mozilla/5.0 MyBrowser/1.3';

let myParser = new UAParser({ browser: myOwnListOfBrowsers });

console.log(myParser.setUA(myUA).getBrowser());  // {name: "MyBrowser", version: "1.3", major: "1", type : "bot"}
console.log(myParser.getBrowser().is('bot'));    // true

// Another example:
const myOwnListOfDevices = [
    [/(mytab) ([\w ]+)/i], [UAParser.DEVICE.VENDOR, UAParser.DEVICE.MODEL, [UAParser.DEVICE.TYPE, UAParser.DEVICE.TABLET]],
    [/(myphone)/i], [UAParser.DEVICE.VENDOR, [UAParser.DEVICE.TYPE, UAParser.DEVICE.MOBILE]]
];

const myUA2 = 'Mozilla/5.0 MyTab 14 Pro Max';

let myParser2 = new UAParser({
    browser: myOwnListOfBrowsers,
    device: myOwnListOfDevices
});

console.log(myParser2.setUA(myUA2).getDevice());  // {vendor: "MyTab", model: "14 Pro Max", type: "tablet"}
```

Some basic extensions (although not very complete at the moment) can also be found under `ua-parser-js/extensions` submodule.

```js
import { UAParser } from 'ua-parser-js';
import { Emails } from 'ua-parser-js/extensions';

const browser = new UAParser(Emails)
                        .setUA('Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Thunderbird/78.13.0')
                        .getBrowser();

console.log(browser.name); // Thunderbird
```


# Usage

## Using HTML

```html
<!doctype html>
<html>
<head>
<script src="ua-parser.min.js"></script>
<script>

    var uap = new UAParser();
    console.log(uap.getResult());
    /*
        /// This will print an object structured like this:
        {
            ua: "",
            browser: {
                name: "",
                version: "",
                major: ""
            },
            engine: {
                name: "",
                version: ""
            },
            os: {
                name: "",
                version: ""
            },
            device: {
                model: "",
                type: "",
                vendor: ""
            },
            cpu: {
                architecture: ""
            }
        }
    */
    // Default result depends on current window.navigator.userAgent value

    // Now let's try a custom user-agent string as an example
    var uastring1 = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.2 (KHTML, like Gecko) Ubuntu/11.10 Chromium/15.0.874.106 Chrome/15.0.874.106 Safari/535.2";
    uap.setUA(uastring1);
    var result = uap.getResult();
    // You can also use UAParser constructor directly without having to create an instance:
    // var ua = UAParser(uastring1);

    console.log(result.browser);        // {name: "Chromium", version: "15.0.874.106"}
    console.log(result.device);         // {model: undefined, type: undefined, vendor: undefined}
    console.log(result.os);             // {name: "Ubuntu", version: "11.10"}
    console.log(result.os.version);     // "11.10"
    console.log(result.engine.name);    // "WebKit"
    console.log(result.cpu.architecture);   // "amd64"

    // Do some other tests
    var uastring2 = "Mozilla/5.0 (compatible; Konqueror/4.1; OpenBSD) KHTML/4.1.4 (like Gecko)";
    console.log(uap.setUA(uastring2).getBrowser().name); // "Konqueror"
    console.log(uap.getOS());                            // {name: "OpenBSD", version: undefined}
    console.log(uap.getEngine());                        // {name: "KHTML", version: "4.1.4"}

    var uastring3 = 'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 1.0.0; en-US) AppleWebKit/534.11 (KHTML, like Gecko) Version/7.1.0.7 Safari/534.11';
    console.log(uap.setUA(uastring3).getDevice().model); // "PlayBook"
    console.log(uap.getOS())                             // {name: "RIM Tablet OS", version: "1.0.0"}
    console.log(uap.getBrowser().name);                  // "Safari"

</script>
</head>
<body>
</body>
</html>
```

## Using node.js

Note: Device information is not available in the NodeJS environment.

```sh
$ npm install ua-parser-js
```

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

## Using ES Modules

```js
import { UAParser } from 'ua-parser-js';

const { browser, cpu, device } = UAParser('Mozilla/5.0 (X11; U; Linux armv7l; en-GB; rv:1.9.2a1pre) Gecko/20090928 Firefox/3.5 Maemo Browser 1.4.1.22 RX-51 N900');

console.log(browser.name);          // Maemo Browser
console.log(cpu.is('arm'));         // true
console.log(device.is('mobile'));   // true
console.log(device.model);          // N900
```

## Using TypeScript

```sh
$ npm install --save @types/ua-parser-js
# Download TS type definition from DefinitelyTyped repository:
# https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/ua-parser-js
```

## Using jQuery/Zepto ($.ua)

Although written in vanilla js, this library will automatically detect if jQuery/Zepto is present and create `$.ua` object (with values based on its User-Agent) along with `window.UAParser` constructor. To get/set user-agent you can use: `$.ua.get()` / `$.ua.set(uastring)`.

```js
// Say we are in a browser with default user-agent: 'Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; Sprint APA7373KT Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0':

// Get the details
console.log($.ua.device);           // {vendor: "HTC", model: "Evo Shift 4G", type: "mobile"}
console.log($.ua.os);               // {name: "Android", version: "2.3.4"}
console.log($.ua.os.name);          // "Android"
console.log($.ua.get());            // "Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; Sprint APA7373KT Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0"

// Now lets try to reset to another custom user-agent
$.ua.set('Mozilla/5.0 (Linux; U; Android 3.0.1; en-us; Xoom Build/HWI69) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13');

// Test again
console.log($.ua.browser.name);     // "Safari"
console.log($.ua.engine.name);      // "Webkit"
console.log($.ua.device);           // {vendor: "Motorola", model: "Xoom", type: "tablet"}
console.log(parseInt($.ua.browser.version.split('.')[0], 10));  // 4

// Add class to <body> tag
// <body class="ua-browser-safari ua-devicetype-tablet">
$('body').addClass('ua-browser-' + $.ua.browser.name + ' ua-devicetype-' + $.ua.device.type);
```

# Development

## Backers & Sponsors

<a href="https://opencollective.com/ua-parser-js"><img src="https://opencollective.com/ua-parser-js/organizations.svg?avatarHeight=64"></a>
<a href="https://opencollective.com/ua-parser-js"><img src="https://opencollective.com/ua-parser-js/individuals.svg?avatarHeight=64"></a>

<a href="https://www.paypal.me/faisalman/"><img src="https://cdn.rawgit.com/twolfson/paypal-github-button/1.0.0/dist/button.svg" height="40"></a>

## Contributors

<a href="https://github.com/faisalman/ua-parser-js/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=faisalman/ua-parser-js" />
</a>

Made with [contributors-img](https://contrib.rocks).

## How To Contribute

* Fork and clone this repository
* Make some changes as required
* Write unit test to showcase its functionality
* Run the test suites to make sure it's not breaking anything `$ npm test`
* Submit a pull request under `develop` branch

# License

MIT License

Copyright (c) 2012-2023 Faisal Salman <<f@faisalman.com>>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
