/////////////////////////////////////////////////////////////////////////////////
/* UAParser.js v0.7.27
   Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
   MIT License *//*
   Detect Browser, Engine, OS, CPU, and Device type/model from User-Agent data.
   Supports browser & node.js environment. 
   Demo   : https://faisalman.github.io/ua-parser-js
   Source : https://github.com/faisalman/ua-parser-js */
/////////////////////////////////////////////////////////////////////////////////

(function (window, undefined) {

    'use strict';

    //////////////
    // Constants
    /////////////

    var LIBVERSION  = '0.7.27',
        EMPTY       = '',
        UNKNOWN     = '?',
        FUNC_TYPE   = 'function',
        UNDEF_TYPE  = 'undefined',
        OBJ_TYPE    = 'object',
        STR_TYPE    = 'string',
        MAJOR       = 'major',
        MODEL       = 'model',
        NAME        = 'name',
        TYPE        = 'type',
        VENDOR      = 'vendor',
        VERSION     = 'version',
        ARCHITECTURE= 'architecture',
        CONSOLE     = 'console',
        MOBILE      = 'mobile',
        TABLET      = 'tablet',
        SMARTTV     = 'smarttv',
        WEARABLE    = 'wearable',
        EMBEDDED    = 'embedded',
        UA_MAX_LENGTH = 255;

    var AMAZON  = 'Amazon',
        APPLE   = 'Apple',
        ASUS    = 'ASUS',
        BLACKBERRY = 'BlackBerry',
        BROWSER = 'Browser',
        CHROME  = 'Chrome',
        EDGE    = 'Edge',
        FIREFOX = 'Firefox',
        GOOGLE  = 'Google',
        HUAWEI  = 'Huawei',
        LG      = 'LG',
        MICROSOFT = 'Microsoft',
        MOTOROLA  = 'Motorola',
        OPERA   = 'Opera',
        SAMSUNG = 'Samsung',
        SONY    = 'Sony',
        XIAOMI  = 'Xiaomi',
        ZEBRA   = 'Zebra';

    ///////////
    // Helper
    //////////

    var extend = function (regexes, extensions) {
            var mergedRegexes = {};
            for (var i in regexes) {
                if (extensions[i] && extensions[i].length % 2 === 0) {
                    mergedRegexes[i] = extensions[i].concat(regexes[i]);
                } else {
                    mergedRegexes[i] = regexes[i];
                }
            }
            return mergedRegexes;
        },
        enumerize = function (arr) {
            var enums = {};
            for (var i in arr) {
                enums[arr[i].toUpperCase()] = arr[i];
            }
            return enums;
        },
        has = function (str1, str2) {
            return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
        },
        lowerize = function (str) {
            return str.toLowerCase();
        },
        majorize = function (version) {
            return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g, EMPTY).split('.')[0] : undefined;
        },
        trim = function (str, len) {
            str = str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, EMPTY);
            return typeof(len) === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
    };

    ///////////////
    // Map helper
    //////////////

    var rgxMapper = function (ua, arrays) {

            var i = 0, j, k, p, q, matches, match;

            // loop through all regexes maps
            while (i < arrays.length && !matches) {

                var regex = arrays[i],       // even sequence (0,2,4,..)
                    props = arrays[i + 1];   // odd sequence (1,3,5,..)
                j = k = 0;

                // try matching uastring with regexes
                while (j < regex.length && !matches) {

                    matches = regex[j++].exec(ua);

                    if (!!matches) {
                        for (p = 0; p < props.length; p++) {
                            match = matches[++k];
                            q = props[p];
                            // check if given property is actually array
                            if (typeof q === OBJ_TYPE && q.length > 0) {
                                if (q.length == 2) {
                                    if (typeof q[1] == FUNC_TYPE) {
                                        // assign modified match
                                        this[q[0]] = q[1].call(this, match);
                                    } else {
                                        // assign given value, ignore regex match
                                        this[q[0]] = q[1];
                                    }
                                } else if (q.length == 3) {
                                    // check whether function or regex
                                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                        // call function (usually string mapper)
                                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                                    } else {
                                        // sanitize match using given regex
                                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                                    }
                                } else if (q.length == 4) {
                                        this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                                }
                            } else {
                                this[q] = match ? match : undefined;
                            }
                        }
                    }
                }
                i += 2;
            }
        },

        strMapper = function (str, map) {

            for (var i in map) {
                // check if current value is array
                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                    for (var j = 0; j < map[i].length; j++) {
                        if (has(map[i][j], str)) {
                            return (i === UNKNOWN) ? undefined : i;
                        }
                    }
                } else if (has(map[i], str)) {
                    return (i === UNKNOWN) ? undefined : i;
                }
            }
            return str;
    };

    ///////////////
    // String map
    //////////////

    // Safari < 3.0
    var oldSafariMap = {
            '1.0'   : '/8',
            '1.2'   : '/1',
            '1.3'   : '/3',
            '2.0'   : '/412',
            '2.0.2' : '/416',
            '2.0.3' : '/417',
            '2.0.4' : '/419',
            '?'     : '/'
        },
        oldEdgeMap = {
            '0.1'   : '12.',
            '21'    : '13.',
            '31'    : '14.',
            '39'    : '15.',
            '41'    : '16.',
            '42'    : '17.',
            '44'    : '18.'
        },
        windowsVersionMap = {
            'ME'        : '4.90',
            'NT 3.11'   : 'NT3.51',
            'NT 4.0'    : 'NT4.0',
            '2000'      : 'NT 5.0',
            'XP'        : ['NT 5.1', 'NT 5.2'],
            'Vista'     : 'NT 6.0',
            '7'         : 'NT 6.1',
            '8'         : 'NT 6.2',
            '8.1'       : 'NT 6.3',
            '10'        : ['NT 6.4', 'NT 10.0'],
            'RT'        : 'ARM'
    };

    //////////////
    // Regex map
    /////////////

    var regexes = {

        browser : [[

            /\b(?:crmo|crios)\/([\w\.]+)/i                                      // Chrome for Android/iOS
            ], [VERSION, [NAME, CHROME]], [
            /(?:edgios|edga|edg)\/([\w\.]+)/i                                   // Microsoft Edge
            ], [VERSION, [NAME, EDGE]], [
            /edge\/([\w\.]+)/i                                                  // Old Edge (Trident)
            ], [[VERSION, strMapper, oldEdgeMap], [NAME, EDGE]], [

            // Presto based
            /(opera mini)\/([\w\.-]+)/i,                                        // Opera Mini
            /(opera [mobiletab]{3,6})\b.+version\/([\w\.-]+)/i,                 // Opera Mobi/Tablet
            /(opera)(?:.+version\/|[\/\s]+)([\w\.]+)/i,                         // Opera
            ], [NAME, VERSION], [
            /opios[\/\s]+([\w\.]+)/i                                            // Opera mini on iphone >= 8.0
            ], [VERSION, [NAME, OPERA+' Mini']], [
            /\bopr\/([\w\.]+)/i                                                 // Opera Webkit
            ], [VERSION, [NAME, OPERA]], [

            // Mixed
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,     // Lunascape/Maxthon/Netfront/Jasmine/Blazer
            // Trident based
            /(avant |iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i,              // Avant/IEMobile/SlimBrowser
            /(ba?idubrowser)[\/\s]?([\w\.]+)/i,                                 // Baidu Browser
            /(?:ms|\()(ie) ([\w\.]+)/i,                                         // Internet Explorer

            // Webkit/KHTML based                                               // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
            /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([\w\.-]+)/i,
                                                                                // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ, aka ShouQ
            /(weibo)__([\d\.]+)/i                                               // Weibo
            ], [NAME, VERSION], [
            /(?:\buc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i               // UCBrowser
            ], [VERSION, [NAME, 'UC'+BROWSER]], [
            /\bqbcore\/([\w\.]+)/i                                              // WeChat Desktop for Windows Built-in Browser
            ], [VERSION, [NAME, 'WeChat(Win) Desktop']], [
            /micromessenger\/([\w\.]+)/i                                        // WeChat
            ], [VERSION, [NAME, 'WeChat']], [
            /konqueror\/([\w\.]+)/i                                             // Konqueror
            ], [VERSION, [NAME, 'Konqueror']], [
            /trident.+rv[:\s]([\w\.]{1,9})\b.+like gecko/i                      // IE11
            ], [VERSION, [NAME, 'IE']], [
            /yabrowser\/([\w\.]+)/i                                             // Yandex
            ], [VERSION, [NAME, 'Yandex']], [
            /(avast|avg)\/([\w\.]+)/i                                           // Avast/AVG Secure Browser
            ], [[NAME, /(.+)/, '$1 Secure '+BROWSER], VERSION], [
            /\bfocus\/([\w\.]+)/i                                               // Firefox Focus
            ], [VERSION, [NAME, FIREFOX+' Focus']], [
            /\bopt\/([\w\.]+)/i                                                 // Opera Touch
            ], [VERSION, [NAME, OPERA+' Touch']], [
            /coc_coc\w+\/([\w\.]+)/i                                            // Coc Coc Browser
            ], [VERSION, [NAME, 'Coc Coc']], [
            /dolfin\/([\w\.]+)/i                                                // Dolphin
            ], [VERSION, [NAME, 'Dolphin']], [
            /coast\/([\w\.]+)/i                                                 // Opera Coast
            ], [VERSION, [NAME, OPERA+' Coast']], [
            /miuibrowser\/([\w\.]+)/i                                           // MIUI Browser
            ], [VERSION, [NAME, 'MIUI '+BROWSER]], [
            /fxios\/([\w\.-]+)/i                                                // Firefox for iOS
            ], [VERSION, [NAME, FIREFOX]], [
            /\bqihu|(qi?ho?o?|360)browser/i                                     // 360
            ], [[NAME, '360 '+BROWSER]], [
            /(oculus|samsung|sailfish)browser\/([\w\.]+)/i
            ], [[NAME, /(.+)/, '$1 '+BROWSER], VERSION], [                      // Oculus/Samsung/Sailfish Browser
            /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
            ], [[NAME, /_/g, ' '], VERSION], [
            /(electron)\/([\w\.]+) safari/i,                                    // Electron-based App
            /(tesla)(?:\sqtcarbrowser|\/(20\d\d\.[\w\.-]+))/i,                  // Tesla
            /m?(qqbrowser|baiduboxapp|2345Explorer)[\/\s]?([\w\.]+)/i           // QQBrowser/Baidu App/2345 Browser
            ], [NAME, VERSION], [
            /(metasr)[\/\s]?([\w\.]+)/i,                                        // SouGouBrowser
            /(lbbrowser)/i                                                      // LieBao Browser
            ], [NAME], [

            // WebView
            /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i       // Facebook App for iOS & Android
            ], [[NAME, 'Facebook'], VERSION], [
            /safari (line)\/([\w\.]+)/i,                                        // Line App for iOS
            /\b(line)\/([\w\.]+)\/iab/i,                                        // Line App for Android
            /(chromium|instagram)[\/\s]([\w\.-]+)/i                             // Chromium/Instagram
            ], [NAME, VERSION], [
            /\bgsa\/([\w\.]+)\s.*safari\//i                                     // Google Search Appliance on iOS
            ], [VERSION, [NAME, 'GSA']], [

            /headlesschrome(?:\/([\w\.]+)|\s)/i                                 // Chrome Headless
            ], [VERSION, [NAME, CHROME+' Headless']], [

            /\swv\).+(chrome)\/([\w\.]+)/i                                      // Chrome WebView
            ], [[NAME, CHROME+' WebView'], VERSION], [

            /droid.+\sversion\/([\w\.]+)\b.+(?:mobile safari|safari)/i          // Android Browser
            ], [VERSION, [NAME, 'Android '+BROWSER]], [

            /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i      // Chrome/OmniWeb/Arora/Tizen/Nokia
            ], [NAME, VERSION], [

            /version\/([\w\.]+)\s.*mobile\/\w+\s(safari)/i                      // Mobile Safari
            ], [VERSION, [NAME, 'Mobile Safari']], [
            /version\/([\w\.]+)\s.*(mobile\s?safari|safari)/i                   // Safari & Safari Mobile
            ], [VERSION, NAME], [
            /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i                     // Safari < 3.0
            ], [NAME, [VERSION, strMapper, oldSafariMap]], [

            /(webkit|khtml)\/([\w\.]+)/i
            ], [NAME, VERSION], [

            // Gecko based
            /(navigator|netscape)\/([\w\.-]+)/i                                 // Netscape
            ], [[NAME, 'Netscape'], VERSION], [
            /mobile vr; rv:([\w\.]+)\).+firefox/i                               // Firefox Reality
            ], [VERSION, [NAME, FIREFOX+' Reality']], [
            /ekiohf.+(flow)\/([\w\.]+)/i,                                       // Flow
            /(swiftfox)/i,                                                      // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/\s]?([\w\.\+]+)/i,
                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror/Klar
            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,
                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(firefox)\/([\w\.]+)/i,                                            // Other Firefox-based
            /(mozilla)\/([\w\.]+)\s.+rv\:.+gecko\/\d+/i,                        // Mozilla

            // Other
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
            /(links) \(([\w\.]+)/i,                                            // Links
            /(gobrowser)\/?([\w\.]*)/i,                                         // GoBrowser
            /(ice\s?browser)\/v?([\w\._]+)/i,                                   // ICE Browser
            /(mosaic)[\/\s]([\w\.]+)/i                                          // Mosaic
            ], [NAME, VERSION]
        ],

        cpu : [[

            /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i                     // AMD64 (x64)
            ], [[ARCHITECTURE, 'amd64']], [

            /(ia32(?=;))/i                                                      // IA32 (quicktime)
            ], [[ARCHITECTURE, lowerize]], [

            /((?:i[346]|x)86)[;\)]/i                                            // IA32 (x86)
            ], [[ARCHITECTURE, 'ia32']], [

            /\b(aarch64|armv?8e?l?)\b/i                                         // ARM64
            ], [[ARCHITECTURE, 'arm64']], [

            /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i                                   // ARMHF
            ], [[ARCHITECTURE, 'armhf']], [

            // PocketPC mistakenly identified as PowerPC
            /windows\s(ce|mobile); ppc;/i
            ], [[ARCHITECTURE, 'arm']], [

            /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i                           // PowerPC
            ], [[ARCHITECTURE, /ower/, EMPTY, lowerize]], [

            /(sun4\w)[;\)]/i                                                    // SPARC
            ], [[ARCHITECTURE, 'sparc']], [

            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?:64|(?=v(?:[1-7]|[5-7]1)l?|;|eabi))|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
                                                                                // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
            ], [[ARCHITECTURE, lowerize]]
        ],

        device : [[

            //////////////////////////
            // MOBILES & TABLETS
            // Ordered by popularity
            /////////////////////////

            // Samsung
            /\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
            ], [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]], [
            /\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i,
            /samsung[\s-]([\w-]+)/i,
            /sec-(sgh\w+)/i
            ], [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]], [

            // Apple
            /\((ip(?:hone|od)[\s\w]*);/i                                        // iPod/iPhone
            ], [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]], [
            /\((ipad);[\w\s\),;-]+apple/i,                                      // iPad
            /applecoremedia\/[\w\.]+ \((ipad)/i,
            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
            ], [MODEL, [VENDOR, APPLE], [TYPE, TABLET]], [

            // Huawei
            /\b((?:agr|ags[23]|bah2?|sht?)-a?[lw]\d{2})/i,
            ], [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]], [
            /huawei([\w\s-]+)[;\)]/i,
            /\b(nexus 6p|vog-[at]?l\d\d|ane-[at]?l[x\d]\d|eml-a?l\d\da?|lya-[at]?l\d[\dc]|clt-a?l\d\di?|ele-l\d\d)/i,
            /\b(\w{2,4}-[atu][ln][01259][019])[;\)\s]/i
            ], [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]], [

            // Xiaomi
            /\b(poco[\s\w]+)(?: bui|\))/i,                                      // Xiaomi POCO
            /\b;\s(\w+) build\/hm\1/i,                                          // Xiaomi Hongmi 'numeric' models
            /\b(hm[\s\-_]?note?[\s_]?(?:\d\w)?) bui/i,                          // Xiaomi Hongmi
            /\b(redmi[\s\-_]?(?:note|k)?[\w\s_]+)(?: bui|\))/i,                 // Xiaomi Redmi
            /\b(mi[\s\-_]?(?:a\d|one|one[\s_]plus|note lte)?[\s_]?(?:\d?\w?)[\s_]?(?:plus)?) bui/i  // Xiaomi Mi
            ], [[MODEL, /_/g, ' '], [VENDOR, XIAOMI], [TYPE, MOBILE]], [
            /\b(mi[\s\-_]?(?:pad)(?:[\w\s_]+))(?: bui|\))/i                     // Mi Pad tablets
            ],[[MODEL, /_/g, ' '], [VENDOR, XIAOMI], [TYPE, TABLET]], [

            // OPPO
            /; (\w+) bui.+ oppo/i,
            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007)\b/i
            ], [MODEL, [VENDOR, 'OPPO'], [TYPE, MOBILE]], [

            // Vivo
            /vivo (\w+)(?: bui|\))/i,
            /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
            ], [MODEL, [VENDOR, 'Vivo'], [TYPE, MOBILE]], [

            // Realme
            /\b(rmx[12]\d{3})(?: bui|;)/i
            ], [MODEL, [VENDOR, 'Realme'], [TYPE, MOBILE]], [

            // Motorola
            /\b(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w\s]+build\//i,
            /\bmot(?:orola)?[\s-](\w*)/i,
            /((?:moto[\s\w\(\)]+|xt\d{3,4}|nexus\s6)(?= bui|\)))/i
            ], [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]], [
            /\b(mz60\d|xoom[\s2]{0,2}) build\//i
            ], [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]], [

            // LG
            /((?=lg)?[vl]k\-?\d{3})\sbui|\s3\.[\s\w;-]{10}lg?-([06cv9]{3,4})/i
            ], [MODEL, [VENDOR, LG], [TYPE, TABLET]], [
            /(lm-?f100[nv]?|nexus\s[45])/i,
            /\blg[e;\s\/-]+((?!browser|netcast)\w+)/i,
            /\blg(\-?[\d\w]+)\sbui/i
            ], [MODEL, [VENDOR, LG], [TYPE, MOBILE]], [

            // Lenovo
            /(ideatab[\w\-\s]+)/i,
            /lenovo\s?(s[56]000[\w-]+|tab(?:[\s\w]+)|yt[\d\w-]{6}|tb[\d\w-]{6})/i
            ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [

            // Nokia
            /(?:maemo|nokia).*(n900|lumia \d+)/i,
            /nokia[\s_-]?([\w\.-]*)/i
            ], [[MODEL, /_/g, ' '], [VENDOR, 'Nokia'], [TYPE, MOBILE]], [

            // Google
            /(pixel c)\b/i                                                      // Google Pixel C
            ], [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]], [
            /droid.+; (pixel[\s\daxl]{0,6})(?: bui|\))/i                        // Google Pixel
            ], [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]], [

            // Sony
            /droid.+\s([c-g]\d{4}|so[-l]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
            ], [MODEL, [VENDOR, SONY], [TYPE, MOBILE]], [
            /sony tablet [ps]/i,
            /\b(?:sony)?sgp\w+(?: bui|\))/i
            ], [[MODEL, 'Xperia Tablet'], [VENDOR, SONY], [TYPE, TABLET]], [

            // OnePlus
            /\s(kb2005|in20[12]5|be20[12][59])\b/i,
            /\ba000(1) bui/i,
            /oneplus (a\d{4})[\s)]/i
            ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

            // Amazon
            /(alexa)webm/i,
            /(kf[a-z]{2}wi)( bui|\))/i,                                         // Kindle Fire without Silk
            /(kf[a-z]+)( bui|\)).+silk\//i                                      // Kindle Fire HD
            ], [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]], [
            /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i                     // Fire Phone
            ], [[MODEL, /(.+)/g, 'Fire Phone $1'], [VENDOR, AMAZON], [TYPE, MOBILE]], [

            // BlackBerry
            /(playbook);[\w\s\),;-]+(rim)/i                                     // BlackBerry PlayBook
            ], [MODEL, VENDOR, [TYPE, TABLET]], [
            /\b((?:bb[a-f]|st[hv])100-\d)/i,
            /\(bb10;\s(\w+)/i                                                   // BlackBerry 10
            ], [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]], [

            // Asus
            /(?:\b|asus_)(transfo[prime\s]{4,10}\s\w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
            ], [MODEL, [VENDOR, ASUS], [TYPE, TABLET]], [
            /\s(z[es]6[027][01][km][ls]|zenfone \d\w?)\b/i
            ], [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]], [

            // HTC
            /(nexus 9)/i                                                        // HTC Nexus 9
            ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [
            /(htc)[;_\s-]{1,2}([\w\s]+(?=\)| bui)|\w+)/i,                       // HTC

            // ZTE
            /(zte)-(\w*)/i,
            /(alcatel|geeksphone|nexian|panasonic|sony)[_\s-]?([\w-]*)/i        // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

            // Acer
            /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
            ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

            // Meizu
            /droid.+; (m[1-5] note) bui/i,
            /\bmz-([\w-]{2,})/i
            ], [MODEL, [VENDOR, 'Meizu'], [TYPE, MOBILE]], [

            // MIXED
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
                                                                                // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
            /(hp)\s([\w\s]+\w)/i,                                               // HP iPAQ
            /(asus)-?(\w+)/i,                                                   // Asus
            /(microsoft); (lumia[\s\w]+)/i,                                     // Microsoft Lumia
            /(lenovo)[_\s-]?([\w-]+)/i,                                         // Lenovo
            /(jolla)/i,                                                         // Jolla
            /(oppo)\s?([\w\s]+)\sbui/i                                          // OPPO
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /(archos) (gamepad2?)/i,                                            // Archos
            /(hp).+(touchpad(?!.+tablet)|tablet)/i,                             // HP TouchPad
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(nook)[\w\s]+build\/(\w+)/i,                                       // Nook
            /(dell) (strea[kpr\s\d]*[\dko])/i,                                  // Dell Streak
            /(le[\s\-]+pan)[\s\-]+(\w{1,9})\sbui/i,                             // Le Pan Tablets
            /(trinity)[\-\s]*(t\d{3})\sbui/i,                                   // Trinity Tablets
            /(gigaset)[\s\-]+(q\w{1,9})\sbui/i,                                 // Gigaset Tablets
            /(vodafone)\s([\w\s]+)(?:\)|\sbui)/i                                // Vodafone
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(surface duo)/i                                                    // Surface Duo
            ], [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]], [
            /droid\s[\d\.]+; (fp\du?) b/i                                       // Fairphone
            ], [MODEL, [VENDOR, 'Fairphone'], [TYPE, MOBILE]], [
            /(u304aa)/i                                                         // AT&T
            ], [MODEL, [VENDOR, 'AT&T'], [TYPE, MOBILE]], [
            /\bsie-(\w*)/i                                                      // Siemens
            ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [
            /\b(rct\w+) b/i                                                     // RCA Tablets
            ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [
            /\b(venue[\d\s]{2,7}) b/i                                           // Dell Venue Tablets
            ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [
            /\b(q(?:mv|ta)\w+) b/i                                              // Verizon Tablet
            ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [
            /\b(?:barnes[&\s]+noble |bn[rt])([\w\s\+]*) b/i                     // Barnes & Noble Tablet
            ], [MODEL, [VENDOR, 'Barnes & Noble'], [TYPE, TABLET]], [
            /\b(tm\d{3}\w+) b/i
            ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [
            /\b(k88) b/i                                                        // ZTE K Series Tablet
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [
            /\b(nx\d{3}j) b/i                                                   // ZTE Nubia
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [
            /\b(gen\d{3}) b.+49h/i                                              // Swiss GEN Mobile
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [
            /\b(zur\d{3}) b/i                                                   // Swiss ZUR Tablet
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [
            /\b((zeki)?tb.*\b) b/i                                              // Zeki Tablets
            ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [
            /\b([yr]\d{2}) b/i,
            /\b(dragon[\-\s]+touch |dt)(\w{5}) b/i                              // Dragon Touch Tablet
            ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [
            /\b(ns-?\w{0,9}) b/i                                                // Insignia Tablets
            ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [
            /\b((nxa|next)-?\w{0,9}) b/i                                        // NextBook Tablets
            ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [
            /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i                  // Voice Xtreme Phones
            ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [
            /\b(lvtel\-)?(v1[12]) b/i                                           // LvTel Phones
            ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [
            /\b(ph-1)\s/i                                                       // Essential PH-1
            ], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [
            /\b(v(100md|700na|7011|917g).*\b) b/i                               // Envizen Tablets
            ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [
            /\b(trio[\s\w\-\.]+) b/i                                            // MachSpeed Tablets
            ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [
            /\btu_(1491) b/i                                                    // Rotor Tablets
            ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [
            /(shield[\w\s]+) b/i                                                // Nvidia Shield Tablets
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, TABLET]], [
            /(sprint) (\w+)/i                                                   // Sprint Phones
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /(kin\.[onetw]{3})/i                                                // Microsoft Kin
            ], [[MODEL, /\./g, ' '], [VENDOR, MICROSOFT], [TYPE, MOBILE]], [
            /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i             // Zebra
            ], [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]], [
            /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
            ], [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]], [

            ///////////////////
            // CONSOLES
            ///////////////////

            /(ouya)/i,                                                          // Ouya
            /(nintendo) ([wids3utch]+)/i                                        // Nintendo
            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [
            /droid.+; (shield) bui/i                                            // Nvidia
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [
            /(playstation [345portablevi]+)/i                                   // Playstation
            ], [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]], [
            /\b(xbox(?: one)?(?!; xbox))[\s\);]/i                               // Microsoft Xbox
            ], [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]], [

            ///////////////////
            // SMARTTVS
            ///////////////////

            /smart-tv.+(samsung)/i                                              // Samsung
            ], [VENDOR, [TYPE, SMARTTV]], [
            /hbbtv.+maple;(\d+)/i
            ], [[MODEL, /^/, 'SmartTV'], [VENDOR, SAMSUNG], [TYPE, SMARTTV]], [
            /(?:nux; netcast.+smarttv|lg netcast\.tv-201\d)/i,                  // LG SmartTV
            ], [[VENDOR, LG], [TYPE, SMARTTV]], [
            /(apple)\s?tv/i                                                     // Apple TV
            ], [VENDOR, [MODEL, APPLE+' TV'], [TYPE, SMARTTV]], [
            /crkey/i                                                            // Google Chromecast
            ], [[MODEL, CHROME+'cast'], [VENDOR, GOOGLE], [TYPE, SMARTTV]], [
            /droid.+aft(\w)( bui|\))/i                                          // Fire TV
            ], [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]], [
            /\(dtv[\);].+(aquos)/i                                              // Sharp
            ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [
            /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i            // HbbTV devices
            ], [[VENDOR, trim], [MODEL, trim], [TYPE, SMARTTV]], [
            /\b(android tv|smart[-\s]?tv|opera tv|tv; rv:)\b/i                  // SmartTV from Unidentified Vendors
            ], [[TYPE, SMARTTV]], [

            ///////////////////
            // WEARABLES
            ///////////////////

            /((pebble))app/i                                                    // Pebble
            ], [VENDOR, MODEL, [TYPE, WEARABLE]], [
            /droid.+; (glass) \d/i                                              // Google Glass
            ], [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]], [
            /droid.+; (wt63?0{2,3})\)/i
            ], [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]], [

            ///////////////////
            // EMBEDDED
            ///////////////////

            /(tesla)(?: qtcarbrowser|\/[\w\.-]+)/i                              // Tesla
            ], [VENDOR, [TYPE, EMBEDDED]], [

            ////////////////////
            // MIXED (GENERIC)
            ///////////////////

            /droid .+?;\s([^;]+?)(?: bui|\) applew).+? mobile safari/i          // Android Phones from Unidentified Vendors
            ], [MODEL, [TYPE, MOBILE]], [
            /droid .+?;\s([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i      // Android Tablets from Unidentified Vendors
            ], [MODEL, [TYPE, TABLET]], [
            /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i,                     // Unidentifiable Tablet
            ], [[TYPE, TABLET]], [
            /(phone|mobile(?:[;\/]| safari))/i                                  // Unidentifiable Mobile
            ], [[TYPE, MOBILE]], [
            /(android[\w\.\s\-]{0,9});.+buil/i                                  // Generic Android Device
            ], [MODEL, [VENDOR, 'Generic']]
        ],

        engine : [[

            /windows.+ edge\/([\w\.]+)/i                                       // EdgeHTML
            ], [VERSION, [NAME, EDGE+'HTML']], [

            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i                         // Blink
            ], [VERSION, [NAME, 'Blink']], [

            /(presto)\/([\w\.]+)/i,                                             // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
            /ekioh(flow)\/([\w\.]+)/i,                                          // Flow
            /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,                          // KHTML/Tasman/Links
            /(icab)[\/\s]([23]\.[\d\.]+)/i                                      // iCab
            ], [NAME, VERSION], [

            /rv\:([\w\.]{1,9})\b.+(gecko)/i                                     // Gecko
            ], [VERSION, NAME]
        ],

        os : [[

            // Windows
            /microsoft (windows) (vista|xp)/i                                   // Windows (iTunes)
            ], [NAME, VERSION], [
            /(windows) nt 6\.2; (arm)/i,                                        // Windows RT
            /(windows phone(?: os)*)[\s\/]?([\d\.\s\w]*)/i,                     // Windows Phone
            /(windows mobile|windows)[\s\/]?([ntce\d\.\s]+[\w\.]+)(?!.+xbox)/i
            ], [NAME, [VERSION, strMapper, windowsVersionMap]], [
            /(win(?=3|9|n)|win 9x )([nt\d\.]+)/i
            ], [[NAME, 'Windows'], [VERSION, strMapper, windowsVersionMap]], [

            // iOS/macOS
            /ip[honead]{2,4}\b(?:.*os ([\w]+) like\smac|; opera)/i,             // iOS
            /cfnetwork\/.+darwin/i
            ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [
            /(mac os x)\s?([\w\s\.]*)/i,
            /(macintosh|mac(?=_powerpc) )(?!.+haiku)/i                          // Mac OS
            ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

            // Mobile OSes                                                      // Android/WebOS/Palm/QNX/Bada/RIM/Maemo/MeeGo/Contiki/Sailfish OS
            /(android|webos|palm os|qnx|bada|rim tablet os|maemo|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i,
            /(blackberry)\w*\/([\w\.]*)/i,                                      // Blackberry
            /(tizen|kaios)[\/\s]([\w\.]+)/i,                                    // Tizen/KaiOS
            /\((series40);/i                                                    // Series 40
            ], [NAME, VERSION], [
            /\(bb(10);/i                                                        // BlackBerry 10
            ], [VERSION, [NAME, BLACKBERRY]], [
            /(?:symbian\s?os|symbos|s60(?=;)|series60)[\/\s-]?([\w\.]*)/i       // Symbian
            ], [VERSION, [NAME, 'Symbian']], [
            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w\s]+); rv:.+ gecko\/([\w\.]+)/i // Firefox OS
            ], [VERSION, [NAME, FIREFOX+' OS']], [
            /web0s;.+rt(tv)/i,
            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i                              // WebOS
            ], [VERSION, [NAME, 'webOS']], [

            // Google Chromecast
            /crkey\/([\d\.]+)/i                                                 // Google Chromecast
            ], [VERSION, [NAME, CHROME+'cast']], [
            /(cros) [\w]+\s([\w\.]+\w)/i                                        // Chromium OS
            ], [[NAME, 'Chromium OS'], VERSION],[

            // Console
            /(nintendo|playstation) ([wids345portablevuch]+)/i,                 // Nintendo/Playstation
            /(xbox);\s+xbox ([^\);]+)/i,                                        // Microsoft Xbox (360, One, X, S, Series X, Series S)

            // GNU/Linux based
            /(mint)[\/\s\(\)]?(\w*)/i,                                          // Mint
            /(mageia|vectorlinux)[;\s]/i,                                       // Mageia/VectorLinux
            /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus|raspbian)(?: gnu\/linux)?(?: linux)?[\/\s-]?(?!chrom|package)([\w\.-]*)/i,
                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
            /(hurd|linux)\s?([\w\.]*)/i,                                        // Hurd/Linux
            /(gnu)\s?([\w\.]*)/i,                                               // GNU

            // BSD based
            /\b([frentopc-]{0,4}bsd|dragonfly)\s?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,  // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
            /(haiku)\s(\w+)/i                                                   // Haiku
            ], [NAME, VERSION], [

            // Other
            /(sunos)\s?([\w\.\d]*)/i                                            // Solaris
            ], [[NAME, 'Solaris'], VERSION], [
            /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,                             // Solaris
            /(aix) ((\d)(?=\.|\)|\s)[\w\.])*/i,                                 // AIX
            /(plan 9|minix|beos|os\/2|amigaos|morphos|risc os|openvms|fuchsia)/i,  // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS/Fuchsia
            /(unix)\s?([\w\.]*)/i                                               // UNIX
            ], [NAME, VERSION]
        ]
    };

    /////////////////
    // Constructor
    ////////////////

    var UAParser = function (ua, extensions) {

        if (typeof ua === OBJ_TYPE) {
            extensions = ua;
            ua = undefined;
        }

        if (!(this instanceof UAParser)) {
            return new UAParser(ua, extensions).getResult();
        }

        var _ua = ua || ((typeof window !== UNDEF_TYPE && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
        var _rgxmap = extensions ? extend(regexes, extensions) : regexes;

        this.getBrowser = function () {
            var _browser = {};
            _browser[NAME] = undefined;
            _browser[VERSION] = undefined;
            rgxMapper.call(_browser, _ua, _rgxmap.browser);
            _browser.major = majorize(_browser.version);
            return _browser;
        };
        this.getCPU = function () {
            var _cpu = {};
            _cpu[ARCHITECTURE] = undefined;
            rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
            return _cpu;
        };
        this.getDevice = function () {
            var _device = {};
            _device[VENDOR] = undefined;
            _device[MODEL] = undefined;
            _device[TYPE] = undefined;
            rgxMapper.call(_device, _ua, _rgxmap.device);
            return _device;
        };
        this.getEngine = function () {
            var _engine = {};
            _engine[NAME] = undefined;
            _engine[VERSION] = undefined;
            rgxMapper.call(_engine, _ua, _rgxmap.engine);
            return _engine;
        };
        this.getOS = function () {
            var _os = {};
            _os[NAME] = undefined;
            _os[VERSION] = undefined;
            rgxMapper.call(_os, _ua, _rgxmap.os);
            return _os;
        };
        this.getResult = function () {
            return {
                ua      : this.getUA(),
                browser : this.getBrowser(),
                engine  : this.getEngine(),
                os      : this.getOS(),
                device  : this.getDevice(),
                cpu     : this.getCPU()
            };
        };
        this.getUA = function () {
            return _ua;
        };
        this.setUA = function (ua) {
            _ua = (typeof ua === STR_TYPE && ua.length > UA_MAX_LENGTH) ? trim(ua, UA_MAX_LENGTH) : ua;
            return this;
        };
        this.setUA(_ua);
        return this;
    };

    UAParser.VERSION = LIBVERSION;
    UAParser.BROWSER =  enumerize([NAME, VERSION, MAJOR]);
    UAParser.CPU = enumerize([ARCHITECTURE]);
    UAParser.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
    UAParser.ENGINE = UAParser.OS = enumerize([NAME, VERSION]);

    ///////////
    // Export
    //////////

    // check js environment
    if (typeof(exports) !== UNDEF_TYPE) {
        // nodejs env
        if (typeof module !== UNDEF_TYPE && module.exports) {
            exports = module.exports = UAParser;
        }
        exports.UAParser = UAParser;
    } else {
        // requirejs env (optional)
        if (typeof(define) === FUNC_TYPE && define.amd) {
            define(function () {
                return UAParser;
            });
        } else if (typeof window !== UNDEF_TYPE) {
            // browser env
            window.UAParser = UAParser;
        }
    }

    // jQuery/Zepto specific (optional)
    // Note:
    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
    //   and we should catch that.
    var $ = typeof window !== UNDEF_TYPE && (window.jQuery || window.Zepto);
    if ($ && !$.ua) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function () {
            return parser.getUA();
        };
        $.ua.set = function (ua) {
            parser.setUA(ua);
            var result = parser.getResult();
            for (var prop in result) {
                $.ua[prop] = result[prop];
            }
        };
    }

})(typeof window === 'object' ? window : this);
