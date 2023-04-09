# Extending Regex

## Write Your Own Extension

If you want to detect something that's not currently provided by UAParser.js (eg: bots, specific apps, etc), you can pass a list of regexes to extends internal UAParser.js regexes with your own.

- `UAParser([uastring:string,] extensions:object [,headers:object])`

```js
// Example:
const myOwnListOfBrowsers = [
    [/(mybrowser)\/([\w\.]+)/i], [UAParser.BROWSER.NAME, UAParser.BROWSER.VERSION, ['type', 'bot']]
];

const myUA = 'Mozilla/5.0 MyBrowser/1.3';

const myParser = new UAParser({ browser: myOwnListOfBrowsers });

console.log(myParser.setUA(myUA).getBrowser());  // {name: "MyBrowser", version: "1.3", major: "1", type : "bot"}
console.log(myParser.getBrowser().is('bot'));    // true
```

```js
// Another example:
const myOwnListOfDevices = [
    [/(mytab) ([\w ]+)/i], [UAParser.DEVICE.VENDOR, UAParser.DEVICE.MODEL, [UAParser.DEVICE.TYPE, UAParser.DEVICE.TABLET]],
    [/(myphone)/i], [UAParser.DEVICE.VENDOR, [UAParser.DEVICE.TYPE, UAParser.DEVICE.MOBILE]]
];

const myUA2 = 'Mozilla/5.0 MyTab 14 Pro Max';

const myParser2 = new UAParser({
    browser: myOwnListOfBrowsers,
    device: myOwnListOfDevices
});

console.log(myParser2.setUA(myUA2).getDevice());  // {vendor: "MyTab", model: "14 Pro Max", type: "tablet"}
```

::: info
When custom regexes passed into `UAParser` constructor, they will be ordered **before** internal regexes, thus when the parser runs they will get checked first.
:::

## Use Predefined Extensions Submodule

Some basic extensions (although not very complete at the moment) can also be found under [`ua-parser-js/extensions`↗](/api/submodules/extensions) submodule.

```js
// Usage example
import { UAParser } from 'ua-parser-js';
import { Emails } from 'ua-parser-js/extensions';

const ua = 'Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Thunderbird/78.13.0';
const browser = new UAParser(Emails)
                    .setUA(ua)
                    .getBrowser();

console.log(browser.toString()); // Thunderbird 78.13.0
```
