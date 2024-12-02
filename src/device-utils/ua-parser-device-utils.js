//////////////////////////////////////////////////
/*  Device Utils Submodule for UAParser.js v2.0.0
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    AGPLv3 License */
/////////////////////////////////////////////////

/*jshint esversion: 6 */ 

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

const isMobile = val => isDeviceType(val, DeviceType.MOBILE); 
const isSmartTV = val => isDeviceType(val, DeviceType.SMARTTV);
const isTablet = val => isDeviceType(val, DeviceType.TABLET);
const isWearable = val => isDeviceType(val, DeviceType.WEARABLE);
const isXR = val => isDeviceType(val, DeviceType.XR);

module.exports = { 
    isMobile,
    isSmartTV,
    isTablet,
    isWearable,
    isXR
};
