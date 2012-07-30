# UA-Parser.js

Lightweight JavaScript-based user-agent parser

* Author    : Faisalman <<fyzlman@gmail.com>>
* Home      : http://faisalman.github.com/ua-parser-js
* Source    : https://github.com/faisalman/ua-parser-js
* License   : GPLv2 & MIT

## Features

Get detailed type and version of web browser, layout engine, operating system, and device.

## Methods

* `getBrowser([uastring])`
* `getDevice([uastring])`
* `getEngine([uastring])`
* `getOS([uastring])`
* `setUA(uastring)`

## Properties

* `result`

## Example

```html
<script type="text/javascript" src="ua-parser.js"></script>
<script type="text/javascript">
    
    // by default it takes ua string from current browser's window.navigator
    console.log(UAParser.result);
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
                name: "",
                version: ""
            }
        }
    */

    // let's test a custom user-agent string as an example
    var uastr = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.2 (KHTML, like Gecko) Ubuntu/11.10 Chromium/15.0.874.106 Chrome/15.0.874.106 Safari/535.2";
    UAParser.setUA(uastr);
    
    console.log(UAParser.result.browser);  // {name: "Chromium", major: "15", version: "15.0.874.106"}
    console.log(UAParser.result.engine);   // {name: "AppleWebKit", version: "535.2"}
    console.log(UAParser.result.os);       // {name: "Ubuntu", version: "11.10"}
    
    // let's take another test please
    console.log(UAParser.setUA("Mozilla/5.0 (compatible; Konqueror/4.1; OpenBSD) KHTML/4.1.4 (like Gecko)").getOS().name); // "OpenBSD"
</script>
```

## Using node.js

```js
var parser = require('ua-parser');

var ua1 = 'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 1.0.0; en-US) AppleWebKit/534.11 (KHTML, like Gecko) Version/7.1.0.7 Safari/534.11';
var ua2 = 'Midori/0.2 (X11; Linux; U; cs-cz) WebKit/531.2+';

parser.setUA(ua1).getDevice().name; // "PlayBook"
parser.getOS()                      // {name: "RIM Tablet OS", version: "1.0.0"}
parser.getOS(ua2)                   // {name: "Linux", version: undefined}
parser.getOS()                      // {name: "RIM Tablet OS", version: "1.0.0"}
parser.getEngine().name;            // "AppleWebKit"
```

## License

Copyright © 2012 Faisalman <<fyzlman@gmail.com>>

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
