/*!
 * UAParser.js v0.7.19
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2016 Faisal Salman <fyzlman@gmail.com>
 * Dual licensed under GPLv2 or MIT
 */
!function(i,s){"use strict";var e="0.7.19",o="",a="?",n="function",r="undefined",d="object",t="string",l="major",w="model",u="name",m="type",c="vendor",b="version",p="architecture",g="console",f="mobile",h="tablet",S="smarttv",v="wearable",A="embedded",x={extend:function(i,s){var e={};for(var o in i)s[o]&&s[o].length%2===0?e[o]=s[o].concat(i[o]):e[o]=i[o];return e},has:function(i,s){return"string"==typeof i&&s.toLowerCase().indexOf(i.toLowerCase())!==-1},lowerize:function(i){return i.toLowerCase()},major:function(i){return typeof i===t?i.replace(/[^\d\.]/g,"").split(".")[0]:s},trim:function(i){return i.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}},T={rgx:function(i,e){for(var o,a,r,t,l,w,u=0;u<e.length&&!l;){var m=e[u],c=e[u+1];for(o=a=0;o<m.length&&!l;)if(l=m[o++].exec(i))for(r=0;r<c.length;r++)w=l[++a],t=c[r],typeof t===d&&t.length>0?2==t.length?typeof t[1]==n?this[t[0]]=t[1].call(this,w):this[t[0]]=t[1]:3==t.length?typeof t[1]!==n||t[1].exec&&t[1].test?this[t[0]]=w?w.replace(t[1],t[2]):s:this[t[0]]=w?t[1].call(this,w,t[2]):s:4==t.length&&(this[t[0]]=w?t[3].call(this,w.replace(t[1],t[2])):s):this[t]=w?w:s;u+=2}},str:function(i,e){for(var o in e)if(typeof e[o]===d&&e[o].length>0){for(var n=0;n<e[o].length;n++)if(x.has(e[o][n],i))return o===a?s:o}else if(x.has(e[o],i))return o===a?s:o;return i}},y={browser:{oldsafari:{version:{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}}},device:{amazon:{model:{"Fire Phone":["SD","KF"]}},sprint:{model:{"Evo Shift 4G":"7373KT"},vendor:{HTC:"APA",Sprint:"Sprint"}}},os:{windows:{version:{ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2000:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"}}}},k={browser:[[/(opera\smini)\/([\w\.-]+)/i,/(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,/(opera).+version\/([\w\.]+)/i,/(opera)[\/\s]+([\w\.]+)/i],[u,b],[/(opios)[\/\s]+([\w\.]+)/i],[[u,"Opera Mini"],b],[/\s(opr)\/([\w\.]+)/i],[[u,"Opera"],b],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,/(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,/(?:ms|\()(ie)\s([\w\.]+)/i,/(rekonq)\/([\w\.]*)/i,/(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i],[u,b],[/(konqueror)\/([\w\.]+)/i],[[u,"Konqueror"],b],[/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],[[u,"IE"],b],[/(edge|edgios|edga)\/((\d+)?[\w\.]+)/i],[[u,"Edge"],b],[/(yabrowser)\/([\w\.]+)/i],[[u,"Yandex"],b],[/(puffin)\/([\w\.]+)/i],[[u,"Puffin"],b],[/(focus)\/([\w\.]+)/i],[[u,"Firefox Focus"],b],[/(opt)\/([\w\.]+)/i],[[u,"Opera Touch"],b],[/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],[[u,"UCBrowser"],b],[/(comodo_dragon)\/([\w\.]+)/i],[[u,/_/g," "],b],[/(micromessenger)\/([\w\.]+)/i],[[u,"WeChat"],b],[/(brave)\/([\w\.]+)/i],[[u,"Brave"],b],[/(qqbrowserlite)\/([\w\.]+)/i],[u,b],[/(QQ)\/([\d\.]+)/i],[u,b],[/m?(qqbrowser)[\/\s]?([\w\.]+)/i],[u,b],[/(BIDUBrowser)[\/\s]?([\w\.]+)/i],[u,b],[/(2345Explorer)[\/\s]?([\w\.]+)/i],[u,b],[/(MetaSr)[\/\s]?([\w\.]+)/i],[u],[/(LBBROWSER)/i],[u],[/xiaomi\/miuibrowser\/([\w\.]+)/i],[b,[u,"MIUI Browser"]],[/;fbav\/([\w\.]+);/i],[b,[u,"Facebook"]],[/safari\s(line)\/([\w\.]+)/i,/android.+(line)\/([\w\.]+)\/iab/i],[u,b],[/headlesschrome(?:\/([\w\.]+)|\s)/i],[b,[u,"Chrome Headless"]],[/\swv\).+(chrome)\/([\w\.]+)/i],[[u,/(.+)/,"$1 WebView"],b],[/((?:oculus|samsung)browser)\/([\w\.]+)/i],[[u,/(.+(?:g|us))(.+)/,"$1 $2"],b],[/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],[b,[u,"Android Browser"]],[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],[u,b],[/(dolfin)\/([\w\.]+)/i],[[u,"Dolphin"],b],[/((?:android.+)crmo|crios)\/([\w\.]+)/i],[[u,"Chrome"],b],[/(coast)\/([\w\.]+)/i],[[u,"Opera Coast"],b],[/fxios\/([\w\.-]+)/i],[b,[u,"Firefox"]],[/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],[b,[u,"Mobile Safari"]],[/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],[b,u],[/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[[u,"GSA"],b],[/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[u,[b,T.str,y.browser.oldsafari.version]],[/(webkit|khtml)\/([\w\.]+)/i],[u,b],[/(navigator|netscape)\/([\w\.-]+)/i],[[u,"Netscape"],b],[/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,/(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,/(links)\s\(([\w\.]+)/i,/(gobrowser)\/?([\w\.]*)/i,/(ice\s?browser)\/v?([\w\._]+)/i,/(mosaic)[\/\s]([\w\.]+)/i],[u,b]],cpu:[[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],[[p,"amd64"]],[/(ia32(?=;))/i],[[p,x.lowerize]],[/((?:i[346]|x)86)[;\)]/i],[[p,"ia32"]],[/windows\s(ce|mobile);\sppc;/i],[[p,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],[[p,/ower/,"",x.lowerize]],[/(sun4\w)[;\)]/i],[[p,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],[[p,x.lowerize]]],device:[[/(KFKAWI)/i],[[w,"Kindle Fire HD 8 (2018)"],[c,"Amazon"],[m,h]],[/(KFSUWI)/i],[[w,"Kindle Fire HD 10 (2017)"],[c,"Amazon"],[m,h]],[/(KFAUWI)/i],[[w,"Kindle Fire (2017)"],[c,"Amazon"],[m,h]],[/(KFDOWI)/i],[[w,"Kindle Fire HD 8 (2017)"],[c,"Amazon"],[m,h]],[/(KFGIWI)/i],[[w,"Kindle Fire HD 8 (2016)"],[c,"Amazon"],[m,h]],[/(KFFOWI)/i],[[w,"Kindle Fire (2015)"],[c,"Amazon"],[m,h]],[/(KFMEWI)/i],[[w,"Kindle Fire HD 8 (2015)"],[c,"Amazon"],[m,h]],[/(KFTBWI)/i],[[w,"Kindle Fire HD 10 (2015)"],[c,"Amazon"],[m,h]],[/(KFARWI)/i],[[w,"Kindle Fire HD 6 (2014)"],[c,"Amazon"],[m,h]],[/(KFASWI)/i],[[w,"Kindle Fire HD 7 (2014"],[c,"Amazon"],[m,h]],[/(KFSAWI)/i],[[w,"Kindle Fire HDX 8.9 (2014)"],[c,"Amazon"],[m,h]],[/(KFSAWA)/i],[[w,"Kindle Fire HDX 8.9 (2014)(WAN)"],[c,"Amazon"],[m,h]],[/(KFAPWI)/i],[[w,"Kindle Fire HDX 8.9 (2013)"],[c,"Amazon"],[m,h]],[/(KFAPWA)/i],[[w,"Kindle Fire HDX 8.9 (2013)(WAN)"],[c,"Amazon"],[m,h]],[/(KFTHWI)/i],[[w,"Kindle Fire HDX (2013)"],[c,"Amazon"],[m,h]],[/(KFTHWA)/i],[[w,"Kindle Fire HDX (2013)(WAN)"],[c,"Amazon"],[m,h]],[/(KFSOWI)/i],[[w,"Kindle Fire HD (2013)"],[c,"Amazon"],[m,h]],[/(KFJWI)/i],[[w,"Kindle Fire HD 8.9 (2012)"],[c,"Amazon"],[m,h]],[/(KFJWA)/i],[[w,"Kindle Fire HD 8.9 (2012)(WAN)"],[c,"Amazon"],[m,h]],[/(KFTT)/i],[[w,"Kindle Fire HD 7 (2012)"],[c,"Amazon"],[m,h]],[/(KFOT)/i],[[w,"Kindle Fire (2012)"],[c,"Amazon"],[m,h]],[/(Kindle Fire)/i],[[w,"Kindle Fire (2011)"],[c,"Amazon"],[m,h]],[/(SM-G892A)/i],[[w,"Galaxy S8"],[c,"Samsung"],[m,f]],[/(SM-930VC)/i],[[w,"Galaxy S7"],[c,"Samsung"],[m,f]],[/(SM-G935S)/i],[[w,"Galaxy S7 Edge"],[c,"Samsung"],[m,f]],[/(SM-G920V)/i],[[w,"Galaxy S6"],[c,"Samsung"],[m,f]],[/(SM-G928X)/i],[[w,"Galaxy S6 Edge Plus"],[c,"Samsung"],[m,f]],[/(SM-G900[F|H])/i],[[w,"Galaxy S5"],[c,"Samsung"],[m,f]],[/(SM-G800F)/i],[[w,"Galaxy S5 Mini"],[c,"Samsung"],[m,f]],[/(SM-G7102)/i],[[w,"Galaxy Grand 2"],[c,"Samsung"],[m,f]],[/(SM-G530H)/i],[[w,"Galaxy Grand Prime"],[c,"Samsung"],[m,f]],[/(SM-G313HZ)/i],[[w,"Galaxy V"],[c,"Samsung"],[m,f]],[/(Nexus 6P)/i],[[w,"Nexus 6P"],[c,"Huawei"],[m,f]],[/(G8231)/i],[[w,"Xperia XZ"],[c,"Sony"],[m,f]],[/(E6653)/i],[[w,"Xperia Z5"],[c,"Sony"],[m,f]],[/(C6903)/i],[[w,"Xperia Z1"],[c,"Sony"],[m,f]],[/(C6603)/i],[[w,"Xperia Z"],[c,"Sony"],[m,f]],[/(ADVAN S4A)/i],[[w,"Vandroid S4A"],[c,"Advan"],[m,f]],[/(V972M)/i],[[w,"Leo S1"],[c,"ZTE"],[m,f]],[/(IQ6.3)/i],[[w,"IQ 6.3"],[c,"i-mobile"],[m,f]],[/(RM-1152)/i],[[w,"Lumia 650"],[c,"Microsoft"],[m,f]],[/(RM-1127_16056)/i],[[w,"Lumia 550"],[c,"Microsoft"],[m,f]],[/(SM-T827R4)/i],[[w,"Galaxy Tab S3"],[c,"Samsung"],[m,h]],[/(SM-T805)/i],[[w,"Galaxy Tab S 10.5"],[c,"Samsung"],[m,h]],[/(SM-T550)/i],[[w,"Galaxy Tab A"],[c,"Samsung"],[m,h]],[/(SM-T311)/i],[[w,"Galaxy Tab 3 8.0"],[c,"Samsung"],[m,h]],[/(T3C)/i],[[w,"Vandroid T3C"],[c,"Advan"],[m,h]],[/(ADVAN T1J\+)/i],[[w,"Vandroid T1J+"],[c,"Advan"],[m,h]],[/(SGP771)/i],[[w,"Xperia Z4"],[c,"Sony"],[m,h]],[/(LG-V410)/i],[[w,"G Pad 7.0"],[c,"LG"],[m,h]],[/(AFTS)/i],[[w,"4K Fire TV"],[c,"Amazon"],[m,S]],[/\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i],[w,c,[m,h]],[/applecoremedia\/[\w\.]+ \((ipad)/],[w,[c,"Apple"],[m,h]],[/(apple\s{0,1}tv)/i],[[w,"Apple TV"],[c,"Apple"]],[/(archos)\s(gamepad2?)/i,/(hp).+(touchpad)/i,/(hp).+(tablet)/i,/(kindle)\/([\w\.]+)/i,/\s(nook)[\w\s]+build\/(\w+)/i,/(dell)\s(strea[kpr\s\d]*[\dko])/i],[c,w,[m,h]],[/(kf[A-z]+)\sbuild\/.+silk\//i],[w,[c,"Amazon"],[m,h]],[/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i],[[w,T.str,y.device.amazon.model],[c,"Amazon"],[m,f]],[/android.+aft([bms])\sbuild/i],[w,[c,"Amazon"],[m,S]],[/\((ip[honed|\s\w*]+);.+(apple)/i],[w,c,[m,f]],[/\((ip[honed|\s\w*]+);/i],[w,[c,"Apple"],[m,f]],[/(blackberry)[\s-]?(\w+)/i,/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,/(hp)\s([\w\s]+\w)/i,/(asus)-?(\w+)/i],[c,w,[m,f]],[/\(bb10;\s(\w+)/i],[w,[c,"BlackBerry"],[m,f]],[/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i],[w,[c,"Asus"],[m,h]],[/(sony)\s(tablet\s[ps])\sbuild\//i,/(sony)?(?:sgp.+)\sbuild\//i],[[c,"Sony"],[w,"Xperia Tablet"],[m,h]],[/android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[w,[c,"Sony"],[m,f]],[/\s(ouya)\s/i,/(nintendo)\s([wids3u]+)/i],[c,w,[m,g]],[/android.+;\s(shield)\sbuild/i],[w,[c,"Nvidia"],[m,g]],[/(playstation\s[34portablevi]+)/i],[w,[c,"Sony"],[m,g]],[/(sprint\s(\w+))/i],[[c,T.str,y.device.sprint.vendor],[w,T.str,y.device.sprint.model],[m,f]],[/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],[c,w,[m,h]],[/(htc)[;_\s-]+([\w\s]+(?=\)|\sbuild)|\w+)/i,/(zte)-(\w*)/i,/(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i],[c,[w,/_/g," "],[m,f]],[/(nexus\s9)/i],[w,[c,"HTC"],[m,h]],[/d\/huawei([\w\s-]+)[;\)]/i,/(nexus\s6p)/i],[w,[c,"Huawei"],[m,f]],[/(microsoft);\s(lumia[\s\w]+)/i],[c,w,[m,f]],[/[\s\(;](xbox(?:\sone)?)[\s\);]/i],[w,[c,"Microsoft"],[m,g]],[/(kin\.[onetw]{3})/i],[[w,/\./g," "],[c,"Microsoft"],[m,f]],[/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,/mot[\s-]?(\w*)/i,/(XT\d{3,4}) build\//i,/(nexus\s6)/i],[w,[c,"Motorola"],[m,f]],[/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],[w,[c,"Motorola"],[m,h]],[/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],[[c,x.trim],[w,x.trim],[m,S]],[/hbbtv.+maple;(\d+)/i],[[w,/^/,"SmartTV"],[c,"Samsung"],[m,S]],[/\(dtv[\);].+(aquos)/i],[w,[c,"Sharp"],[m,S]],[/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,/((SM-T\w+))/i],[[c,"Samsung"],w,[m,h]],[/smart-tv.+(samsung)/i],[c,[m,S],w],[/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,/(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,/sec-((sgh\w+))/i],[[c,"Samsung"],w,[m,f]],[/sie-(\w*)/i],[w,[c,"Siemens"],[m,f]],[/(maemo|nokia).*(n900|lumia\s\d+)/i,/(nokia)[\s_-]?([\w-]*)/i],[[c,"Nokia"],w,[m,f]],[/android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i],[w,[c,"Acer"],[m,h]],[/android.+([vl]k\-?\d{3})\s+build/i],[w,[c,"LG"],[m,h]],[/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],[[c,"LG"],w,[m,h]],[/(lg) netcast\.tv/i],[c,w,[m,S]],[/(nexus\s[45])/i,/lg[e;\s\/-]+(\w*)/i,/android.+lg(\-?[\d\w]+)\s+build/i],[w,[c,"LG"],[m,f]],[/android.+(ideatab[a-z0-9\-\s]+)/i],[w,[c,"Lenovo"],[m,h]],[/linux;.+((jolla));/i],[c,w,[m,f]],[/((pebble))app\/[\d\.]+\s/i],[c,w,[m,v]],[/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i],[c,w,[m,f]],[/crkey/i],[[w,"Chromecast"],[c,"Google"]],[/android.+;\s(glass)\s\d/i],[w,[c,"Google"],[m,v]],[/android.+;\s(pixel c)[\s)]/i],[w,[c,"Google"],[m,h]],[/android.+;\s(pixel( [23])?( xl)?)\s/i],[w,[c,"Google"],[m,f]],[/android.+;\s(\w+)\s+build\/hm\1/i,/android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,/android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,/android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i],[[w,/_/g," "],[c,"Xiaomi"],[m,f]],[/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i],[[w,/_/g," "],[c,"Xiaomi"],[m,h]],[/android.+;\s(m[1-5]\snote)\sbuild/i],[w,[c,"Meizu"],[m,h]],[/(mz)-([\w-]{2,})/i],[[c,"Meizu"],w,[m,f]],[/android.+a000(1)\s+build/i,/android.+oneplus\s(a\d{4})\s+build/i],[w,[c,"OnePlus"],[m,f]],[/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i],[w,[c,"RCA"],[m,h]],[/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i],[w,[c,"Dell"],[m,h]],[/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i],[w,[c,"Verizon"],[m,h]],[/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i],[[c,"Barnes & Noble"],w,[m,h]],[/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i],[w,[c,"NuVision"],[m,h]],[/android.+;\s(k88)\sbuild/i],[w,[c,"ZTE"],[m,h]],[/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i],[w,[c,"Swiss"],[m,f]],[/android.+[;\/]\s*(zur\d{3})\s+build/i],[w,[c,"Swiss"],[m,h]],[/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i],[w,[c,"Zeki"],[m,h]],[/(android).+[;\/]\s+([YR]\d{2})\s+build/i,/android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i],[[c,"Dragon Touch"],w,[m,h]],[/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i],[w,[c,"Insignia"],[m,h]],[/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i],[w,[c,"NextBook"],[m,h]],[/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i],[[c,"Voice"],w,[m,f]],[/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i],[[c,"LvTel"],w,[m,f]],[/android.+;\s(PH-1)\s/i],[w,[c,"Essential"],[m,f]],[/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i],[w,[c,"Envizen"],[m,h]],[/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i],[c,w,[m,h]],[/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i],[w,[c,"MachSpeed"],[m,h]],[/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i],[c,w,[m,h]],[/android.+[;\/]\s*TU_(1491)\s+build/i],[w,[c,"Rotor"],[m,h]],[/android.+(KS(.+))\s+build/i],[w,[c,"Amazon"],[m,h]],[/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i],[c,w,[m,h]],[/\s(tablet|tab)[;\/]/i,/\s(mobile)(?:[;\/]|\ssafari)/i],[[m,x.lowerize],c,w],[/[\s\/\(](smart-?tv)[;\)]/i],[[m,S]],[/(android[\w\.\s\-]{0,9});.+build/i],[w,[c,"Generic"]]],engine:[[/windows.+\sedge\/([\w\.]+)/i],[b,[u,"EdgeHTML"]],[/webkit\/537\.36.+chrome\/(?!27)/i],[[u,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,/(icab)[\/\s]([23]\.[\d\.]+)/i],[u,b],[/rv\:([\w\.]{1,9}).+(gecko)/i],[b,u]],os:[[/microsoft\s(windows)\s(vista|xp)/i],[u,b],[/(windows)\snt\s6\.2;\s(arm)/i,/(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,/(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],[u,[b,T.str,y.os.windows.version]],[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],[[u,"Windows"],[b,T.str,y.os.windows.version]],[/\((bb)(10);/i],[[u,"BlackBerry"],b],[/(blackberry)\w*\/?([\w\.]*)/i,/(tizen)[\/\s]([\w\.]+)/i,/(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]*)/i,/linux;.+(sailfish);/i],[u,b],[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i],[[u,"Symbian"],b],[/\((series40);/i],[u],[/mozilla.+\(mobile;.+gecko.+firefox/i],[[u,"Firefox OS"],b],[/(nintendo|playstation)\s([wids34portablevu]+)/i,/(mint)[\/\s\(]?(\w*)/i,/(mageia|vectorlinux)[;\s]/i,/(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,/(hurd|linux)\s?([\w\.]*)/i,/(gnu)\s?([\w\.]*)/i],[u,b],[/(cros)\s[\w]+\s([\w\.]+\w)/i],[[u,"Chromium OS"],b],[/(sunos)\s?([\w\.\d]*)/i],[[u,"Solaris"],b],[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i],[u,b],[/(haiku)\s(\w+)/i],[u,b],[/cfnetwork\/.+darwin/i,/ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i],[[b,/_/g,"."],[u,"iOS"]],[/(mac\sos\sx)\s?([\w\s\.]*)/i,/(macintosh|mac(?=_powerpc)\s)/i],[[u,"Mac OS"],[b,/_/g,"."]],[/((?:open)?solaris)[\/\s-]?([\w\.]*)/i,/(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,/(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,/(unix)\s?([\w\.]*)/i],[u,b]]},F=function(e,a){if("object"==typeof e&&(a=e,e=s),!(this instanceof F))return new F(e,a).getResult();var n=e||(i&&i.navigator&&i.navigator.userAgent?i.navigator.userAgent:o),r=a?x.extend(k,a):k;return this.getBrowser=function(){var i={name:s,version:s};return T.rgx.call(i,n,r.browser),i.major=x.major(i.version),i},this.getCPU=function(){var i={architecture:s};return T.rgx.call(i,n,r.cpu),i},this.getDevice=function(){var i={vendor:s,model:s,type:s};return T.rgx.call(i,n,r.device),i},this.getEngine=function(){var i={name:s,version:s};return T.rgx.call(i,n,r.engine),i},this.getOS=function(){var i={name:s,version:s};return T.rgx.call(i,n,r.os),i},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return n},this.setUA=function(i){return n=i,this},this};F.VERSION=e,F.BROWSER={NAME:u,MAJOR:l,VERSION:b},F.CPU={ARCHITECTURE:p},F.DEVICE={MODEL:w,VENDOR:c,TYPE:m,CONSOLE:g,MOBILE:f,SMARTTV:S,TABLET:h,WEARABLE:v,EMBEDDED:A},F.ENGINE={NAME:u,VERSION:b},F.OS={NAME:u,VERSION:b},typeof exports!==r?(typeof module!==r&&module.exports&&(exports=module.exports=F),exports.UAParser=F):typeof define===n&&define.amd?define(function(){return F}):i&&(i.UAParser=F);var z=i&&(i.jQuery||i.Zepto);if(typeof z!==r&&!z.ua){var K=new F;z.ua=K.getResult(),z.ua.get=function(){return K.getUA()},z.ua.set=function(i){K.setUA(i);var s=K.getResult();for(var e in s)z.ua[e]=s[e]}}}("object"==typeof window?window:this);