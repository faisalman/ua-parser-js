///////////////////////////////////////////////
/*  Helpers for UAParser.js v2.0.0-beta.1
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    AGPLv3 License */
//////////////////////////////////////////////

/*jshint esversion: 6 */ 

const { CPU, OS } = require('../enums/ua-parser-enums');

const isAppleSilicon = function (res) {
    return res.os.is(OS.MACOS) && res.cpu.is(CPU.ARM);
}

module.exports = { 
    isAppleSilicon
}

// TODO: create test