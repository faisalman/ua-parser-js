# Using TypeScript

```sh
$ npm install --save ua-parser-js
# Install ua-parser-js

$ npm install --save-dev @types/ua-parser-js
# Download type definition from DefinitelyTyped repository
# https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/ua-parser-js
```

## Code Example

```js
import { UAParser } from 'ua-parser-js'; 

const parser = new UAParser();
console.log(parser.getResult());
```