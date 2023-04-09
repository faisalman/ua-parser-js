# withFeatureCheck():IData`

This method allows us to examine other features beyond `navigator.userAgent`. Currently this further improve the detection of the following:

- browser : 
    - Brave (check for `navigator.isBrave`)
- device  : 
    - iPad (check for `navigator.standalone` & `navigator.maxTouchPoints`)

## Code Example

```js
// suppose this code runs on iPad
const withoutFeatureCheck = UAParser();
const withFeatureCheck = UAParser().withFeatureCheck();

console.log(withoutFeatureCheck.device); // { vendor : "Apple", model : "Macintosh", type : undefined }
console.log(withFeatureCheck.device);    // { vendor : "Apple", model : "iPad", type : "tablet" }
```