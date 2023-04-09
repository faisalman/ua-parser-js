# Why UAParser.js

---

This illustration sums up why:

```js
// Consider we got this user-agent (yes it's real):
const ua = `Mozilla/5.0 (Linux; Android 10; STK-LX1 
Build/HONORSTK-LX1; wv) AppleWebKit/537.36 (KHTML, 
like Gecko) Version/4.0 Chrome/110.0.5481.153 Mobile 
Safari/537.36 musical_ly_2022803040 JsSdk/1.0 
NetType/WIFI Channel/huaweiadsglobal_int 
AppName/musical_ly app_version/28.3.4 ByteLocale/en 
ByteFullLocale/en Region/IQ Spark/1.2.7-alpha.8 
AppVersion/28.3.4 PIA/1.5.11 BytedanceWebview/d8a21c6`;

// what???
```

Worry not:

```js
// Just pass it to `UAParser`
const parser = new UAParser(ua);

// And voila!
console.log(parser.getBrowser());
// { name : "TikTok", version : "28.3.4", major : "28" }

console.log(parser.getEngine());
// { name : "Blink", version : "110.0.5481.153" }

console.log(parser.getDevice());
// { type : "mobile", vendor : "Huawei", model : "STK-LX1" }

console.log(parser.getOS());
// { name : "Android", version : "10" }
```