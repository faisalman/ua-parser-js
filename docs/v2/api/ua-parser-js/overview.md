# UAParser Class Overview

## Constructor

### `new UAParser([user-agent:string][,extensions:object][,headers:object]):UAParser`

When called with the `new` keyword, it will return a new instance of `UAParser`.

```js
const parser = new UAParser("your user-agent here"); // you need to pass the user-agent for nodejs
console.log(parser); 
/* 
    {}
*/

const parserResults = parser.getResult();
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

### `UAParser([user-agent:string][,extensions:object][,headers:object]):IData`

When called without the `new` keyword, it will directly return the results of `getResult()`:

```js
const parser = UAParser("your user-agent here");
console.log(parser);
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

::: tip
In **browser** environment you don't need to pass the user-agent string, as it should automatically get the string from the current `window.navigator.userAgent`.
:::

::: tip
In **Node.js** environment, user-agent string must be passed in order for the function to work. Usually you can find it in: `request.headers["user-agent"]`.
:::

## Methods
The methods are self explanatory, here's a small overview of available methods:

### [`getBrowser():IData`](/api/ua-parser-js/get-browser)
 
returns the browser name, version, and major.

### [`getCPU():IData`](/api/ua-parser-js/get-cpu)
 
returns CPU architectural design name.

### [`getDevice():IData`](/api/ua-parser-js/get-device)
 
returns the device model, type, vendor.
 
### [`getEngine():IData`](/api/ua-parser-js/get-engine)
 
returns the browser engine name and version.
 
### [`getOS():IData`](/api/ua-parser-js/get-os)
 
returns the operating system name and version.
 
### [`getResult():IData`](/api/ua-parser-js/get-result)
 
returns all function object calls, user-agent string, browser info, cpu, device, engine, os.

### [`getUA():string`](/api/ua-parser-js/get-ua)
 
returns the user-agent string.
 
### [`setUA(ua:string):UAParser`](/api/ua-parser-js/set-ua)
 
set a custom user-agent string to be parsed.