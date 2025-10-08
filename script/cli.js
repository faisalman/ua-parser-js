#!/usr/bin/env node

try {    
    const fs = require('node:fs');
    const path = require('node:path');
    const { performance } = require('node:perf_hooks');
    const readline = require('node:readline');
    const { parseArgs } = require('node:util');
    const UAParser = require('../src/main/ua-parser');
    const { Bots, Emails, ExtraDevices, InApps, Vehicles } = require('../src/extensions/ua-parser-extensions');

    if (!process.argv[2].startsWith('-')) {

        const results = process.argv.slice(2).map(ua => UAParser(ua));
        console.log(JSON.stringify(results, null, 4));
        process.exit(0);

    } else if (['-h', '--help'].includes(process.argv[2])) {

        console.log('Usage: npx ua-parser-js <string>');
        console.log('   or  npx ua-parser-js --input-file <filepath> [--output-file <filepath>]');
        console.log('-i, --input-file');
        console.log('-o, --output-file');
        process.exit(0);

    } else {

        const startPerf = performance.now();
        const {
            values: { 
                'input-file': inputFile, 
                'output-file': outputFile 
            },
        } = parseArgs({
            options: {
                'input-file': { type: 'string', short: 'i' },
                'output-file': { type: 'string', short: 'o' }
            }
        });

        if (!inputFile) {
            console.error('Input file must be present');
            process.exit(1);
        }

        const inputPath = path.resolve(__dirname, inputFile);
        const outputPath = outputFile ? path.resolve(__dirname, outputFile) : null;

        if (!fs.existsSync(inputPath)) {
            console.error(`Input file not found: ${inputPath}`);
            process.exit(1);
        }

        const inputStream = fs.createReadStream(inputPath, 'utf8');
        const rl = readline.createInterface({
            input: inputStream,
            crlfDelay: Infinity
        });

        const outputStream = outputPath ? fs.createWriteStream(outputPath, { encoding : 'utf8' }) : process.stdout;

        const uap = new UAParser([Bots, Emails, ExtraDevices, InApps, Vehicles]);
        let lineNumber = 0;

        outputStream.write('[\n');

        rl.on('line', line => {
            const result = uap.setUA(line).getResult();
            const json = JSON.stringify(result, null, 4);
            if (lineNumber > 0) outputStream.write(',\n');
            outputStream.write(json);
            lineNumber++;
        });

        rl.on('close', () => {
            outputStream.write('\n]');
            if (outputPath) {
                outputStream.end(() => {
                    const finishPerf = performance.now();
                    console.log(`Done!`);
                    console.log(`Number of lines found: ${lineNumber}`);
                    console.log(`Task finished in: ${(finishPerf - startPerf).toFixed(3)}ms`);
                    console.log(`Output written to: ${outputPath}`);
                    process.exit(0);
                });
            } else {
                process.exit(0);
            }
        });
    }
} catch (err) {
    console.error(err);
    process.exit(1);
}