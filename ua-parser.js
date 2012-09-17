// UA-Parser.JS v0.4.0
// Lightweight JavaScript-based User-Agent string parser
// https://github.com/faisalman/ua-parser-js
//
// Copyright © 2012 Faisalman
// Dual licensed under GPLv2 & MIT

(function (undefined) {

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
                                result[props[k][0]] = m ? m.replace(props[k][1], props[k][2]) : undefined;
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
                            if (str.toLowerCase().indexOf(map[i][j]) !== -1) {
                                return i;
                            }
                        }
                    } else if (str.toLowerCase().indexOf(map[i]) !== -1) {
                        return i;
                    }
                }
            }
            return str;
        }
    };

    var maps = {
        os : {
            windows : {
                version : function (match, str1) {
                    return mapper.string(str1, {
                        'ME'        : '4.90',
                        'NT 3.11'   : 'nt3.51',
                        'NT 4.0'    : 'nt4.0',
                        '2000'      : 'nt 5.0',
                        'XP'        : ['nt 5.1', 'nt 5.2'],
                        'Vista'     : 'nt 6.0',
                        '7'         : 'nt 6.1',
                        '8'         : 'nt 6.2'
                    });
                }
            }
        }
    };
    
    var regexes = {

        browser : [[

            // Mixed
            /(kindle)\/((\d+)?[\w\.]+)/i,                                       // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?((\d+)?[\w\.]+)/i,
                                                                                // Lunascape/Maxthon/Netfront/Jasmine/Blazer
            
            // Presto based
            /(opera\smini)\/((\d+)?[\w\.-]+)/i,                                 // Opera Mini
            /(opera\smobi)\/((\d+)?[\w\.-]+)/i,                                 // Opera Mobile
            /(opera).+version\/((\d+)?[\w\.]+)/i,                               // Opera
            /(opera)[\/\s]+((\d+)?[\w\.]+)/i,
            
            // Trident based
            /(avant\sbrowser|iemobile|slimbrowser)[\/\s]?((\d+)?[\w\.]*)/i,     // Avant/IEMobile/SlimBrowser
            /ms(ie)\s((\d+)?[\w\.]+)/i,                                         // Internet Explorer

            // Webkit/KHTML based
            /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|series60|bolt)\/((\d+)?[\w\.]+)/i, 
                                                                                // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/S60/Bolt
            /(chrome|omniweb|arora|dolfin|[tizenaok]{5}\s?browser)\/((\d+)?[\w\.]+)/i,
                                                                                // Chrome/OmniWeb/Arora/Dolphin/Tizen/Nokia
            ], ['name', 'version', 'major'], [
            /(?:android.+(crmo|crios))\/((\d+)?[\w\.]+)/i,                      // Chrome for Android/iOS
            ], [['name', 'Chrome'], 'version', 'major'], [
            /(mobile\ssafari|safari|konqueror)\/((\d+)?[\w\.]+)/i,              // Safari/Konqueror
            /(applewebkit|khtml)\/((\d+)?[\w\.]+)/i,

            // Gecko based
            /(iceweasel|camino|fennec|maemo\sbrowser|minimo)[\/\s]?((\d+)?[\w\.\+]+)/i,  
                                                                                // Iceweasel/Camino/Fennec/Maemo/Minimo
            /(firefox|seamonkey|netscape|navigator|k-meleon|icecat|iceape)\/((\d+)?[\w\.]+)/i,
                                                                                // Firefox/SeaMonkey/Netscape/K-Meleon/IceCat/IceApe
            /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,                          // Mozilla

            // Other
            /(lynx|dillo|icab|doris)[\/\s]?((\d+)?[\w\.]+)/i,                   // Lynx/Dillo/iCab/Doris
            /(gobrowser)\/?[\d\.]*/i                                            // GoBrowser
            ], ['name', 'version', 'major']
        ],
        
        device : [[

            /\((ip[honead]+|playbook);/i,                                       // iPod/iPhone/iPad/PlayBook
            /(blackberry)[\s-]?(\w+)/i,                                         // BlackBerry
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|nexus|zte|huawei)[\s_-]?([\w-]+)*/i,  
                                                                                // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Nexus/ZTE/Huawei
            /(hp)\s([\w\s]+\w)/i,                                               // HP iPAQ
            /(hp).+(touchpad)/i,                                                // HP TouchPad
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(lg)[e;\s-]+(\w+)*/i,                                              // LG
            /(nintendo|playstation)\s([wids3portable]+)/i                       // Nintendo/Playstation
            ], ['name', 'version'], [
            
            /(htc)[;_\s-]+([\w\s]+(?=\))|[\w]+)*/i,                             // HTC
            /(zte)-([\w]+)*/i
            ], ['name', ['version', /_/g, ' ']], [
                        
            /\s((milestone|mz601|droid[2x]?|xoom))[globa\s]*\sbuild\//i,        // Motorola
            /(mot)[\s-]?(\w+)*/i
            ], [['name', 'Motorola'], 'version'], [
            
            /((s[cgp]h-\w+|gt-\w+|galaxy\snexus))/i,                            // Samsung
            /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,
            /sec-((sgh\w+))/i
            ], [['name', 'Samsung'], 'version'], [
            
            /((transfo[prime\s]{4,10}\s\w+))|(?:android.*)((eeepc))/i           // Asus
            ], [['name', 'Asus'], 'version'], [

            /(sie)-(\w+)*/i                                                     // Siemens
            ], [['name', 'Siemens'], 'version'], [
            
            /(maemo|nokia).*(n900|lumia\s\d+)/i,                                // Nokia
            /(nokia)[\s_-]?([\w-]+)*/i
            ], [['name', 'Nokia'], 'version']            
        ],
        
        engine : [[

            /(presto)\/([\w\.]+)/i,                                             // Presto
            /([aple]*webkit|trident)\/([\w\.]+)/i,                              // Webkit/Trident
            /(khtml)\/([\w\.]+)/i                                               // KHTML
            ], ['name', 'version'], [

            /rv\:([\w\.]+).*(gecko)/i                                           // Gecko
            ], ['version', 'name']            
        ],
        
        os : [[

            // Windows based
            /(windows\sphone\sos|windows)\s?([ntce\d\.\s]+\d)/i                 // Windows
            ], ['name', ['version', /(.+)/gi, maps.os.windows.version]], [
            /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
            ], [['name', 'Windows'], ['version', /(.+)/gi, maps.os.windows.version]], [
            
            // Mobile/Embedded OS
            /(blackberry).+version\/([\w\.]+)/i,                                // Blackberry
            /(tizen)\/([\w\.]+)/i,                                              // Tizen
            /(android|symbianos|symbos|webos|palm\os|qnx|bada|rim\stablet\sos|meego)[\/\s-]?([\w\.]+)*/i,
                                                                                // Android/Symbian/WebOS/Palm/QNX/Bada/RIM/MeeGo
            /(nintendo|playstation)\s([wids3portable]+)/i,                      // Nintendo/Playstation

            // GNU/Linux based
            /(mint)[\/\s\(]?(\w+)*/i,                                           // Mint
            /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk)[\/\s-]?([\w\.-]+)*/i,
                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk
            /(gnu|linux)\s?([\w\.]+)*/i                                         // Other GNU/Linux
            ], ['name', 'version'], [

            /(cros)\s([\w\.\s]+\d)/i                                            // Chromium OS
            ], [['name', 'Chromium OS'], 'version'],[

            // Solaris
            /(sunos)\s?([\w\.\s]+\d)*/i                                         // Solaris
            ], [['name', 'Solaris'], 'version'], [

            // BSD based
            /\s(\w*bsd|dragonfly)\s?([\w\.]+)*/i,                               // FreeBSD/NetBSD/OpenBSD/DragonFly
            ], ['name', 'version'],[

            /(ip[honead]+).*os\s*([\w]+)*\slike\smac/i                          // iOS
            ], [['name', /.+/g, 'iOS'], ['version', /_/g, '.']], [

            /(mac\sos\sx)\s([\w\s\.]+\w)/i,                                     // Mac OS
            ], ['name', ['version', /_/g, '.']], [

            // Other
            /(haiku)\s(\w+)/i,                                                  // Haiku
            /(macintosh|unix|minix|beos)[\/\s]?()*/i                            // UNIX/Minix/BeOS
            ], ['name', 'version']            
        ]
    };

    var UAParser = function UAParser (uastring) {

        var ua = uastring || (typeof window !== 'undefined' ? window.navigator.userAgent : "");

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
        
    // check whether script is running inside node.js export as module
    if (typeof exports !== 'undefined' && this.toString() !== '[object DOMWindow]') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = UAParser;
        }
        exports.UAParser = UAParser;
    } else {
        window['UAParser'] = UAParser;
    }
})();
