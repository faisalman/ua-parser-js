# getDevice():IData

Get details of device information (type, vendor, model) from user-agent string.

```js
// Result object is structured as follow:
{ type: '', vendor: '', model: '' }
```

## `type:string`

```sh
# List of possible values for `device.type`:
mobile, tablet, smarttv, console, wearable, embedded
```

::: info
If you wish to detect desktop devices, you must handle the logic yourself, since `UAParser` only reports info that is directly available from user-agent string. Read more about this issue [here↗](https://github.com/faisalman/ua-parser-js/issues/182)
:::

## `vendor:string`

```sh
# List of possible `device.vendor`:
Acer, Alcatel, Amazon, Apple, Archos, ASUS, AT&T, BenQ,
BlackBerry, Dell, Essential, Facebook, Fairphone, GeeksPhone,
Google, HP, HTC, Huawei, Jolla, Kobo, Lenovo, LG, Meizu,
Microsoft, Motorola, Nexian, Nintendo, Nokia, Nvidia, OnePlus, 
OPPO, Ouya, Palm, Panasonic, Pebble, Polytron, Realme, RIM, 
Roku, Samsung, Sharp, Siemens, Sony[Ericsson], Sprint, Tesla, 
Vivo, Vodafone, Xbox, Xiaomi, Zebra, ZTE, ...
```

## `model:string`

Determined dynamically

## Code Example

```js

const galaxytabs8 = 'Mozilla/5.0 (Linux; Android 12; SM-X706B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36'
const parser = new UAParser(galaxytabs8);

console.log(parser.getDevice());
// { type : "tablet", vendor : "Samsung", model : "SM-X706B" }
```