# UA-Parser.js

JavaScript-based user-agent parser

* Author	: Faisalman <<fyzlman@gmail.com>>
* Home      : http://faisalman.github.com/ua-parser-js
* Source	: https://github.com/faisalman/ua-parser-js
* License	: GPLv2

## Features

Get detailed type and version of web browser, layout engine, and operating system.

## Methods

* `getBrowser([uastring])`
* `getEngine([uastring])`
* `getOS([uastring])`
* `setUA(uastring)`

## Example

```html
<script type="text/javascript" src="ua-parser.js"></script>
<script type="text/javascript">

    var p = new UAParser();     // if no string given as parameter, by default it takes ua string from current browser's window.navigator
    
    console.log(p.result);
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
            }
        }
    */

    // let's test a custom user-agent string as an example
    p.setUA("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.2 (KHTML, like Gecko) Ubuntu/11.10 Chromium/15.0.874.106 Chrome/15.0.874.106 Safari/535.2");
    
    console.log(p.result.browser);  // {name: "Chromium", major: "15", version: "15.0.874.106"}
    console.log(p.result.engine);   // {name: "AppleWebKit", version: "535.2"}
    console.log(p.result.os);       // {name: "Ubuntu", version: "11.10"}
    
</script>
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
