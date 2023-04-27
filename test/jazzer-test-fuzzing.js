const UAParser = require('ua-parser-js');

module.exports.fuzz = function (buffer) {
    const userAgent = buffer.toString();
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