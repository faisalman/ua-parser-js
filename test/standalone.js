var assert      = require('assert');
var requirejs   = require('requirejs');
var UAParser    = require('./../src/ua-parser');
var browsers    = require('./browser-test.json');
var cpus        = require('./cpu-test.json');
var devices     = require('./device-test.json');
var engines     = require('./engine-test.json');
var os          = require('./os-test.json');
var methods     = [
    {
        title       : 'getBrowser',
        label       : 'browser',
        list        : browsers,
        properties  : ['name', 'major', 'version']
    },
    {
        title       : 'getCPU',
        label       : 'cpu',
        list        : cpus,
        properties  : ['architecture']
    },
    {
        title       : 'getDevice',
        label       : 'device',
        list        : devices,
        properties  : ['model', 'type', 'vendor']
    },
    {
        title       : 'getEngine',
        label       : 'engine',
        list        : engines,
        properties  : ['name', 'version']
    },
    {
        title       : 'getOS',
        label       : 'os',
        list        : os,
        properties  : ['name', 'version']
}];
console.log(UAParser);

describe('Returns', function () {
    it('[empty] parse() should returns JSON', function(done) {
        assert.deepEqual(UAParser(''),
            {
                browser: { name: undefined, version: undefined, major: undefined },
                cpu: { architecture: undefined },
                device: { vendor: undefined, model: undefined, type: undefined },
                engine: { name: undefined, version: undefined},
                os: { name: undefined, version: undefined }
            }
        );
        done();
    });

    it('[mobile] parse() shoud return JSON', function(done) {
        const userAgent =
"Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";
        assert.deepEqual(UAParser(userAgent),
            {
                browser: { name: 'Android Browser', version: '4.0', major: '4' },
                engine: { name: 'WebKit', version: '534.30' },
                os: { name: 'Android', version: '4.0.2' },
                device: { vendor: 'Samsung', model: 'Galaxy Nexus', type: 'mobile' },
                cpu: { architecture: undefined }
            }
        );
        done();
    })
});
