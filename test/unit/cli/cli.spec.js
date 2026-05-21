const assert = require('node:assert');
const { exec } = require('node:child_process');
const path = require('node:path');
const fs = require('node:fs');
const { UAParser } = require('../../../src/main/ua-parser');
const uap = new UAParser();

const input = [
    'Opera/9.25 (Windows NT 6.0; U; ru)',
    'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
];
const output = input.map(x => uap.setUA(x).getResult());

const testDir = path.join(__dirname);
const inputFile = path.join(testDir, 'input.txt');
const outputFile = path.join(testDir, 'output.json');

describe('npx ua-parser-js <string>', () => {
    it ('print result to stdout', (done) => {
        exec('npx ua-parser-js "TEST"', (err, stdout, stderr) => {
            if (err) return done(err);
            assert.deepEqual(JSON.parse(stdout), JSON.parse(JSON.stringify([uap.setUA("TEST").getResult()])));
            done();
        });
    })
});

describe('npx ua-parser-js --input-file=<filepath>', () => {
    it ('load file and print result to stdout', (done) => {
        exec(`npx ua-parser-js --input-file="${inputFile}"`, (err, stdout, stderr) => {
            if (err) return done(err);
            assert.deepEqual(JSON.parse(stdout), JSON.parse(JSON.stringify(output)));
            done();
        });
    });
});

describe('npx ua-parser-js --input-file=<filepath> --output-file=<filepath>', () => {
    it ('load file and save result to file', (done) => {
        exec(`npx ua-parser-js --input-file="${inputFile}" --output-file="${outputFile}"`, (err, stdout, stderr) => {
            if (err) return done(err);
            fs.readFile(outputFile, (err, data) => {
                if (err) return done(err);
                assert.deepEqual(JSON.parse(data), JSON.parse(JSON.stringify(output)));
                done();
            });
        });
    });
});
