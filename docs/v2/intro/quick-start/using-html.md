# Using HTML
---
- Download minified file locally from [GitHub ↗](https://github.com/faisalman/ua-parser-js/blob/master/dist/ua-parser.pack.js)
- Or use CDN for extra cache performance
    - [jsDelivr ↗](https://cdn.jsdelivr.net/npm/ua-parser-js/src/ua-parser.min.js)
    - [cdnjs ↗](https://cdnjs.com/libraries/UAParser.js)

## Code Example

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