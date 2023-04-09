# getUA():string

Get user-agent string of current instance

## Code Example

```js
// Try to run this code on a browser
const parser = new UAParser();

// This will print the user-agent of current browser
console.log(parser.getUA());

// Replace the user-agent value
parser.setUA('Mozilla/5.0 MyBrowser/1.0');

parser.getUA();
// "Mozilla/5.0 MyBrowser/1.0"
```