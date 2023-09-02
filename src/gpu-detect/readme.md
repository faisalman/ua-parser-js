# @ua-parser-js/gpu-detect

This is a [UAParser.js](https://github.com/faisalman/ua-parser-js) module that extracts GPU information from user-agent.

```sh
npm i @ua-parser-js/gpu-detect
```

## Code Example

// in browser environment
const { vendor, model } = GPUDetect.getGPU();

// in non-browser environment
const { vendor, model } = GPUDetect.getGPU("AMD Radeon");
```