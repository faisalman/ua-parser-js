/* UAParser.js v0.7.39
   Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
   MIT License */
!function(s,l){"use strict";function i(i){for(var e={},o=0;o<i.length;o++)e[i[o].toUpperCase()]=i[o];return e}function r(i,e){return typeof i==p&&-1!==Z(e).indexOf(Z(i))}function b(i,e){if(typeof i==p)return i=i.replace(/^\s\s*/,""),typeof e==d?i:i.substring(0,500)}function w(i,e){for(var o,a,r,t,n,s=0;s<e.length&&!t;){for(var b=e[s],w=e[s+1],d=o=0;d<b.length&&!t&&b[d];)if(t=b[d++].exec(i))for(a=0;a<w.length;a++)n=t[++o],typeof(r=w[a])==u&&0<r.length?2===r.length?typeof r[1]==c?this[r[0]]=r[1].call(this,n):this[r[0]]=r[1]:3===r.length?typeof r[1]!=c||r[1].exec&&r[1].test?this[r[0]]=n?n.replace(r[1],r[2]):l:this[r[0]]=n?r[1].call(this,n,r[2]):l:4===r.length&&(this[r[0]]=n?r[3].call(this,n.replace(r[1],r[2])):l):this[r]=n||l;s+=2}}function e(i,e){for(var o in e)if(typeof e[o]==u&&0<e[o].length){for(var a=0;a<e[o].length;a++)if(r(e[o][a],i))return"?"===o?l:o}else if(r(e[o],i))return"?"===o?l:o;return e.hasOwnProperty("*")?e["*"]:i}var c="function",d="undefined",u="object",p="string",m="major",h="model",f="name",g="type",v="vendor",x="version",k="architecture",o="console",y="mobile",_="tablet",a="smarttv",t="wearable",n="embedded",T="Amazon",S="Apple",q="ASUS",z="BlackBerry",N="Browser",A="Chrome",O="Firefox",E="Google",C="Huawei",U="LG",P="Microsoft",j="Motorola",B="Opera",M="Samsung",R="Sharp",D="Sony",V="Xiaomi",I="Zebra",G="Facebook",L="Chromium OS",F="Mac OS",H=" Browser",Z=function(i){return i.toLowerCase()},$={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"},W={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[x,[f,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[x,[f,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[f,x],[/opios[\/ ]+([\w\.]+)/i],[x,[f,B+" Mini"]],[/\bop(?:rg)?x\/([\w\.]+)/i],[x,[f,B+" GX"]],[/\bopr\/([\w\.]+)/i],[x,[f,B]],[/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],[x,[f,"Baidu"]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[\/ ]?([\w\.]*)/i,/(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio)\/([-\w\.]+)/i,/(heytap|ovi)browser\/([\d\.]+)/i,/(weibo)__([\d\.]+)/i],[f,x],[/quark(?:pc)?\/([-\w\.]+)/i],[x,[f,"Quark"]],[/\bddg\/([\w\.]+)/i],[x,[f,"DuckDuckGo"]],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[x,[f,"UC"+N]],[/microm.+\bqbcore\/([\w\.]+)/i,/\bqbcore\/([\w\.]+).+microm/i,/micromessenger\/([\w\.]+)/i],[x,[f,"WeChat"]],[/konqueror\/([\w\.]+)/i],[x,[f,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[x,[f,"IE"]],[/ya(?:search)?browser\/([\w\.]+)/i],[x,[f,"Yandex"]],[/slbrowser\/([\w\.]+)/i],[x,[f,"Smart Lenovo "+N]],[/(avast|avg)\/([\w\.]+)/i],[[f,/(.+)/,"$1 Secure "+N],x],[/\bfocus\/([\w\.]+)/i],[x,[f,O+" Focus"]],[/\bopt\/([\w\.]+)/i],[x,[f,B+" Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[x,[f,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[x,[f,"Dolphin"]],[/coast\/([\w\.]+)/i],[x,[f,B+" Coast"]],[/miuibrowser\/([\w\.]+)/i],[x,[f,"MIUI "+N]],[/fxios\/([-\w\.]+)/i],[x,[f,O]],[/\bqihu|(qi?ho?o?|360)browser/i],[[f,"360"+H]],[/\b(qq)\/([\w\.]+)/i],[[f,/(.+)/,"$1Browser"],x],[/(oculus|sailfish|huawei|vivo|pico)browser\/([\w\.]+)/i],[[f,/(.+)/,"$1"+H],x],[/samsungbrowser\/([\w\.]+)/i],[x,[f,M+" Internet"]],[/(comodo_dragon)\/([\w\.]+)/i],[[f,/_/g," "],x],[/metasr[\/ ]?([\d\.]+)/i],[x,[f,"Sogou Explorer"]],[/(sogou)mo\w+\/([\d\.]+)/i],[[f,"Sogou Mobile"],x],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i],[f,x],[/(lbbrowser|rekonq)/i,/\[(linkedin)app\]/i],[f],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[f,G],x],[/(Klarna)\/([\w\.]+)/i,/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(alipay)client\/([\w\.]+)/i,/(twitter)(?:and| f.+e\/([\w\.]+))/i,/(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i],[f,x],[/\bgsa\/([\w\.]+) .*safari\//i],[x,[f,"GSA"]],[/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],[x,[f,"TikTok"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[x,[f,A+" Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[f,A+" WebView"],x],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[x,[f,"Android "+N]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[f,x],[/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],[x,[f,"Mobile Safari"]],[/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],[x,f],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[f,[x,e,{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}]],[/(webkit|khtml)\/([\w\.]+)/i],[f,x],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[f,"Netscape"],x],[/(wolvic)\/([\w\.]+)/i],[f,x],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[x,[f,O+" Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i],[f,[x,/_/g,"."]],[/(cobalt)\/([\w\.]+)/i],[f,[x,/master.|lts./,""]]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[k,"amd64"]],[/(ia32(?=;))/i],[[k,Z]],[/((?:i[346]|x)86)[;\)]/i],[[k,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[k,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[k,"armhf"]],[/windows (ce|mobile); ppc;/i],[[k,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[k,/ower/,"",Z]],[/(sun4\w)[;\)]/i],[[k,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[k,Z]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[h,[v,M],[g,_]],[/\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,/samsung[- ]((?!sm-[lr])[-\w]+)/i,/sec-(sgh\w+)/i],[h,[v,M],[g,y]],[/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],[h,[v,S],[g,y]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[h,[v,S],[g,_]],[/(macintosh);/i],[h,[v,S]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[h,[v,R],[g,y]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[h,[v,C],[g,_]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],[h,[v,C],[g,y]],[/\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite|pro)?)(?: bui|\))/i],[[h,/_/g," "],[v,V],[g,y]],[/oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[h,/_/g," "],[v,V],[g,_]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[h,[v,"OPPO"],[g,y]],[/\b(opd2\d{3}a?) bui/i],[h,[v,"OPPO"],[g,_]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[h,[v,"Vivo"],[g,y]],[/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],[h,[v,"Realme"],[g,y]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[h,[v,j],[g,y]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[h,[v,j],[g,_]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[h,[v,U],[g,_]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[h,[v,U],[g,y]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[h,[v,"Lenovo"],[g,_]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[h,/_/g," "],[v,"Nokia"],[g,y]],[/(pixel c)\b/i],[h,[v,E],[g,_]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[h,[v,E],[g,y]],[/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[h,[v,D],[g,y]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[h,"Xperia Tablet"],[v,D],[g,_]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[h,[v,"OnePlus"],[g,y]],[/(alexa)webm/i,/(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[h,[v,T],[g,_]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[h,/(.+)/g,"Fire Phone $1"],[v,T],[g,y]],[/(playbook);[-\w\),; ]+(rim)/i],[h,v,[g,_]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[h,[v,z],[g,y]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[h,[v,q],[g,_]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[h,[v,q],[g,y]],[/(nexus 9)/i],[h,[v,"HTC"],[g,_]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],[v,[h,/_/g," "],[g,y]],[/droid [\w\.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])\w*(\)| bui)/i],[h,[v,"TCL"],[g,_]],[/(itel) ((\w+))/i],[[v,Z],h,[g,e,{tablet:["p10001l","w7001"],"*":"mobile"}]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[h,[v,"Acer"],[g,_]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[h,[v,"Meizu"],[g,y]],[/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],[h,[v,"Ulefone"],[g,y]],[/droid.+; (a(?:015|06[35]|142p?))/i],[h,[v,"Nothing"],[g,y]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[v,h,[g,y]],[/(kobo)\s(ereader|touch)/i,/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[v,h,[g,_]],[/(surface duo)/i],[h,[v,P],[g,_]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[h,[v,"Fairphone"],[g,y]],[/(u304aa)/i],[h,[v,"AT&T"],[g,y]],[/\bsie-(\w*)/i],[h,[v,"Siemens"],[g,y]],[/\b(rct\w+) b/i],[h,[v,"RCA"],[g,_]],[/\b(venue[\d ]{2,7}) b/i],[h,[v,"Dell"],[g,_]],[/\b(q(?:mv|ta)\w+) b/i],[h,[v,"Verizon"],[g,_]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[h,[v,"Barnes & Noble"],[g,_]],[/\b(tm\d{3}\w+) b/i],[h,[v,"NuVision"],[g,_]],[/\b(k88) b/i],[h,[v,"ZTE"],[g,_]],[/\b(nx\d{3}j) b/i],[h,[v,"ZTE"],[g,y]],[/\b(gen\d{3}) b.+49h/i],[h,[v,"Swiss"],[g,y]],[/\b(zur\d{3}) b/i],[h,[v,"Swiss"],[g,_]],[/\b((zeki)?tb.*\b) b/i],[h,[v,"Zeki"],[g,_]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[v,"Dragon Touch"],h,[g,_]],[/\b(ns-?\w{0,9}) b/i],[h,[v,"Insignia"],[g,_]],[/\b((nxa|next)-?\w{0,9}) b/i],[h,[v,"NextBook"],[g,_]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[v,"Voice"],h,[g,y]],[/\b(lvtel\-)?(v1[12]) b/i],[[v,"LvTel"],h,[g,y]],[/\b(ph-1) /i],[h,[v,"Essential"],[g,y]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[h,[v,"Envizen"],[g,_]],[/\b(trio[-\w\. ]+) b/i],[h,[v,"MachSpeed"],[g,_]],[/\btu_(1491) b/i],[h,[v,"Rotor"],[g,_]],[/(shield[\w ]+) b/i],[h,[v,"Nvidia"],[g,_]],[/(sprint) (\w+)/i],[v,h,[g,y]],[/(kin\.[onetw]{3})/i],[[h,/\./g," "],[v,P],[g,y]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[h,[v,I],[g,_]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[h,[v,I],[g,y]],[/smart-tv.+(samsung)/i],[v,[g,a]],[/hbbtv.+maple;(\d+)/i],[[h,/^/,"SmartTV"],[v,M],[g,a]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[v,U],[g,a]],[/(apple) ?tv/i],[v,[h,S+" TV"],[g,a]],[/crkey/i],[[h,A+"cast"],[v,E],[g,a]],[/droid.+aft(\w+)( bui|\))/i],[h,[v,T],[g,a]],[/\(dtv[\);].+(aquos)/i,/(aquos-tv[\w ]+)\)/i],[h,[v,R],[g,a]],[/(bravia[\w ]+)( bui|\))/i],[h,[v,D],[g,a]],[/(mitv-\w{5}) bui/i],[h,[v,V],[g,a]],[/Hbbtv.*(technisat) (.*);/i],[v,h,[g,a]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],[[v,b],[h,b],[g,a]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[g,a]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[v,h,[g,o]],[/droid.+; (shield) bui/i],[h,[v,"Nvidia"],[g,o]],[/(playstation [345portablevi]+)/i],[h,[v,D],[g,o]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[h,[v,P],[g,o]],[/\b(sm-[lr]\d\d[05][fnuw]?s?)\b/i],[h,[v,M],[g,t]],[/((pebble))app/i],[v,h,[g,t]],[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],[h,[v,S],[g,t]],[/droid.+; (glass) \d/i],[h,[v,E],[g,t]],[/droid.+; (wt63?0{2,3})\)/i],[h,[v,I],[g,t]],[/(quest( \d| pro)?)/i],[h,[v,G],[g,t]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[v,[g,n]],[/(aeobc)\b/i],[h,[v,T],[g,n]],[/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i],[h,[g,y]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[h,[g,_]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[g,_]],[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],[[g,y]],[/(android[-\w\. ]{0,9});.+buil/i],[h,[v,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[x,[f,"EdgeHTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[x,[f,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i,/\b(libweb)/i],[f,x],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[x,f]],os:[[/microsoft (windows) (vista|xp)/i],[f,x],[/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i],[f,[x,e,$]],[/windows nt 6\.2; (arm)/i,/windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,/(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[x,e,$],[f,"Windows"]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,/cfnetwork\/.+darwin/i],[[x,/_/g,"."],[f,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[f,F],[x,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],[x,f],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[f,x],[/\(bb(10);/i],[x,[f,z]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[x,[f,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[x,[f,O+" OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[x,[f,"webOS"]],[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],[x,[f,"watchOS"]],[/crkey\/([\d\.]+)/i],[x,[f,A+"cast"]],[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],[[f,L],x],[/panasonic;(viera)/i,/(netrange)mmh/i,/(nettv)\/(\d+\.[\w\.]+)/i,/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[f,x],[/(sunos) ?([\w\.\d]*)/i],[[f,"Solaris"],x],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,/(unix) ?([\w\.]*)/i],[f,x]]},X=function(i,e){if(typeof i==u&&(e=i,i=l),!(this instanceof X))return new X(i,e).getResult();var o=typeof s!=d&&s.navigator?s.navigator:l,a=i||(o&&o.userAgent?o.userAgent:""),r=o&&o.userAgentData?o.userAgentData:l,t=e?function(i,e){var o,a={};for(o in i)e[o]&&e[o].length%2==0?a[o]=e[o].concat(i[o]):a[o]=i[o];return a}(W,e):W,n=o&&o.userAgent==a;return this.getBrowser=function(){var i,e={};return e[f]=l,e[x]=l,w.call(e,a,t.browser),e[m]=typeof(i=e[x])==p?i.replace(/[^\d\.]/g,"").split(".")[0]:l,n&&o&&o.brave&&typeof o.brave.isBrave==c&&(e[f]="Brave"),e},this.getCPU=function(){var i={};return i[k]=l,w.call(i,a,t.cpu),i},this.getDevice=function(){var i={};return i[v]=l,i[h]=l,i[g]=l,w.call(i,a,t.device),n&&!i[g]&&r&&r.mobile&&(i[g]=y),n&&"Macintosh"==i[h]&&o&&typeof o.standalone!=d&&o.maxTouchPoints&&2<o.maxTouchPoints&&(i[h]="iPad",i[g]=_),i},this.getEngine=function(){var i={};return i[f]=l,i[x]=l,w.call(i,a,t.engine),i},this.getOS=function(){var i={};return i[f]=l,i[x]=l,w.call(i,a,t.os),n&&!i[f]&&r&&r.platform&&"Unknown"!=r.platform&&(i[f]=r.platform.replace(/chrome os/i,L).replace(/macos/i,F)),i},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return a},this.setUA=function(i){return a=typeof i==p&&500<i.length?b(i,500):i,this},this.setUA(a),this};X.VERSION="0.7.39",X.BROWSER=i([f,x,m]),X.CPU=i([k]),X.DEVICE=i([h,v,g,o,y,a,_,t,n]),X.ENGINE=X.OS=i([f,x]),typeof exports!=d?(typeof module!=d&&module.exports&&(exports=module.exports=X),exports.UAParser=X):typeof define==c&&define.amd?define(function(){return X}):typeof s!=d&&(s.UAParser=X);var K,Q=typeof s!=d&&(s.jQuery||s.Zepto);Q&&!Q.ua&&(K=new X,Q.ua=K.getResult(),Q.ua.get=function(){return K.getUA()},Q.ua.set=function(i){K.setUA(i);var e,o=K.getResult();for(e in o)Q.ua[e]=o[e]})}("object"==typeof window?window:this);