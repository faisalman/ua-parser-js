#!/usr/bin/env node
/* jshint esversion: 6 */ 
const fs = require('fs');

const generateMJS = (module) => {
    let { src, dest, title, replacements } = module;
    let text = fs.readFileSync(src, 'utf-8');

    replacements.push(
        [/const (.+?)\s*=\s*require\(\'\.(.+)\'\)/ig, 'import $1 from \'\.$2.mjs\''],
        [/const (.+?)\s*=\s*require\(\'(.+)\'\)/ig, 'import $1 from \'$2\''],
        [/module\.exports =/ig, 'export']
    );
    replacements.forEach(rep => {
        text = text.replace(rep[0], rep[1]);
    });

    console.log(`Generate ${dest}`);

    fs.writeFileSync(dest,
`// Generated ESM version of ${title}
// DO NOT EDIT THIS FILE!
// Source: /${src}

${text}`, 'utf-8');

};

const modules = [
    {
        src : 'src/main/ua-parser.js',
        dest : 'src/main/ua-parser.mjs',
        title : 'ua-parser-js',
        replacements : [
            [/\(func[\s\S]+strict\';/ig, ''],
            [/esversion\: 3/ig, 'esversion: 6'],
            [/\/[\/\s]+export[\s\S]+/ig,'export {UAParser};']
        ]
    },{
        src : 'src/enums/ua-parser-enums.js',
        dest :'src/enums/ua-parser-enums.mjs',
        title : 'ua-parser-js/enums',
        replacements : []
    },
    {
        src : 'src/extensions/ua-parser-extensions.js',
        dest : 'src/extensions/ua-parser-extensions.mjs',
        title : 'ua-parser-js/extensions',
        replacements : []
    },
    {
        src : 'src/helpers/ua-parser-helpers.js',
        dest : 'src/helpers/ua-parser-helpers.mjs',
        title : 'ua-parser-js/helpers',
        replacements : []
    }
];

modules.forEach(module => generateMJS(module));