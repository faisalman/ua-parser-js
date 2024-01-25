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

const isFrozenUA = (ua) => /^Mozilla\/5\.0 \((Windows NT 10\.0; Win64; x64|Macintosh; Intel Mac OS X 10_15_7|X11; Linux x86_64|X11; CrOS x86_64 14541\.0\.0|Fuchsia|Linux; Android 10; K)\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) Chrome\/\d+\.0\.0\.0 (Mobile )?Safari\/537\.36/.test(ua);

module.exports = { 
    isAppleSilicon,
    isChromiumBased,
    isFrozenUA
}