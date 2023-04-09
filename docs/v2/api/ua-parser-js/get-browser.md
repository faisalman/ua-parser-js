# getBrowser():IData

Get browser name, full version, & major version from user-agent string.

```js
// Result object is structured as follow:
{ name: '', version: '', major: '' }
```

## `name:string`

```sh
# List of possible `browser.name`:
2345Explorer, 360 Browser, Amaya, Android Browser, Arora, 
Avant, Avast, AVG, BIDUBrowser, Baidu, Basilisk, Blazer, 
Bolt, Brave, Bowser, Camino, Chimera, [Mobile] Chrome 
[Headless/WebView], Chromium, Cobalt, Comodo Dragon, 
Dillo, Dolphin, Doris, DuckDuckGo, Edge, Electron, 
Epiphany, Facebook, Falkon, Fennec, Firebird, [Mobile] 
Firefox [Focus/Reality], Flock, Flow, GSA, GoBrowser, 
HeyTap, Huawei Browser, ICE Browser, IE, IEMobile, 
IceApe, IceCat, IceDragon, Iceweasel, Instagram, Iridium, 
Iron, Jasmine, Kakao[Story/Talk], K-Meleon, Kindle, Klar, 
Konqueror, LBBROWSER, Line, LinkedIn, Links, Lunascape, 
Lynx, MIUI Browser, Maemo Browser, Maemo, Maxthon, MetaSr,
Midori, Minimo, Mosaic, Mozilla, NetFront, NetSurf, 
Netfront, Netscape, NokiaBrowser, Obigo, Oculus Browser, 
OmniWeb, Opera Coast, Opera [Mini/Mobi/Tablet], PaleMoon, 
PhantomJS, Phoenix, Polaris, Puffin, QQ, QQBrowser, 
QQBrowserLite, Quark, QupZilla, RockMelt, [Mobile] Safari, 
Sailfish Browser, Samsung Browser, SeaMonkey, Silk, 
Skyfire, Sleipnir, Slim, SlimBrowser, Swiftfox, Tesla, 
TikTok, Tizen Browser, UCBrowser, UP.Browser, Viera, Vivaldi, 
Waterfox, WeChat, Weibo, Yandex, baidu, iCab, w3m, 
Whale Browser, ...
```

## `version:string`

Determined dynamically

## `major:string`

Major number of `version` following [semver↗](https://semver.org/), eg: if we have version `5.1.21214` the major would be `5`.


## Code Example

```js
const operamini = 'Opera/9.80 (J2ME/MIDP; Opera Mini/5.1.21214/19.916; U; en) Presto/2.5.25'
const parser = new UAParser(operamini);

console.log(parser.getBrowser());
// { name : "Opera Mini", version : "5.1.21214", major : "5" }
```