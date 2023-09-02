const { GPUDetect } = require('../gpu-detect.js');

console.log(GPUDetect.getGPU('AMD Radeon R9 M295X OpenGL Engine'));
console.log(GPUDetect.getGPU('','ATI Technologies Inc.'));