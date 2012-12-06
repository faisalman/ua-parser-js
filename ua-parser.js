// UA-Parser.JS v0.4.16
// Lightweight JavaScript-based User-Agent string parser
// https://github.com/faisalman/ua-parser-js
//
// Copyright © 2012 Faisalman
// Dual licensed under GPLv2 & MIT

(function (global, undefined) {

    'use strict';

    var mapper = {

        regex : function () {

            var result, i, j, k, l, m, args = arguments;

            // loop through all regexes maps
            for (i = 0; i < args.length; i += 2) {

                var regex = args[i],       // odd sequence (0,2,4,..)
                    props = args[i + 1];   // even sequence (1,3,5,..)

                // construct object barebones
                if (typeof result === 'undefined') {
                    result = {};
                    for (k = 0; k < props.length; k++) {
                        if (typeof props[k] === 'object') {
                            result[props[k][0]] = undefined;
                        } else {
                            result[props[k]] = undefined;
                        }
                    }
                    if (this.getUA().toString() === '') {
                        return result;
                    }
                }

                // try matching uastring with regexes
                for (j = 0; j < regex.length; j++) {
                    l = regex[j].exec(this.getUA());
                    if (!!l) {
                        for (k = 0; k < props.length; k++) {
                            m = l[k + 1];
                            if (typeof props[k] === 'object' && props[k].length === 2) {
                                result[props[k][0]] = props[k][1];
                            } else if (typeof props[k] === 'object' && props[k].length === 3) {
                                if (typeof props[k][1] === 'function' && !(props[k][1].exec && props[k][1].test)) {
                                    result[props[k][0]] = m ? props[k][1].call(this, m, props[k][2]) : undefined;
                                } else {
                                    result[props[k][0]] = m ? m.replace(props[k][1], props[k][2]) : undefined;
                                }
                            } else {
                                result[props[k]] = m ? m : undefined;
                            }
                        }
                        break;
                    }
                }

                if(!!l) break; // break the loop immediately if match found
            }
            return result;
        },

        string : function (str, map) {

            for (var i in map) {
                if (map.hasOwnProperty(i)) {
                    if (typeof map[i] === 'object' && map[i].length > 0) {
                        for (var j = 0; j < map[i].length; j++) {
                            if (str.toLowerCase().indexOf(map[i][j].toLowerCase()) !== -1) {
                                return (i.toString() === 'undefined') ? undefined : i;
                            }
                        }
                    } else if (str.toLowerCase().indexOf(map[i].toLowerCase()) !== -1) {
                        return (i.toString() === 'undefined') ? undefined : i;
                    }
                }
            }
            return str;
        }
    };

    var maps = {
        browser : {
            oldsafari : {
                major : {
                    '1' : ['/85', '/125', '/312'],
                    '2' : ['/412', '/416', '/417', '/419'],
                    'undefined' : '/'
                },
                version : {
                    '1.0'   : '/85',
                    '1.2'   : '/125',
                    '1.3'   : '/312',
                    '2.0'   : '/412',
                    '2.0.2' : '/416',
                    '2.0.3' : '/417',
                    '2.0.4' : '/419',
                    'undefined' : '/'
                }
            }
        },
        os : {
            windows : {
                version : {
                    'ME'        : '4.90',
                    'NT 3.11'   : 'NT3.51',
                    'NT 4.0'    : 'NT4.0',
                    '2000'      : 'NT 5.0',
                    'XP'        : ['NT 5.1', 'NT 5.2'],
                    'Vista'     : 'NT 6.0',
                    '7'         : 'NT 6.1',
                    '8'         : 'NT 6.2',
                    'RT'        : 'ARM'
                }
            }
        }
    };

    var regexes = {

        browser : [[

            // Presto based
            /(opera\smini)\/((\d+)?[\w\.-]+)/i,                                 // Opera Mini
            /(opera\s[mobiletab]+).+version\/((\d+)?[\w\.-]+)/i,                // Opera Mobi/Tablet
            /(opera).+version\/((\d+)?[\w\.]+)/i,                               // Opera > 9.80
            /(opera)[\/\s]+((\d+)?[\w\.]+)/i,                                   // Opera < 9.80

            // Mixed
            /(kindle)\/((\d+)?[\w\.]+)/i,                                       // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?((\d+)?[\w\.]+)*/i,
                                                                                // Lunascape/Maxthon/Netfront/Jasmine/Blazer

            // Trident based
            /(avant\sbrowser|iemobile|slimbrowser|baidubrowser)[\/\s]?((\d+)?[\w\.]*)/i,
                                                                                // Avant/IEMobile/SlimBrowser/Baidu
            /ms(ie)\s((\d+)?[\w\.]+)/i,                                         // Internet Explorer

            // Webkit/KHTML based
            /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt)\/((\d+)?[\w\.-]+)/i
                                                                                // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt
            ], ['name', 'version', 'major'], [
            
            /(yabrowser)\/((\d+)?[\w\.]+)/i                                     // Yandex
            ], [['name', 'Yandex'], 'version', 'major'], [
            
            /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?((\d+)?[\w\.]+)/i
                                                                                // Chrome/OmniWeb/Arora/Tizen/Nokia
            ], ['name', 'version', 'major'], [
            
            /(dolfin)\/((\d+)?[\w\.]+)/i                                        // Dolphin
            ], [['name', 'Dolphin'], 'version', 'major'], [
            
            /((?:android.+)crmo|crios)\/((\d+)?[\w\.]+)/i                       // Chrome for Android/iOS
            ], [['name', 'Chrome'], 'version', 'major'], [
            
            /version\/((\d+)?[\w\.]+).+?mobile\/\w+\s(safari)/i                 // Mobile Safari
            ], ['version', 'major', ['name', 'Mobile Safari']], [
            
            /version\/((\d+)?[\w\.]+).+?(mobile\s?safari|safari)/i              // Safari & Safari Mobile
            ], ['version', 'major', 'name'], [
            
            /applewebkit.+?(mobile\s?safari|safari)((\/[\w\.]+))/i              // Safari < 3.0
            ], ['name', ['major', mapper.string, maps.browser.oldsafari.major], ['version', mapper.string, maps.browser.oldsafari.version]], [
            
            /(konqueror)\/((\d+)?[\w\.]+)/i,                                    // Konqueror
            /(applewebkit|khtml)\/((\d+)?[\w\.]+)/i
            ], ['name', 'version', 'major'], [

            // Gecko based
            /(navigator|netscape)\/((\d+)?[\w\.-]+)/i                           // Netscape
            ], [['name', 'Netscape'], 'version', 'major'], [
            /(swiftfox)/i,                                                      // Swiftfox
            /(iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo)[\/\s]?((\d+)?[\w\.\+]+)/i,
                                                                                // Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo
            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/((\d+)?[\w\.-]+)/i,
                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,                          // Mozilla

            // Other
            /(uc\s?browser|polaris|lynx|dillo|icab|doris)[\/\s]?((\d+)?[\w\.]+)/i,
                                                                                // UCBrowser/Polaris/Lynx/Dillo/iCab/Doris
            /(gobrowser)\/?((\d+)?[\w\.]+)*/i,                                  // GoBrowser
            /(mosaic)[\/\s]((\d+)?[\w\.]+)/i                                    // Mosaic
            ], ['name', 'version', 'major']
        ],

        device : [[

            /\((ipad|playbook);[\w\s\);-]+(rim|apple)/i                         // iPad/PlayBook
            ], ['model', 'vendor', ['type', 'Tablet']], [
            
            /(hp).+(touchpad)/i,                                                // HP TouchPad
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /\s(nook)[\w\s]+build\/(\w+)/i,                                     // Nook
            /(dell)\s(strea[kpr\s\d]*[\dko])/i                                  // Dell Streak
            ], ['vendor', 'model', ['type', 'Tablet']], [

            /\((ip[honed]+);.+(apple)/i                                         // iPod/iPhone
            ], ['model', 'vendor', ['type', 'Mobile']], [
            
            /(blackberry)[\s-]?(\w+)/i,                                         // BlackBerry
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola)[\s_-]?([\w-]+)*/i,
                                                                                // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Huawei/Meizu/Motorola
            /(hp)\s([\w\s]+\w)/i,                                               // HP iPAQ
            /(asus)-?(\w+)/i                                                    // Asus
            ], ['vendor', 'model', ['type', 'Mobile']], [
            /\((bb10);\s(\w+)/i                                                 // BlackBerry 10
            ], [['vendor', 'BlackBerry'], 'model', ['type', 'Mobile']], [

            /android.+((transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+))/i       // Asus Tablets
            ], [['vendor', 'Asus'], 'model', ['type', 'Tablet']], [

            /(sony)\s(tablet\s[ps])/i                                           // Sony Tablets
            ], ['vendor', 'model', ['type', 'Tablet']], [

            /(nintendo|playstation)\s([wids3portablev]+)/i                      // Nintendo/Playstation
            ], ['vendor', 'model', ['type', 'Console']], [

            /(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,                               // HTC
            /(zte)-(\w+)*/i                                                     // ZTE
            ], ['vendor', ['model', /_/g, ' '], ['type', 'Mobile']], [

            /\s((milestone|droid[2x]?))[globa\s]*\sbuild\//i,                   // Motorola
            /(mot)[\s-]?(\w+)*/i
            ], [['vendor', 'Motorola'], 'model', ['type', 'Mobile']], [
            /android.+\s((mz60\d|xoom[\s2]{0,2}))\sbuild\//i
            ], [['vendor', 'Motorola'], 'model', ['type', 'Tablet']], [

            /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9))/i
            ], [['vendor', 'Samsung'], 'model', ['type', 'Tablet']], [          // Samsung
            /((s[cgp]h-\w+|gt-\w+|galaxy\snexus))/i,
            /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,
            /sec-((sgh\w+))/i
            ], [['vendor', 'Samsung'], 'model', ['type', 'Mobile']], [
            /(sie)-(\w+)*/i                                                     // Siemens
            ], [['vendor', 'Siemens'], 'model', ['type', 'Mobile']], [

            /(maemo|nokia).*(n900|lumia\s\d+)/i,                                // Nokia
            /(nokia)[\s_-]?([\w-]+)*/i
            ], [['vendor', 'Nokia'], 'model', ['type', 'Mobile']], [

            /android\s3\.[\s\w-;]{10}((a\d{3}))/i                               // Acer
            ], [['vendor', 'Acer'], 'model', ['type', 'Tablet']], [

            /android\s3\.[\s\w-;]{10}(lg?)-([06cv9]{3,4})/i                     // LG
            ], [['vendor', 'LG'], 'model', ['type', 'Tablet']], [
            /(lg)[e;\s-\/]+(\w+)*/i
            ], [['vendor', 'LG'], 'model', ['type', 'Mobile']], [
            
            /(mobile|tablet);.+rv\:.+gecko\//i                                  // Unidentifiable
            ], ['type', 'vendor', 'model']
        ],

        engine : [[

            /(presto)\/([\w\.]+)/i,                                             // Presto
            /(webkit|trident|netfront)\/([\w\.]+)/i,                            // WebKit/Trident/NetFront
            /(khtml)\/([\w\.]+)/i,                                              // KHTML
            /(tasman)\s([\w\.]+)/i                                              // Tasman
            ], ['name', 'version'], [

            /rv\:([\w\.]+).*(gecko)/i                                           // Gecko
            ], ['version', 'name']
        ],

        os : [[

            // Windows based
            /(windows)\snt\s6\.2;\s(arm)/i,                                     // Windows RT
            /(windows\sphone\sos|windows\s?[mobile]*)[\s\/]?([ntce\d\.\s]+\w)/i
            ], ['name', ['version', mapper.string, maps.os.windows.version]], [
            /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
            ], [['name', 'Windows'], ['version', mapper.string, maps.os.windows.version]], [

            // Mobile/Embedded OS
            /\((bb)(10);/i                                                      // BlackBerry 10
            ], [['name', 'BlackBerry'], 'version'], [
            /(blackberry).+version\/([\w\.]+)/i,                                // Blackberry
            /(tizen)\/([\w\.]+)/i,                                              // Tizen
            /(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego)[\/\s-]?([\w\.]+)*/i
                                                                                // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo
            ], ['name', 'version'], [
            /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i                 // Symbian
            ], [['name', 'Symbian'], 'version'],[

            /(nintendo|playstation)\s([wids3portablev]+)/i,                     // Nintendo/Playstation

            // GNU/Linux based
            /(mint)[\/\s\(]?(\w+)*/i,                                           // Mint
            /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk)[\/\s-]?([\w\.-]+)*/i,
                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk
            /(hurd|linux)\s?([\w\.]+)*/i,                                       // Hurd/Linux
            /(gnu)\s?([\w\.]+)*/i                                               // GNU
            ], ['name', 'version'], [

            /(cros)\s[\w]+\s([\w\.]+\w)/i                                       // Chromium OS
            ], [['name', 'Chromium OS'], 'version'],[

            // Solaris
            /(sunos)\s?([\w\.]+\d)*/i                                           // Solaris
            ], [['name', 'Solaris'], 'version'], [

            // BSD based
            /\s(\w*bsd|dragonfly)\s?([\w\.]+)*/i,                               // FreeBSD/NetBSD/OpenBSD/DragonFly
            ], ['name', 'version'],[

            /(ip[honead]+).*os\s*([\w]+)*\slike\smac/i                          // iOS
            ], [['name', 'iOS'], ['version', /_/g, '.']], [

            /(mac\sos\sx)\s?([\w\s\.]+\w)*/i,                                   // Mac OS
            ], ['name', ['version', /_/g, '.']], [

            // Other
            /(haiku)\s(\w+)/i,                                                  // Haiku
            /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,                               // AIX                    
            /(macintosh|mac(?=_powerpc)|plan\s9|minix|beos|qnx|os\/2|amigaos|morphos)/i,
                                                                                // Plan9/Minix/BeOS/QNX/OS2/AmigaOS/MorphOS
            /(unix)\s?([\w\.]+)*/i                                              // UNIX
            ], ['name', 'version']
        ]
    };

    var UAParser = function UAParser (uastring) {

        var ua = uastring || ((global && global.navigator && global.navigator.userAgent) ? global.navigator.userAgent : "");

        this.getBrowser = function () {
            return mapper.regex.apply(this, regexes.browser);
        };

        this.getDevice = function () {
            return mapper.regex.apply(this, regexes.device);
        };

        this.getEngine = function () {
            return mapper.regex.apply(this, regexes.engine);
        };

        this.getOS = function () {
            return mapper.regex.apply(this, regexes.os);
        };

        this.getResult = function() {
            return {
                browser : this.getBrowser(),
                engine  : this.getEngine(),
                os      : this.getOS(),
                device  : this.getDevice()
            };
        };

        this.getUA = function() {
            return ua;
        };

        this.setUA = function (uastring) {
            ua = uastring;
            return this;
        };

        this.setUA(ua);
    };

    // check js environment    
    if (typeof exports !== 'undefined' && !/\[object\s[DOM]*Window\]/.test(global.toString())) {
        // nodejs env
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = UAParser;
        }
        exports.UAParser = UAParser;
    } else {
        // browser env
        global['UAParser'] = UAParser;
    }
})(this);
