// UA-Parser.js v0.2.0
// Lightweight JavaScript-based user-agent parser
// https://github.com/faisalman/ua-parser-js
//
// Copyright © 2012 Faisalman
// Licensed under GPLv2

function UAParser (uastring) {

    var ua = uastring || window.navigator.userAgent;

    // regexp mapper
    var regxMap = function (ua) {
        var result;
        var i, j, k, l;
        for (i = 1; i < arguments.length; i += 2) {
            var regex = arguments[i];
            var props = arguments[i + 1];
            var isMatchFound = false;
            for (j = 0; j < regex.length; j++) {
                var match = regex[j].exec(ua);
                //console.log(match);
                if (!!match) {
                    result = {};
                    l = 1;
                    for (k = 0; k < props.length; k++) {
                        if (typeof props[k] === 'object' && props[k].length === 2) {
                            result[props[k][0]] = props[k][1];
                            l -= 1;
                        } else if (typeof props[k] === 'object' && props[k].length === 3) {
                            result[props[k][0]] = (!!match[k + l]) ? match[k + l].replace(props[k][1], props[k][2]) : undefined;
                        } else {
                            result[props[k]] = (!!match[k + l]) ? match[k + l] : undefined;
                        }
                    }
                    isMatchFound = true;
                    break;
                }
            }
            if (!isMatchFound) {
                result = {};
                for (k in props) {
                    if (props.hasOwnProperty(k)) {
                        if (typeof props[k] == 'object') {
                            result[props[k][0]] = undefined;
                        } else {
                            result[props[k]] = undefined;
                        }
                    }
                }
            } else {
                return result;
            }
        }
        return result;
    };

    var mapper = {
        os : {        
            win: function (str, match) {
                switch (match.toLowerCase()) {
                    case 'nt 5.0':
                        return '2000';
                    case 'nt 5.1':
                    case 'nt 5.2':
                        return 'XP';
                    case 'nt 6.0':
                        return 'Vista';
                    case 'nt 6.1':
                        return '7';
                    case 'nt 6.2':
                        return '8';
                    default:
                        return match;
                };
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
            /(opera).*\/((\d+)?[\w\.]+)/i,                                      // Opera

            // Trident based
            /(avant\sbrowser|iemobile|slimbrowser)[\/\s]?((\d+)?[\w\.]*)/i,     // Avant/IEMobile/SlimBrowser
            /ms(ie)\s((\d+)?[\w\.]+)/i,                                         // Internet Explorer

            // Webkit/KHTML based
            /(chromium|flock|rockmelt|midori|epiphany)\/((\d+)?[\w\.]+)/i,      // Chromium/Flock/RockMelt/Midori/Epiphany
            /(chrome|omniweb|arora|dolfin)\/((\d+)?[\w\.]+)/i,                  // Chrome/OmniWeb/Arora/Dolphin
            ], ['name', 'version', 'major'], [
            /android.+crmo\/((\d+)?[\w\.]+)/i,                                  // Chrome for Android
            ], [['name', 'Chrome'], 'version', 'major'], [
            /(mobile\ssafari|safari|konqueror)\/((\d+)?[\w\.]+)/i,              // Safari/Konqueror
            /(applewebkit|khtml)\/((\d+)?[\w\.]+)/i,

            // Gecko based
            /(iceweasel|camino|fennec|maemo|minimo)[\/\s]?((\d+)?[\w\.\+]+)/i,  // Iceweasel/Camino/Fennec/Maemo/Minimo
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
            /(windows\sphone\sos|windows)\s+([\w\.\s]+)*/i,                     // Windows
            ], ['name', ['version', /(nt\s[\d\.]+)/gi, mapper.os.win]], [

            // Mobile/Embedded OS
            /(blackberry).+version\/([\w\.]+)/i,                                // Blackberry
            /(android|symbianos|symbos|webos|palm\os|qnx|bada|rim\stablet\sos)[\/\s-]?([\w\.]+)*/i,
                                                                                // Android/Symbian/WebOS/Palm/QNX/Bada/RIM
            /(nintendo|playstation)\s([wids3portable]+)/i,                      // Nintendo/Playstation

            // GNU/Linux based
            /(mint)[\/\s\(]?(\w+)*/i,                                           // Mint
            /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk)[\/\s-]?([\w\.-]+)*/i,
                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk
            /(gnu|linux)\s?([\w\.]+)*/i                                         // Other GNU/Linux
            ], ['name', 'version'], [

            /cros\s([\w\.\s]+)/i                                                // Chromium OS
            ], [['name', 'Chromium OS'], 'version'],[

            // Solaris
            /sunos\s?([\w\.\s]+)*/i                                             // Solaris
            ], [['name', 'Solaris'], 'version'], [

            // BSD based
            /\s(\w*bsd|dragonfly)\s?([\w\.]+)*/i,                               // FreeBSD/NetBSD/OpenBSD/DragonFly
            ], ['name', 'version'],[

            /(ip[honead]+).*os\s*([\w]+)*\slike\smac/i                          // iOS
            ], [['name', /.+/g, 'iOS'], ['version', /_/g, '.']], [

            /(mac\sos)\sx\s([\w\s\.]+)/i,                                       // Mac OS
            ], ['name', ['version', /_/g, '.']], [

            // Other
            /(macintosh|unix|minix|beos)[\/\s]?()*/i
            ], ['name', 'version']);
    };

    this.getDevice = function (uastring) { 

        return regxMap(uastring || ua, [

            /\((ip[honead]+|playbook);/i,                                       // iPod/iPhone/iPad/PlayBook
            /(blackberry)[\s-]?(\w+)/i,                                         // BlackBerry
            /(blackberry|benq|nokia|palm(?=\-)|sonyericsson)[\s-]?([\w-]+)*/i,  // BenQ/Nokia/Palm/Sony-Ericsson
            /(hp)\s([\w\s]+)/i,                                                 // HP iPAQ
            /(hp).+(touchpad)/i,                                                // HP TouchPad
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(lg)[e;\s-]+(\w+)*/i,                                              // LG
            /(nintendo|playstation)\s([wids3portable]+)/i                       // Nintendo/Playstation
            ], ['name', 'version'], [
            
            /(htc)[;_\s-]+([\w\s]+(?=\))|[\w]+)*/i,                             // HTC
            /(zte)-([\w]+)*/i
            ], ['name', ['version', /_/g, ' ']], [
                        
            /\s(milestone|mz601|droid[2x]?|xoom)[globa\s]*\sbuild\//i,          // Motorola
            /mot[\s-]?(\w+)*/i
            ], [['name', 'Motorola'], 'version'], [
            
            /(s[cgp]h-\w+|gt-\w+|galaxy\snexus)/i,                              // Samsung
            /sam[sung]*[\s-]*(\w+-?[\w-]*)*/i,
            /sec-(sgh\w+)/i
            ], [['name', 'Samsung'], 'version'], [

            /sie-(\w+)*/i                                                       // Siemens
            ], [['name', 'Siemens'], 'version']);
    };

    this.setUA = function (uastring) {
        ua = uastring || ua;
        return this.result = {
            browser : this.getBrowser(),
            engine  : this.getEngine(),
            os      : this.getOS(),
            device  : this.getDevice()
        };
    };

    this.setUA(ua);
};
