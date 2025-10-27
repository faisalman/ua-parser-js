const assert = require('node:assert');
const { exec } = require('node:child_process');
const fs = require('node:fs');
const { UAParser } = require('../../../src/main/ua-parser');
const uap = new UAParser();

const input = [
    'Opera/9.25 (Windows NT 6.0; U; ru)',
    'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
];
const output = input.map(x => uap.setUA(x).getResult());

describe('npx ua-parser-js <string>', () => {
    it ('print result to stdout', () => {
        exec('node ./script/cli.js "TEST"', (err, stdout, stderr) => {
            assert.deepEqual(JSON.parse(stdout), JSON.parse(JSON.stringify([uap.setUA("TEST").getResult()])));
        });
    })
});

describe('npx ua-parser-js --input-file=<filepath>', () => {
    it ('load file and print result to stdout', () => {
        exec('node ./script/cli.js --input-file="../test/unit/cli/input.txt"', (err, stdout, stderr) => {
            assert.deepEqual(JSON.parse(stdout), JSON.parse(JSON.stringify(output)));
        });
    });
});

describe('npx ua-parser-js --input-file=<filepath> --output-file=<filepath>', () => {
    it ('load file and save result to file', () => {
        exec('node ./script/cli.js --input-file="../test/unit/cli/input.txt" --output-file="../test/unit/cli/output.json"', (err, stdout, stderr) => {
            fs.readFile('test/unit/cli/output.json', (err, data) => {
                assert.deepEqual(JSON.parse(data), JSON.parse(JSON.stringify(output)));
            });
        });
    });
});
