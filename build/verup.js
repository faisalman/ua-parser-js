#!/usr/bin/env node
/**
 * Increment and update version in all project files.
 *
 * Ussage:
 *
 *  Increment revision by 1:
 *      node verup.js 1
 *
 *  Increment minor version by 1:
 *      node verup.js 1.0
 *
 *  Increment major version by 1:
 *      node verup.js 1.0.0
 *
 *
 * @author Dumitru Uzun (DUzun.Me)
 * @version 1.1.0
 */

var path = require('path');
var fs   = require('fs');

var _root = path.join(__dirname, '..');
var files = [
    'ua-parser-js.jquery.json',
    'component.json',
    'bower.json',
    'package.js',
    'src/ua-parser.js'
];

var ver_reg = [
    /^((?:\$|@|(\s*(?:var|,)?\s+))(?:LIBVERSION|version)[\s\:='"]+)([0-9]+(?:\.[0-9]+){2,2})/
  , /^(\s?\*.*v)([0-9]+(?:\.[0-9]+){2,2})/
];

var packFile = path.join(_root, 'package.json');
var packo = require(packFile);

if ( !packo ) {
    console.error('Can\'t read package.json file');
    process.exit(1);
}

var over = packo.version;

/*
 * bump should be 1 for revision, 1.0 for minor and 1.0.0 for major version
 */
var bump = (process.argv[2] || '1').split('.').reverse();

if ( over ) {
    var nver = over.split('.').reverse();
    var b, l;
    while(bump.length && !(b = parseInt(bump.pop())));
    l = bump.length;

// console.log({b:b,nver:nver,over:over,l:l,bump:bump})
    nver[l] = +nver[l] + b;
    bump.forEach(function (v,i) { nver[i] = v; });

    nver = nver.reverse().join('.');
    packo.version = nver;

    console.log('Bumping version: ' + over + ' -> ' + nver);

    var buf = JSON.stringify(packo, null, 2);

    if ( buf && over != nver ) {
        buf += "\n";
        fs.writeFileSync(packFile, buf);
    }

    files.forEach(function (f) {
        var fn = path.join(_root, f);
        var cnt = fs.readFileSync(fn, 'utf8');
        var ext = path.extname(f);
        var buf;

        switch(ext) {
            case '.json': {
                var packo = JSON.parse(cnt);
                packo.version = nver;
                buf = JSON.stringify(packo, null, 2);
                if ( buf ) {
                    buf += "\n";
                }
            } break;

            default: {
                buf = cnt
                    .split('\n')
                    .map(function (l) {
                        for(var i=ver_reg.length; i--;) {
                            if ( ver_reg[i].test(l) ) {
                                return l.replace(ver_reg[i], function ($0,$1) { return $1 + nver })
                            }
                        }
                        return l;
                    })
                    .join("\n")
                ;
            }
        }
        if ( buf && buf != cnt ) {
            console.log("\t" + fn.replace(_root, ''));
            fs.writeFileSync(fn, buf);
        }
    });

}
