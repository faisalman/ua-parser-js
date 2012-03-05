/**
 * ua-parser-js v0.1
 * Small script to extract detailed system data based on user-agent string
 * http://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012 Faisalman <fyzlman@gmail.com>
 * Licensed under GPL2 http://www.gnu.org/licenses/gpl-2.0.html
 */

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
            /(avant\sbrowser|iemobile)[\/\s]?((\d+)?[\w\.]+)/i,                 // Avant/IEMobile
            /ms(ie)\s((\d+)?[\w\.]+)/i,                                         // Internet Explorer
                                        
            // Webkit/KHTML based
            /(chromium|flock|rockmelt|midori|epiphany)\/((\d+)?[\w\.]+)/i,      // Chromium/Flock/RockMelt/Midori/Epiphany
            /(chrome|omniweb|arora|dolfin)\/((\d+)?[\w\.]+)/i,                  // Chrome/OmniWeb/Arora/Dolphin            
            /(mobile\ssafari|safari|konqueror)\/((\d+)?[\w\.]+)/i,              // Safari/Konqueror
            /(applewebkit|khtml)\/((\d+)?[\w\.]+)/i,
            
            // Gecko based
            /(iceweasel|camino|fennec|maemo|minimo)[\/\s]?((\d+)?[\w\.\+]+)/i,  // Iceweasel/Camino/Fennec/Maemo/Minimo
            /(firefox|seamonkey|netscape|navigator)\/((\d+)?[\w\.]+)/i,         // Firefox/SeaMonkey/Netscape
            /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,                          // Mozilla
            
            // Other
            /(lynx)\/?((\d+)?[\w\.]+)/i,                                        // Lynx
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
            /(windows)\s+([\w\.\s]+)*/i,                                        // Windows
            ], ['name', ['version', /(nt\s[\d\.]+)/gi, winMap]], [
            
            // Mobile/Embedded OS
            /(blackberry).+version\/([\w\.]+)/i,                                // Blackberry
            /(android|symbianos|symbos|webos|palm\os|qnx)[\/\s]?([\w\.]+)*/i,   // Android/Symbian/WebOS/Palm/QNX
            /(nintendo)\s([wids]+)/i,                                           // Nintendo Wii/DS

            // GNU/Linux based
            /(mint)[\s\(]?(\w+)*/i,                                             // Mint
            /(joli|ubuntu|debian|suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat)[\/\s]?([\w\.-]+)*/i,                  
                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat
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
            
            /(mac)\s([\w\s\.]+)/i,                                              // Mac
                                        
            // Other
            /(unix|minix)[\/\s]?()*/i
            ], ['name', 'version']);
    };
};
