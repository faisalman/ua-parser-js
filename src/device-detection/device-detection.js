/////////////////////////////////////////////////////
/*  device-detection submodule of UAParser.js v2.0.8
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    AGPLv3 License */
////////////////////////////////////////////////////

/*jshint esversion: 6 */ 

const { UAParser } = require('../main/ua-parser');
const { CPUArch, OSName  } = require('../enums/ua-parser-enums');

const getDeviceVendor = (model) => new UAParser(`Mozilla/5.0 (Linux; Android 10; ${model}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36`).getDevice().vendor;

const isAppleSilicon = (val) => {
    const { os, cpu } = typeof val !== 'string' ? val : {
        os: new UAParser(val).getOS(),
        cpu: new UAParser(val).getCPU() 
    };
    if (os.is(OSName.MACOS)) {
        if (cpu.is(CPUArch.ARM)) {
            return true;
        } else if (typeof window !== 'undefined') {
            try {
                const canvas = document.createElement('canvas');
                const webgl = canvas.getContext('webgl2') || 
                                canvas.getContext('webgl') || 
                                canvas.getContext('experimental-webgl');
                return webgl
                        .getParameter(webgl.getExtension('WEBGL_debug_renderer_info').UNMASKED_RENDERER_WEBGL)
                        .match(/apple m\d/i);
            } catch {
                return false;
            }
        }
    }
    return false;
}

module.exports = { 
    getDeviceVendor,
    isAppleSilicon
}