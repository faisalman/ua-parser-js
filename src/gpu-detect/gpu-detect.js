//////////////////////////////////////////////
/*  Extracts GPU information from user-agent
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    MIT License */
/////////////////////////////////////////////

/*jshint esversion: 11 */ 

const rendererMap = [
    [[
    /(intel).*\b(hd\sgraphics\s\d{4}|iris(?:\spro)|gma\s\w+)/i,         // Intel
    /(nvidia)\s(geforce\s(?:gtx?\s)\d\w+|quadro)/i,                     // NVIDIA
    /\b(sis)\s(\w+)/i                                                   // SiS
    ], ['vendor', 'model']], 
    
    [[
    /\b(radeon[\shdr\d]+\w{4,5})/i                                         // ATI/AMD
    ], ['model', ['vendor', 'AMD']]], 
    
    [[
    /(adreno\s(?:\(tm\)\s)\w+)/i                                        // Qualcomm
    ], [['model', /\(tm\)\s/i, ''], ['vendor', 'Qualcomm']]]
];

const vendorMap = [
    [[
    /\b(amd|apple|arm|ati|img|intel|nvidia|qualcomm|samsung|sis)\b/i
    ], ['vendor']]
];

class RegexMap {

    static parse(str, mapper) {
        let res = {};
        if (typeof str === 'string') {
            for (const [regs, props] of mapper) {
                if (!Array.isArray(regs)) {
                    throw new Error('RegexMap: Expect Array of RegExp');
                }
                if (!Array.isArray(props)) {
                    throw new Error('RegexMap: Expect Array for Properties Mapping');
                }
                for (const reg of regs) {
                    if (!reg instanceof RegExp) {
                        throw new Error('RegexMap: Expect RegExp Instance');
                    }
                    const matches = reg.exec(str);
                    if (matches) {
                        props.forEach((prop, idx) => {
                            const val = matches[idx+1];
                            if (Array.isArray(prop)) {
                                const key = prop[0];
                                if (typeof key !== 'string') {
                                    throw new Error('RegexMap: Expect String Input');
                                }
                                if (prop.length == 2) {
                                    if (typeof prop[1] === 'string') {
                                        res[key] = prop[1];
                                    } else if (typeof prop[1] === 'function') {
                                        res[key] = prop[1].call(res, val);
                                    }
                                } else if (prop.length == 3) {
                                    if (prop[1] instanceof RegExp) {
                                        res[key] = val.replace(prop[1], prop[2]);
                                    } else if (typeof prop[1] === 'function') {
                                        res[key] = prop[1].call(res, val, prop[2]);
                                    }
                                } else if (prop.length == 4) {
                                    res[key] = prop[3].call(res, val.replace(prop[1], prop[2]));
                                } else {
                                    res[key] = val;
                                }
                            } else if (typeof prop === 'string') {
                                res[prop] = val;
                            }
                        });
                        if (res) return res;
                    }
                }
            }
        }
        return res;
    };
}

class GPUDetect {

    static getGPU (strRenderer, strVendor) {

        let gpuInfo = { vendor : undefined, model : undefined };

        if (typeof strRenderer !== 'string') {
            if (globalThis.document) {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl2') || 
                            canvas.getContext('webgl') || 
                            canvas.getContext('experimental-webgl');
                if (gl) {
                    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                    strVendor = gl.getParameter(debugInfo?.UNMASKED_VENDOR_WEBGL);
                    strRenderer = gl.getParameter(debugInfo?.UNMASKED_RENDERER_WEBGL);
                }
            }
        }
        if (strRenderer || strVendor) {
            ({ vendor : gpuInfo.vendor, model : gpuInfo.model } = RegexMap.parse(strRenderer, rendererMap));
            gpuInfo.vendor = gpuInfo.vendor ?? RegexMap.parse(strVendor, rendererMap)?.vendor ?? RegexMap.parse(strVendor, vendorMap)?.vendor;
        }
        return gpuInfo;
    }
}

module.exports = {
    GPUDetect
}