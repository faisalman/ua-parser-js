///////////////////////////////////////////////
/*  Helpers for UAParser.js v2.0.0-beta.1
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    AGPLv3 License */
//////////////////////////////////////////////

/*jshint esversion: 6 */ 

const { CPU, OS, Engine } = require('../enums/ua-parser-enums');

const isAppleSilicon = (res) => res.os.is(OS.MACOS) && res.cpu.is(CPU.ARM);

const isChromiumBased = (res) => res.engine.is(Engine.BLINK);

module.exports = { 
    isAppleSilicon,
    isChromiumBased
}