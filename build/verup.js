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
 * @version 1.2.0
 */

var path = require('path');
var fs   = require('fs');

var packFile = findPackage(__dirname);

if ( !packFile ) {
    console.log('package.json file not found');
    process.exist(1);
}

var _root = path.dirname(packFile);
var packo = require(packFile);

if ( !packo ) {
    console.error('Can\'t read package.json file');
    process.exit(1);
}

var _verup = packo.verup;

if ( !_verup ) {
    console.log('package.json doesn\'t have a `verup` property defined');
    process.exist(1);
}

var files = _verup.files;

var ver_reg = [
    /^((?:\$|@|(\s*(?:var|,)?\s+))version[\s\:='"]+)([0-9]+(?:\.[0-9]+){2,2})/
  , /^(\s?\*.*v)([0-9]+(?:\.[0-9]+){2,2})/
];

if ( _verup.regs ) {
    ver_reg = _verup.regs.map(function (r) { return new RegExp(r); });
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


/// Find package.json file in closest folder from `dir` and up.
function findPackage(dir) {
    var d = dir || '.', f;
    do {
        f = path.join(d, 'package.json');
        if ( fs.existsSync(f) ) return f;
        dir = d;
        d = path.join(d, '..');
    } while (d != dir && dir.slice(0,2) != '..');
    return false;
}
