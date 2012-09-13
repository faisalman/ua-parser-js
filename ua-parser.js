// UA-Parser.JS v0.3.3
// Lightweight JavaScript-based User-Agent string parser
// https://github.com/faisalman/ua-parser-js
//
// Copyright © 2012 Faisalman
// Dual licensed under GPLv2 & MIT

(function (undefined) {
    var parser = function UAParser (uastring) {

        var ua = uastring || (typeof window !== 'undefined' ? window.navigator.userAgent : "");

        // regexp mapper
        var regxMap = function (ua) {
            
            var result = {}, i, j, k, l, m;
            
            // loop through all regexes maps
            for (i = 1; i < arguments.length; i += 2) {
            
                var regex = arguments[i],                   // odd sequence (2,4,6,..)
                    props = arguments[i + 1];               // even sequence (3,5,7,..)
                
                // build object barebones
                for (k = 0; k < props.length; k++) {
                    if (typeof props[k] == 'object') {
                        result[props[k][0]] = undefined;
                    } else {
                        result[props[k]] = undefined;
                    }
                }
                
                // try matching uastring with regexes
                for (j = 0; j < regex.length; j++) {
                    l = regex[j].exec(ua);
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
        };

        var mapper = {
        
            check : function(str, map){
                for (var i = 0; i < map.length; i++) {
                    if (str.toLowerCase().indexOf(map[i][0]) !== -1) {
                        return map[i][1];
                    }
                }
                return str;
            },
            
            os : {
                win : function (match, str1) {
                    var map = [
                        ['4.90',     'ME'],
                        ['nt3.51',   'NT 3.11'],
                        ['nt4.0',    'NT 4.0'],
                        ['nt 5.0',   '2000'],
                        ['nt 5.1',   'XP'],
                        ['nt 5.2',   'XP'],
                        ['nt 6.0',   'Vista'],
                        ['nt 6.1',   '7'],
                        ['nt 6.2',   '8'],
                    ];
                    return mapper.check(str1, map);
                }
            }
        };

        this.getBrowser = function (uastring) {

            return regxMap(uastring || ua, [

                // Mixed
                /(kindle)\/((\d+)?[\w\.]+)/i,                                       // Kindle
                /(lunascape|maxthon|netfront|jasmine)[\/\s]?((\d+)?[\w\.]+)/i,      // Lunascape/Maxthon/Netfront/Jasmine
                
                // Presto based
                /(opera\smini)\/((\d+)?[\w\.-]+)/i,                                 // Opera Mini
                /(opera\smobi)\/((\d+)?[\w\.-]+)/i,                                 // Opera Mobile
                /(opera).+version\/((\d+)?[\w\.]+)/i,                               // Opera
                /(opera)[\/\s]+((\d+)?[\w\.]+)/i,
                
                // Trident based
                /(avant\sbrowser|iemobile|slimbrowser)[\/\s]?((\d+)?[\w\.]*)/i,     // Avant/IEMobile/SlimBrowser
                /ms(ie)\s((\d+)?[\w\.]+)/i,                                         // Internet Explorer

                // Webkit/KHTML based
                /(chromium|flock|rockmelt|midori|epiphany|silk)\/((\d+)?[\w\.]+)/i, // Chromium/Flock/RockMelt/Midori/Epiphany
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
                /(lynx|dillo|icab)[\/\s]?((\d+)?[\w\.]+)/i,                         // Lynx/Dillo/iCab
                ], ['name', 'version', 'major']);  
        };

        this.getEngine = function (uastring) {

            return regxMap(uastring || ua, [

                /(presto)\/([\w\.]+)/i,                                             // Presto
                /([aple]*webkit|trident)\/([\w\.]+)/i,                              // Webkit/Trident
                /(khtml)\/([\w\.]+)/i                                               // KHTML
                ], ['name', 'version'], [

                /rv\:([\w\.]+).*(gecko)/i                                           // Gecko
                ], ['version', 'name']);
        };

        this.getOS = function (uastring) { 

            return regxMap(uastring || ua, [

                // Windows based
                /(windows\sphone\sos|windows)\s?([nt\d\.\s]+\d)/i                   // Windows
                ], ['name', ['version', /(.+)/gi, mapper.os.win]], [
                /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
                ], [['name', 'Windows'], ['version', /(.+)/gi, mapper.os.win]], [
                
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
                ], ['name', 'version']);
        };

        this.getDevice = function (uastring) { 

            return regxMap(uastring || ua, [

                /\((ip[honead]+|playbook);/i,                                       // iPod/iPhone/iPad/PlayBook
                /(blackberry)[\s-]?(\w+)/i,                                         // BlackBerry
                /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|nexus|zte)[\s_-]?([\w-]+)*/i,  
                                                                                    // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Nexus/ZTE
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
                
                /((transfo[prime\s]{4,10}\s\w+|(?:android.*)eeepc))/i               // Asus
                ], [['name', 'Asus'], 'version'], [

                /(sie)-(\w+)*/i                                                     // Siemens
                ], [['name', 'Siemens'], 'version'], [
                
                /(maemo|nokia).*(n900|lumia\s\d+)/i,                                // Nokia
                /(nokia)[\s_-]?([\w-]+)*/i
                ], [['name', 'Nokia'], 'version']);
        };
        
        this.getUA = function() {
            return ua;
        };

        this.setUA = function (uastring) {
            ua = uastring;
            this.result = {
                browser : this.getBrowser(),
                engine  : this.getEngine(),
                os      : this.getOS(),
                device  : this.getDevice()
            };
            return this;
        };

        this.setUA(ua);
    };
        
    // check whether script is running inside node.js export as module
    if (typeof exports !== 'undefined' && this.toString() !== '[object DOMWindow]') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = parser;
        }
        exports.UAParser = parser;
    } else {
        this['UAParser'] = parser;
    }
})();
