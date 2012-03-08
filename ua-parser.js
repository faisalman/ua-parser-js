// UA-Parser.js v0.1.0
// JavaScript-based user-agent parser
// https://github.com/faisalman/ua-parser-js
//
// Copyright © 2012 Faisalman
// Licensed under GPLv2

function uaparser(uastring){

    // regexp mapper
    var regxMap = function(ua){
        var i, j;
        for(j = 1; j < arguments.length; j += 2){
            var rx  = arguments[j],
                asc = arguments[j+1],
                k, l, m, n, o, p;
            for(l = 0; l < rx.length; l++){
                m = rx[l].exec(ua);
                //console.log(m);
                if(!!m){
                    k = {};
                    o = 1;
                    for(n = 0; n < asc.length; n++){
                        if(typeof asc[n] === 'object' && asc[n].length === 2){
                            k[asc[n][0]] = asc[n][1];
                            o -= 1;
                        } else if(typeof asc[n] === 'object' && asc[n].length === 3){
                            k[asc[n][0]] = (!!m[n+o]) ? m[n+o].replace(asc[n][1], asc[n][2]) : 'unknown';
                        } else {
                            k[asc[n]] = (!!m[n+o]) ? m[n+o] : 'unknown';
                        }
                    };
                    i = k;
                    p = true;
                    break;
                }
            };
            if(!p){
                k = {};
                for(l in asc){
                    if(asc.hasOwnProperty(l)){
                        k[asc[l]] = 'unknown';
                    }
                };
                i = k;
            }
            if(p) break;
        };
        return i;
    };

    var winMap  = function(){
        switch(arguments[1].toLowerCase()){
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
                return arguments[1];
        };
    };

    this.ua = uastring || window.navigator.userAgent;

    this.getBrowser = function(){

        return regxMap(this.ua, [

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
            ], ['name', 'release', 'version'], [
            /android.+(crmo)\/((\d+)?[\w\.]+)/i,                                // Chrome for Android
            ], [['name', /.+/g, 'Chrome'], 'release', 'version'], [
            /(mobile\ssafari|safari|konqueror)\/((\d+)?[\w\.]+)/i,              // Safari/Konqueror
            /(applewebkit|khtml)\/((\d+)?[\w\.]+)/i,

            // Gecko based
            /(iceweasel|camino|fennec|maemo|minimo)[\/\s]?((\d+)?[\w\.\+]+)/i,  // Iceweasel/Camino/Fennec/Maemo/Minimo
            /(firefox|seamonkey|netscape|navigator|k-meleon|icecat|iceape)\/((\d+)?[\w\.]+)/i,
                                                                                // Firefox/SeaMonkey/Netscape/K-Meleon/IceCat/IceApe
            /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,                          // Mozilla

            // Other
            /(lynx|dillo|icab)[\/\s]?((\d+)?[\w\.]+)/i,                         // Lynx/Dillo/iCab
            ], ['name', 'release', 'version']);  
    };

    this.getEngine = function(){

        return regxMap(this.ua, [

            /(presto)\/([\w\.]+)/i,                                             // Presto
            /([aple]*webkit|trident)\/([\w\.]+)/i,                              // Webkit/Trident
            /(khtml)\/([\w\.]+)/i                                               // KHTML
            ], ['name', 'version'], [

            /rv\:([\w\.]+).*(gecko)/i                                           // Gecko
            ], ['version', 'name']);
    };

    this.getOS = function(){ 

        return regxMap(this.ua, [

            // Windows based
            /(windows\sphone\sos|windows)\s+([\w\.\s]+)*/i,                     // Windows
            ], ['name', ['version', /(nt\s[\d\.]+)/gi, winMap]], [

            // Mobile/Embedded OS
            /(blackberry).+version\/([\w\.]+)/i,                                // Blackberry
            /(android|symbianos|symbos|webos|palm\os|qnx|bada|rim\stablet\sos)[\/\s-]?([\w\.]+)*/i,
                                                                                // Android/Symbian/WebOS/Palm/QNX/Bada/RIM
            /(nintendo|playstation)\s([wids3portable]+)/i,                      // Nintendo/Playstation

            // GNU/Linux based
            /(mint)[\s\(]?(\w+)*/i,                                             // Mint
            /(joli|ubuntu|debian|suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk)[\/\s-]?([\w\.-]+)*/i,
                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk
            /(gnu|linux)\s?([\w\.]+)*/i                                         // Other GNU/Linux
            ], ['name', 'version'], [

            /cros\s([\w\.\s]+)/i                                                // Chromium OS
            ], [['name', 'Chromium OS'], 'version'],[

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
};