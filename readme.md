# UA-Parser.JS

Lightweight JavaScript-based User-Agent string parser

[![Build Status](https://travis-ci.org/faisalman/ua-parser-js.png)](https://travis-ci.org/faisalman/ua-parser-js)

* Author    : Faisalman <<fyzlman@gmail.com>>
* Home      : http://faisalman.github.com/ua-parser-js
* Source    : https://github.com/faisalman/ua-parser-js
* License   : GPLv2 & MIT

## Features

Extract detailed type of web browser, layout engine, operating system, and device purely from user-agent string with relatively lightweight footprint (~7KB minified / ~3KB gzipped).

![It's over 9000](https://pbs.twimg.com/media/A9LpEG6CIAA5VrT.jpg)

## Methods

* `getBrowser()`
* `getDevice()`
* `getEngine()`
* `getOS()`
* `getResult()`
* `getUA()`
* `setUA(uastring)`

## Example

```html
<script type="text/javascript" src="ua-parser.js"></script>
<script type="text/javascript">
    
	var parser = new UAParser();
	
    // by default it takes ua string from current browser's window.navigator.userAgent
    console.log(parser.getResult());
    /*
        /// this will print an object structured like this:
        {
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
            }
        }
    */

    // let's test a custom user-agent string as an example
    var uastr = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.2 (KHTML, like Gecko) Ubuntu/11.10 Chromium/15.0.874.106 Chrome/15.0.874.106 Safari/535.2";
    parser.setUA(uastr);
    
    console.log(parser.getResult().browser);    // {name: "Chromium", major: "15", version: "15.0.874.106"}
    console.log(parser.getResult().device);     // {model: undefined, type: undefined, vendor: undefined}
    console.log(parser.getResult().engine);     // {name: "WebKit", version: "535.2"}
    console.log(parser.getResult().os);         // {name: "Ubuntu", version: "11.10"}
    
    // let's take another test please
    console.log(parser.setUA("Mozilla/5.0 (compatible; Konqueror/4.1; OpenBSD) KHTML/4.1.4 (like Gecko)").getBrowser().name); // "Konqueror"
    console.log(parser.getOS());                // {name: "OpenBSD", version: undefined}
    console.log(parser.getEngine());            // {name: "KHTML", version: "4.1.4"}
</script>
```

## Using requirejs

If you're using requirejs, you can load UA-Parser like any other module.

```js
require(['ua-parser'], function(UAParser) {
    var parser = new UAParser();
    console.log(parser.getResult());
});
```

## Using node.js

```sh
$ npm install ua-parser-js
```

```js
var UAParser    = require('ua-parser');
var parser      = new UAParser();
var uaString    = 'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 1.0.0; en-US) AppleWebKit/534.11 (KHTML, like Gecko) Version/7.1.0.7 Safari/534.11';

console.log(parser.setUA(uaString).getDevice().model);  // "PlayBook"
console.log(parser.getOS())                             // {name: "RIM Tablet OS", version: "1.0.0"}
console.log(parser.getEngine().name);                   // "WebKit"
```

## Using jQuery

If you're using jQuery, `$.ua` object will be created automatically based on container's user-agent. Use `$.ua.get()` / `$.ua.set(uastring)` to get/set user-agent. In case you need, `UAParser` constructor is still present in global though.

```js
// In browser with default user-agent: 'Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; Sprint APA7373KT Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0':

// Do some tests
console.log($.ua.device);           // {vendor: "HTC", model: "Evo Shift 4G", type: "mobile"}
console.log($.ua.os);               // {name: "Android", version: "2.3.4"}
console.log($.ua.os.name);          // "Android"
console.log($.ua.get());            // "Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; Sprint APA7373KT Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0"

// reset to custom user-agent
$.ua.set('Mozilla/5.0 (Linux; U; Android 3.0.1; en-us; Xoom Build/HWI69) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13');

// Test again
console.log($.ua.device);           // {vendor: "Motorola", model: "Xoom", type: "tablet"}
console.log($.ua.engine.name);      // "Webkit"
console.log($.ua.browser.version);  // "4.0"
console.log(parseInt($.ua.browser.version.split('.')[0], 10));  // 4
```

## License

Copyright © 2012-2013 Faisalman <<fyzlman@gmail.com>>

Permission is hereby granted, free of charge, to any person obtaining a copy of 
this software and associated documentation files (the "Software"), to deal in 
the Software without restriction, including without limitation the rights to use, 
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the 
Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.
