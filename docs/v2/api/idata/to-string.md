# `toString():string`

Retrieve full-name values as a string

::: info
Values will be concatenated following this pattern:
* browser : `name` + `version`
* cpu : `architecture`
* device : `vendor` + `model`
* engine : `name` + `version`
* os : `name` + `version`
:::

## Code Example

```js
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
