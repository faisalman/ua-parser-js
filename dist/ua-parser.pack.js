/* UAParser.js v2.0.0
   Copyright © 2012-2023 Faisal Salman <f@faisalman.com>
   UAParser.js PRO Business License */
!function(i,d){"use strict";function e(i){for(var e={},t=0;t<i.length;t++)e[i[t].toUpperCase()]=i[t];return e}function n(i,e){if(!(typeof i===l&&0<i.length))return!!gi(i)&&-1!==ki(e).indexOf(ki(i));for(var t in i)if(ki(i[t])==ki(e))return 1}var w="",u="function",b="undefined",l="object",c="string",p="major",h="model",m="name",f="type",g="vendor",v="version",k="architecture",x="console",y="mobile",r="tablet",t="smarttv",o="wearable",a="xr",s="embedded",S="inapp",_="user-agent",C=500,T="brands",q="formFactors",O="fullVersionList",z="platform",A="platformVersion",N="bitness",P="sec-ch-ua",H=P+"-full-version-list",I=P+"-arch",U=P+"-"+N,j=P+"-form-factors",E=P+"-"+y,M=P+"-"+h,R=P+"-"+z,B=R+"-version",V=[T,O,y,h,z,A,k,q,N],F="browser",G="cpu",L="device",D="engine",X="os",$="result",W="Amazon",K="Apple",Q="ASUS",Z="BlackBerry",Y="Google",J="Huawei",ii="Microsoft",ei="Motorola",ti="Samsung",oi="Sony",ri="Xiaomi",ai="Zebra",si="Mobile ",ni=" Browser",wi="Chromecast",bi="Firefox",ci="Opera",di="Facebook",ui="Windows",li=typeof i!==b,pi=li&&i.navigator?i.navigator:d,hi=pi&&pi.userAgentData?pi.userAgentData:d,mi=function(i,e){var t,o={},r=e;if(!fi(e))for(var a in r={},e)for(var s in e[a])r[s]=e[a][s].concat(r[s]||[]);for(t in i)o[t]=r[t]&&r[t].length%2==0?r[t].concat(i[t]):i[t];return o},fi=function(i,e){for(var t in i)return/^(browser|cpu|device|engine|os)$/.test(t)||!!e&&fi(i[t])},gi=function(i){return typeof i===c},vi=function(i){if(!i)return d;for(var e,t=[],o=Si(/\\?\"/g,i).split(","),r=0;r<o.length;r++)-1<o[r].indexOf(";")?(e=Ci(o[r]).split(";v="),t[r]={brand:e[0],version:e[1]}):t[r]=Ci(o[r]);return t},ki=function(i){return gi(i)?i.toLowerCase():i},xi=function(i){return gi(i)?Si(/[^\d\.]/g,i).split(".")[0]:d},yi=function(i){for(var e in i){e=i[e];typeof e==l&&2==e.length?this[e[0]]=e[1]:this[e]=d}return this},Si=function(i,e){return gi(e)?e.replace(i,w):e},_i=function(i){return Si(/\\?\"/g,i)},Ci=function(i,e){if(gi(i))return i=Si(/^\s\s*/,i),typeof e===b?i:i.substring(0,C)},Ti=function(i,e){if(i&&e)for(var t,o,r,a,s,n=0;n<e.length&&!a;){for(var w=e[n],b=e[n+1],c=t=0;c<w.length&&!a&&w[c];)if(a=w[c++].exec(i))for(o=0;o<b.length;o++)s=a[++t],typeof(r=b[o])===l&&0<r.length?2===r.length?typeof r[1]==u?this[r[0]]=r[1].call(this,s):this[r[0]]=r[1]:3===r.length?typeof r[1]!==u||r[1].exec&&r[1].test?this[r[0]]=s?s.replace(r[1],r[2]):d:this[r[0]]=s?r[1].call(this,s,r[2]):d:4===r.length&&(this[r[0]]=s?r[3].call(this,s.replace(r[1],r[2])):d):this[r]=s||d;n+=2}},qi=function(i,e){for(var t in e)if(typeof e[t]===l&&0<e[t].length){for(var o=0;o<e[t].length;o++)if(n(e[t][o],i))return"?"===t?d:t}else if(n(e[t],i))return"?"===t?d:t;return e.hasOwnProperty("*")?e["*"]:i},Oi={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"},zi={embedded:"Automotive",mobile:"Mobile",tablet:["Tablet","EInk"],smarttv:"TV",wearable:"Watch",xr:["VR","XR"],"?":["Desktop","Unknown"],"*":d},Ai={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[v,[m,si+"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[v,[m,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[m,v],[/opios[\/ ]+([\w\.]+)/i],[v,[m,ci+" Mini"]],[/\bop(?:rg)?x\/([\w\.]+)/i],[v,[m,ci+" GX"]],[/\bopr\/([\w\.]+)/i],[v,[m,ci]],[/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],[v,[m,"Baidu"]],[/\b(?:mxbrowser|mxios|myie2)\/?([-\w\.]*)\b/i],[v,[m,"Maxthon"]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[\/ ]?([\w\.]*)/i,/(avant|iemobile|slim(?:browser|boat|jet))[\/ ]?([\d\.]*)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio|(?=comodo_)?dragon)\/([-\w\.]+)/i,/(heytap|ovi|115)browser\/([\d\.]+)/i,/(weibo)__([\d\.]+)/i],[m,v],[/quark(?:pc)?\/([-\w\.]+)/i],[v,[m,"Quark"]],[/\bddg\/([\w\.]+)/i],[v,[m,"DuckDuckGo"]],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[v,[m,"UCBrowser"]],[/microm.+\bqbcore\/([\w\.]+)/i,/\bqbcore\/([\w\.]+).+microm/i,/micromessenger\/([\w\.]+)/i],[v,[m,"WeChat"]],[/konqueror\/([\w\.]+)/i],[v,[m,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[v,[m,"IE"]],[/ya(?:search)?browser\/([\w\.]+)/i],[v,[m,"Yandex"]],[/slbrowser\/([\w\.]+)/i],[v,[m,"Smart Lenovo"+ni]],[/(avast|avg)\/([\w\.]+)/i],[[m,/(.+)/,"$1 Secure"+ni],v],[/\bfocus\/([\w\.]+)/i],[v,[m,bi+" Focus"]],[/\bopt\/([\w\.]+)/i],[v,[m,ci+" Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[v,[m,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[v,[m,"Dolphin"]],[/coast\/([\w\.]+)/i],[v,[m,ci+" Coast"]],[/miuibrowser\/([\w\.]+)/i],[v,[m,"MIUI"+ni]],[/fxios\/([\w\.-]+)/i],[v,[m,si+bi]],[/\bqihoobrowser\/?([\w\.]*)/i],[v,[m,"360"]],[/\b(qq)\/([\w\.]+)/i],[[m,/(.+)/,"$1Browser"],v],[/(oculus|sailfish|huawei|vivo|pico)browser\/([\w\.]+)/i],[[m,/(.+)/,"$1"+ni],v],[/samsungbrowser\/([\w\.]+)/i],[v,[m,ti+" Internet"]],[/metasr[\/ ]?([\d\.]+)/i],[v,[m,"Sogou Explorer"]],[/(sogou)mo\w+\/([\d\.]+)/i],[[m,"Sogou Mobile"],v],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[\/ ]?v?([\w\.]+)/i],[m,v],[/(lbbrowser|rekonq)/i],[m],[/ome\/([\w\.]+) \w* ?(iron) saf/i,/ome\/([\w\.]+).+qihu (360)[es]e/i],[v,m],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[m,di],v,[f,S]],[/(Klarna)\/([\w\.]+)/i,/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(alipay)client\/([\w\.]+)/i,/(twitter)(?:and| f.+e\/([\w\.]+))/i,/(instagram|snapchat)[\/ ]([-\w\.]+)/i],[m,v,[f,S]],[/\bgsa\/([\w\.]+) .*safari\//i],[v,[m,"GSA"],[f,S]],[/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],[v,[m,"TikTok"],[f,S]],[/\[(linkedin)app\]/i],[m,[f,S]],[/(chromium)[\/ ]([-\w\.]+)/i],[m,v],[/headlesschrome(?:\/([\w\.]+)| )/i],[v,[m,"Chrome Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[m,"Chrome WebView"],v],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[v,[m,"Android"+ni]],[/chrome\/([\w\.]+) mobile/i],[v,[m,si+"Chrome"]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[m,v],[/version\/([\w\.\,]+) .*mobile(?:\/\w+ | ?)safari/i],[v,[m,si+"Safari"]],[/iphone .*mobile(?:\/\w+ | ?)safari/i],[[m,si+"Safari"]],[/version\/([\w\.\,]+) .*(safari)/i],[v,m],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[m,[v,"1"]],[/(webkit|khtml)\/([\w\.]+)/i],[m,v],[/(?:mobile|tablet);.*(firefox)\/([\w\.-]+)/i],[[m,si+bi],v],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[m,"Netscape"],v],[/(wolvic|librewolf)\/([\w\.]+)/i],[m,v],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[v,[m,bi+" Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/\b(links) \(([\w\.]+)/i],[m,[v,/_/g,"."]],[/(cobalt)\/([\w\.]+)/i],[m,[v,/[^\d\.]+./,w]]],cpu:[[/\b(?:(amd|x|x86[-_]?|wow|win)64)\b/i],[[k,"amd64"]],[/(ia32(?=;))/i,/((?:i[346]|x)86)[;\)]/i],[[k,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[k,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[k,"armhf"]],[/windows (ce|mobile); ppc;/i],[[k,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[k,/ower/,w,ki]],[/(sun4\w)[;\)]/i],[[k,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[k,ki]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[h,[g,ti],[f,r]],[/\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,/samsung[- ]((?!sm-[lr])[-\w]+)/i,/sec-(sgh\w+)/i],[h,[g,ti],[f,y]],[/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],[h,[g,K],[f,y]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[h,[g,K],[f,r]],[/(macintosh);/i],[h,[g,K]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[h,[g,"Sharp"],[f,y]],[/(?:honor)([-\w ]+)[;\)]/i],[h,[g,"Honor"],[f,y]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[h,[g,J],[f,r]],[/(?:huawei)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],[h,[g,J],[f,y]],[/\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite|pro)?)(?: bui|\))/i],[[h,/_/g," "],[g,ri],[f,y]],[/oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[h,/_/g," "],[g,ri],[f,r]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[h,[g,"OPPO"],[f,y]],[/\b(opd2\d{3}a?) bui/i],[h,[g,"OPPO"],[f,r]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[h,[g,"Vivo"],[f,y]],[/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],[h,[g,"Realme"],[f,y]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[h,[g,ei],[f,y]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[h,[g,ei],[f,r]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[h,[g,"LG"],[f,r]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[h,[g,"LG"],[f,y]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[h,[g,"Lenovo"],[f,r]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[h,/_/g," "],[g,"Nokia"],[f,y]],[/(pixel c)\b/i],[h,[g,Y],[f,r]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[h,[g,Y],[f,y]],[/droid.+; (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[h,[g,oi],[f,y]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[h,"Xperia Tablet"],[g,oi],[f,r]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[h,[g,"OnePlus"],[f,y]],[/(alexa)webm/i,/(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[h,[g,W],[f,r]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[h,/(.+)/g,"Fire Phone $1"],[g,W],[f,y]],[/(playbook);[-\w\),; ]+(rim)/i],[h,g,[f,r]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[h,[g,Z],[f,y]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[h,[g,Q],[f,r]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[h,[g,Q],[f,y]],[/(nexus 9)/i],[h,[g,"HTC"],[f,r]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],[g,[h,/_/g," "],[f,y]],[/tcl (xess p17aa)/i,/droid [\w\.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])(_\w(\w|\w\w))?(\)| bui)/i],[h,[g,"TCL"],[f,r]],[/droid [\w\.]+; (418(?:7d|8v)|5087z|5102l|61(?:02[dh]|25[adfh]|27[ai]|56[dh]|59k|65[ah])|a509dl|t(?:43(?:0w|1[adepqu])|50(?:6d|7[adju])|6(?:09dl|10k|12b|71[efho]|76[hjk])|7(?:66[ahju]|67[hw]|7[045][bh]|71[hk]|73o|76[ho]|79w|81[hks]?|82h|90[bhsy]|99b)|810[hs]))(_\w(\w|\w\w))?(\)| bui)/i],[h,[g,"TCL"],[f,y]],[/(itel) ((\w+))/i],[[g,ki],h,[f,qi,{tablet:["p10001l","w7001"],"*":"mobile"}]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[h,[g,"Acer"],[f,r]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[h,[g,"Meizu"],[f,y]],[/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],[h,[g,"Ulefone"],[f,y]],[/; (energy ?\w+)(?: bui|\))/i,/; energizer ([\w ]+)(?: bui|\))/i],[h,[g,"Energizer"],[f,y]],[/; cat (b35);/i,/; (b15q?|s22 flip|s48c|s62 pro)(?: bui|\))/i],[h,[g,"Cat"],[f,y]],[/((?:new )?andromax[\w- ]+)(?: bui|\))/i],[h,[g,"Smartfren"],[f,y]],[/droid.+; (a(?:015|06[35]|142p?))/i],[h,[g,"Nothing"],[f,y]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno|micromax|advan)[-_ ]?([-\w]*)/i,/; (imo) ((?!tab)[\w ]+?)(?: bui|\))/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[g,h,[f,y]],[/(imo) (tab \w+)/i,/(kobo)\s(ereader|touch)/i,/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i],[g,h,[f,r]],[/(surface duo)/i],[h,[g,ii],[f,r]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[h,[g,"Fairphone"],[f,y]],[/(shield[\w ]+) b/i],[h,[g,"Nvidia"],[f,r]],[/(sprint) (\w+)/i],[g,h,[f,y]],[/(kin\.[onetw]{3})/i],[[h,/\./g," "],[g,ii],[f,y]],[/droid.+; ([c6]+|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[h,[g,ai],[f,r]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[h,[g,ai],[f,y]],[/smart-tv.+(samsung)/i],[g,[f,t]],[/hbbtv.+maple;(\d+)/i],[[h,/^/,"SmartTV"],[g,ti],[f,t]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[g,"LG"],[f,t]],[/(apple) ?tv/i],[g,[h,K+" TV"],[f,t]],[/crkey.*devicetype\/chromecast/i],[[h,wi+" Third Generation"],[g,Y],[f,t]],[/crkey.*devicetype\/([^/]*)/i],[[h,/^/,"Chromecast "],[g,Y],[f,t]],[/fuchsia.*crkey/i],[[h,wi+" Nest Hub"],[g,Y],[f,t]],[/crkey/i],[[h,wi],[g,Y],[f,t]],[/droid.+aft(\w+)( bui|\))/i],[h,[g,W],[f,t]],[/\(dtv[\);].+(aquos)/i,/(aquos-tv[\w ]+)\)/i],[h,[g,"Sharp"],[f,t]],[/(bravia[\w ]+)( bui|\))/i],[h,[g,oi],[f,t]],[/(mitv-\w{5}) bui/i],[h,[g,ri],[f,t]],[/Hbbtv.*(technisat) (.*);/i],[g,h,[f,t]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],[[g,Ci],[h,Ci],[f,t]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[f,t]],[/(ouya)/i,/(nintendo) (\w+)/i],[g,h,[f,x]],[/droid.+; (shield) bui/i],[h,[g,"Nvidia"],[f,x]],[/(playstation \w+)/i],[h,[g,oi],[f,x]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[h,[g,ii],[f,x]],[/\b(sm-[lr]\d\d[05][fnuw]?s?)\b/i],[h,[g,ti],[f,o]],[/((pebble))app/i],[g,h,[f,o]],[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],[h,[g,K],[f,o]],[/droid.+; (wt63?0{2,3})\)/i],[h,[g,ai],[f,o]],[/droid.+; (glass) \d/i],[h,[g,Y],[f,a]],[/(pico) (4|neo3(?: link|pro)?)/i],[g,h,[f,a]],[/; (quest( \d| pro)?)/i],[h,[g,di],[f,a]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[g,[f,s]],[/(aeobc)\b/i],[h,[g,W],[f,s]],[/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i],[h,[f,y]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[h,[f,r]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[f,r]],[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],[[f,y]],[/(android[-\w\. ]{0,9});.+buil/i],[h,[g,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[v,[m,"EdgeHTML"]],[/(arkweb)\/([\w\.]+)/i],[m,v],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[v,[m,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i,/\b(libweb)/i],[m,v],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[v,m]],os:[[/microsoft (windows) (vista|xp)/i],[m,v],[/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i],[m,[v,qi,Oi]],[/windows nt 6\.2; (arm)/i,/windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,/(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[v,qi,Oi],[m,ui]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,/cfnetwork\/.+darwin/i],[[v,/_/g,"."],[m,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[m,"macOS"],[v,/_/g,"."]],[/android ([\d\.]+).*crkey/i],[v,[m,wi+" Android"]],[/fuchsia.*crkey\/([\d\.]+)/i],[v,[m,wi+" Fuchsia"]],[/crkey\/([\d\.]+).*devicetype\/smartspeaker/i],[v,[m,wi+" SmartSpeaker"]],[/linux.*crkey\/([\d\.]+)/i],[v,[m,wi+" Linux"]],[/crkey\/([\d\.]+)/i],[v,[m,wi]],[/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],[v,m],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish|openharmony)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[m,v],[/\(bb(10);/i],[v,[m,Z]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[v,[m,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[v,[m,bi+" OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[v,[m,"webOS"]],[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],[v,[m,"watchOS"]],[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],[[m,"Chrome OS"],v],[/panasonic;(viera)/i,/(netrange)mmh/i,/(nettv)\/(\d+\.[\w\.]+)/i,/(nintendo|playstation) (\w+)/i,/(xbox); +xbox ([^\);]+)/i,/(pico) .+os([\w\.]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[m,v],[/(sunos) ?([\w\.\d]*)/i],[[m,"Solaris"],v],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,/(unix) ?([\w\.]*)/i],[m,v]]},Ni=(bi={init:{},isIgnore:{},isIgnoreRgx:{},toString:{}},yi.call(bi.init,[[F,[m,v,p,f]],[G,[k]],[L,[f,h,g]],[D,[m,v]],[X,[m,v]]]),yi.call(bi.isIgnore,[[F,[v,p]],[D,[v]],[X,[v]]]),yi.call(bi.isIgnoreRgx,[[F,/ ?browser$/i],[X,/ ?os$/i]]),yi.call(bi.toString,[[F,[m,v]],[G,[k]],[L,[g,h]],[D,[m,v]],[X,[m,v]]]),bi),Pi=function(e,i){var t=Ni.init[i],o=Ni.isIgnore[i]||0,r=Ni.isIgnoreRgx[i]||0,a=Ni.toString[i]||0;function s(){yi.call(this,t)}return s.prototype.getItem=function(){return e},s.prototype.withClientHints=function(){return hi?hi.getHighEntropyValues(V).then(function(i){return e.setCH(new Hi(i,!1)).parseCH().get()}):e.parseCH().get()},s.prototype.withFeatureCheck=function(){return e.detectFeature().get()},i!=$&&(s.prototype.is=function(i){var e,t=!1;for(e in this)if(this.hasOwnProperty(e)&&!n(o,e)&&ki(r?Si(r,this[e]):this[e])==ki(r?Si(r,i):i)){if(t=!0,i!=b)break}else if(i==b&&t){t=!t;break}return t},s.prototype.toString=function(){var i,e=w;for(i in a)typeof this[a[i]]!==b&&(e+=(e?" ":w)+this[a[i]]);return e||b}),hi||(s.prototype.then=function(i){var e=this,t=function(){for(var i in e)e.hasOwnProperty(i)&&(this[i]=e[i])};t.prototype={is:s.prototype.is,toString:s.prototype.toString};t=new t;return i(t),t}),new s};function Hi(i,e){if(i=i||{},yi.call(this,V),e)yi.call(this,[[T,vi(i[P])],[O,vi(i[H])],[y,/\?1/.test(i[E])],[h,_i(i[M])],[z,_i(i[R])],[A,_i(i[B])],[k,_i(i[I])],[q,vi(i[j])],[N,_i(i[U])]]);else for(var t in i)this.hasOwnProperty(t)&&typeof i[t]!==b&&(this[t]=i[t])}function Ii(i,e,t,o){return this.get=function(i){return i?this.data.hasOwnProperty(i)?this.data[i]:d:this.data},this.set=function(i,e){return this.data[i]=e,this},this.setCH=function(i){return this.uaCH=i,this},this.detectFeature=function(){if(pi&&pi.userAgent==this.ua)switch(this.itemType){case F:pi.brave&&typeof pi.brave.isBrave==u&&this.set(m,"Brave");break;case L:!this.get(f)&&hi&&hi[y]&&this.set(f,y),"Macintosh"==this.get(h)&&pi&&typeof pi.standalone!==b&&pi.maxTouchPoints&&2<pi.maxTouchPoints&&this.set(h,"iPad").set(f,r);break;case X:!this.get(m)&&hi&&hi[z]&&this.set(m,hi[z]);break;case $:var e=this.data,i=function(i){return e[i].getItem().detectFeature().get()};this.set(F,i(F)).set(G,i(G)).set(L,i(L)).set(D,i(D)).set(X,i(X))}return this},this.parseUA=function(){return this.itemType!=$&&Ti.call(this.data,this.ua,this.rgxMap),this.itemType==F&&this.set(p,xi(this.get(v))),this},this.parseCH=function(){var i,e=this.uaCH,t=this.rgxMap;switch(this.itemType){case F:var o,r=e[O]||e[T];if(r)for(var a in r){var s=Si(/(Google|Microsoft) /,r[a].brand||r[a]),a=r[a].version;/not.a.brand/i.test(s)||o&&(!/chrom/i.test(o)||/chromi/i.test(s))||(this.set(m,s).set(v,a).set(p,xi(a)),o=s)}break;case G:var n=e[k];n&&(n&&"64"==e[N]&&(n+="64"),Ti.call(this.data,n+";",t));break;case L:if(e[y]&&this.set(f,y),e[h]&&this.set(h,e[h]),"Xbox"==e[h]&&this.set(f,x).set(g,ii),e[q]){if("string"!=typeof e[q])for(var w=0;!i&&w<e[q].length;)i=qi(e[q][w++],zi);else i=qi(e[q],zi);this.set(f,i)}break;case X:n=e[z];n&&(c=e[A],n==ui&&(c=13<=parseInt(xi(c),10)?"11":"10"),this.set(m,n).set(v,c)),this.get(m)==ui&&"Xbox"==e[h]&&this.set(m,"Xbox").set(v,d);break;case $:var b=this.data,c=function(i){return b[i].getItem().setCH(e).parseCH().get()};this.set(F,c(F)).set(G,c(G)).set(L,c(L)).set(D,c(D)).set(X,c(X))}return this},yi.call(this,[["itemType",i],["ua",e],["uaCH",o],["rgxMap",t],["data",Pi(this,i)]]),this}function Ui(i,e,t){var o;if(typeof i===l?(e=fi(i,!0)?(typeof e===l&&(t=e),i):(t=i,d),i=d):typeof i!==c||fi(e,!0)||(t=e,e=d),t&&typeof t.append===u&&(o={},t.forEach(function(i,e){o[e]=i}),t=o),!(this instanceof Ui))return new Ui(i,e,t).getResult();var r=typeof i===c?i:t&&t[_]?t[_]:pi&&pi.userAgent?pi.userAgent:w,a=new Hi(t,!0),s=e?mi(Ai,e):Ai,e=function(i){return i==$?function(){return new Ii(i,r,s,a).set("ua",r).set(F,this.getBrowser()).set(G,this.getCPU()).set(L,this.getDevice()).set(D,this.getEngine()).set(X,this.getOS()).get()}:function(){return new Ii(i,r,s[i],a).parseUA().get()}};return yi.call(this,[["getBrowser",e(F)],["getCPU",e(G)],["getDevice",e(L)],["getEngine",e(D)],["getOS",e(X)],["getResult",e($)],["getUA",function(){return r}],["setUA",function(i){return gi(i)&&(r=i.length>C?Ci(i,C):i),this}]]).setUA(r),this}Ui.VERSION="2.0.0",Ui.BROWSER=e([m,v,p,f]),Ui.CPU=e([k]),Ui.DEVICE=e([h,g,f,x,y,t,r,o,s]),Ui.ENGINE=Ui.OS=e([m,v]),typeof exports!==b?(typeof module!==b&&module.exports&&(exports=module.exports=Ui),exports.UAParser=Ui):typeof define===u&&define.amd?define(function(){return Ui}):li&&(i.UAParser=Ui);var ji,Ei=li&&(i.jQuery||i.Zepto);Ei&&!Ei.ua&&(ji=new Ui,Ei.ua=ji.getResult(),Ei.ua.get=function(){return ji.getUA()},Ei.ua.set=function(i){ji.setUA(i);var e,t=ji.getResult();for(e in t)Ei.ua[e]=t[e]})}("object"==typeof window?window:this);