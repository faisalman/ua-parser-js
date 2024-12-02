//////////////////////////////////////////////////
/*  Device Utils Submodule for UAParser.js v2.0.0
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    AGPLv3 License */
/////////////////////////////////////////////////

/*jshint esversion: 6 */ 

const fs = require('fs');
const path = require('path');
const UAParser = require('../main/ua-parser');
const { Device: DeviceType } = require('../enums/ua-parser-enums');

const isDeviceType = (val, expectedType) => {
    const uap = typeof val == 'string' ? UAParser(val) : val; // string
    let actualType;
    if (uap.hasOwnProperty('device')) { // IResult
        actualType = uap.device?.type;
    } else if (uap.hasOwnProperty('type')) { // IDevice
        actualType = uap.type;
    }
    return actualType == expectedType;
};

const getMarketingName = (model, vendor) => {
    const normalizedVendor = vendor.toLowerCase();
    const filePath = path.resolve(__dirname, `./data/marketing-name/${normalizedVendor}.json`);
    if (fs.existsSync(filePath)) {
        const map = require(`./data/marketing-name/${normalizedVendor}.json`)[0];
        if (model in map) {
            return map[model];
        }
    }
    return model;
};

const isMobile = val => isDeviceType(val, DeviceType.MOBILE); 
const isSmartTV = val => isDeviceType(val, DeviceType.SMARTTV);
const isTablet = val => isDeviceType(val, DeviceType.TABLET);
const isWearable = val => isDeviceType(val, DeviceType.WEARABLE);
const isXR = val => isDeviceType(val, DeviceType.XR);

module.exports = { 
    getMarketingName,
    isMobile,
    isSmartTV,
    isTablet,
    isWearable,
    isXR
};
