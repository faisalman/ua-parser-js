const { FuzzedDataProvider } = require('@jazzer.js/core');
const UAParser = require('ua-parser-js');
const UA_MAX_LENGTH = 350;

module.exports.fuzz = function (buffer) {
    const data = new FuzzedDataProvider(buffer);
    const userAgent = data.consumeString(UA_MAX_LENGTH, 'utf-8', true);
    const start = process.hrtime();
    
    UAParser(userAgent);

    const elapsed = process.hrtime(start);
    const milisec = (elapsed[0]*1e3+elapsed[1]*1e-6).toFixed(3);
    if (milisec > 1000) {
        throw new Error(
            `Potential ReDoS\n` +
            `Time taken: ${milisec} ms.\n` +
            `User agent: ${userAgent}`);
    }
};