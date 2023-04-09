# getEngine():IData

Get layout rendering engine name & version from user-agent string.

```js
// Result object is structured as follow:
{ name: '', version: '' }
```

## `name:string`

```sh
# List of possible value of `engine.name`
Amaya, Blink, EdgeHTML, Flow, Gecko, Goanna, iCab, 
KHTML, LibWeb, Links, Lynx, NetFront, NetSurf, 
Presto, Tasman, Trident, w3m, WebKit
```

## `version:string`

Determined dynamically

## Code Example

```js
const operamini = 'Opera/9.80 (J2ME/MIDP; Opera Mini/5.1.21214/19.916; U; en) Presto/2.5.25'
const parser = new UAParser(operamini);

console.log(parser.getEngine());
// { name : "Presto", version : "2.5.25" }
```