///////////////////////////////////////////////
/*  Extensions for UAParser.js v2.0.3
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    AGPLv3 License */
//////////////////////////////////////////////

/*jshint esversion: 6 */ 

const MODEL     = 'model';
const NAME      = 'name';
const TYPE      = 'type';
const VENDOR    = 'vendor';
const VERSION   = 'version';
const MOBILE    = 'mobile';
const TABLET    = 'tablet';
const CRAWLER   = 'crawler';
const CLI       = 'cli';
const EMAIL     = 'email';
const FETCHER   = 'fetcher';
const INAPP     = 'inapp';
const MEDIAPLAYER = 'mediaplayer';
const LIBRARY    = 'library';

//////////////////////
// COMMAND LINE APPS
/////////////////////

const CLIs = Object.freeze({
    browser : [
        // wget / curl / Lynx / ELinks / HTTPie
        [/(wget|curl|lynx|elinks|httpie)[\/ ]\(?([\w\.-]+)/i], [NAME, VERSION, [TYPE, CLI]]
    ]
});

////////////////////////
// CRAWLERS / SPIDERS
///////////////////////

const Crawlers = Object.freeze({
    browser : [
        [
            // AhrefsBot - https://ahrefs.com/robot
            // Amazonbot - https://developer.amazon.com/amazonbot
            // Bingbot / AdIdxBot - https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0
            // CCBot - https://commoncrawl.org/faq
            // Dotbot - https://moz.com/help/moz-procedures/crawlers/dotbot
            // DuckDuckBot - http://duckduckgo.com/duckduckbot.html
            // FacebookBot - https://developers.facebook.com/docs/sharing/bot/
            // GPTBot - https://platform.openai.com/docs/gptbot
            // iAskBot - https://iask.ai
            // LinkedInBot - http://www.linkedin.com
            // MJ12bot - https://mj12bot.com/
            // MojeekBot - https://www.mojeek.com/bot.html
            // Onespot - https://www.onespot.com/identifying-traffic.html
            // OpenAI's SearchGPT - https://platform.openai.com/docs/bots
            // PerplexityBot - https://perplexity.ai/perplexitybot
            // SeznamBot - http://napoveda.seznam.cz/seznambot-intro
            /((?:adidx|ahrefs|amazon|bing|cc|dot|duckduck|exa|facebook|gpt|iask|linkedin|mj12|mojeek|oai-search|onespot-scraper|perplexity|semrush|seznam)bot)\/([\w\.-]+)/i,

            // Applebot - http://apple.com/go/applebot
            /(applebot(?:-extended)?)\/?([\w\.]*)/i,

            // Baiduspider https://help.baidu.com/question?prod_id=99&class=0&id=3001
            /(baiduspider[-imagevdonwsfcpr]{0,7})\/?([\w\.]*)/i,

            // ClaudeBot (Anthropic)
            /(claude(?:bot|-web)|anthropic-ai)\/?([\w\.]*)/i, 

            // Coc Coc Bot - https://help.coccoc.com/en/search-engine
            /(coccocbot-(?:image|web))\/([\w\.]+)/i, 

            // Daum
            /(daum(?:oa)?(?:-image)?)[ \/]([\w\.]+)/i,

            // Facebook / Meta 
            // https://developers.facebook.com/docs/sharing/webmasters/web-crawlers
            /(facebook(?:externalhit|catalog)|meta-externalagent)\/([\w\.]+)/i,

            // Googlebot - http://www.google.com/bot.html
            /(google(?:bot|other|-inspectiontool)(?:-image|-video|-news)?|storebot-google)\/?([\w\.]*)/i, 

            // Internet Archive (archive.org)
            /(ia_archiver|archive\.org_bot)\/?([\w\.]*)/i,

            // Qwantbot - https://help.qwant.com/bot
            /(qwantbot)[-\w]*\/?([\w\.]*)/i,

            // SemrushBot - http://www.semrush.com/bot.html
            /((?:semrush|splitsignal)bot[-abcfimostw]*)\/?([\w\.-]*)/i,

            // Sogou Spider
            /(sogou (?:pic|head|web|orion|news) spider)\/([\w\.]+)/i, 

            // Yahoo! Japan - https://support.yahoo-net.jp/PccSearch/s/article/H000007955
            /(y!?j-(?:asr|br[uw]|dscv|mmp|vsidx|wsc))\/([\w\.]+)/i, 

            // Yandex Bots - https://yandex.com/bots
            /(yandex(?:(?:mobile)?(?:accessibility|additional|renderresources|screenshot|sprav)?bot|image(?:s|resizer)|video(?:parser)?|blogs|adnet|favicons|fordomain|market|media|metrika|news|ontodb(?:api)?|pagechecker|partner|rca|tracker|turbo|vertis|webmaster|antivirus))\/([\w\.]+)/i,

            // Yeti (Naver)
            /(yeti)\/([\w\.]+)/i,

            // aiHitBot / Diffbot / Linespider / Magpie-Crawler / Omgilibot / OpenAI Image Downloader / Webzio-Extended / Screaming Frog SEO Spider / Startpage / Timpibot / VelenPublicWebCrawler / YisouSpider / YouBot
            /((?:aihit|diff|timpi|you)bot|omgili(?:bot)?|openai image downloader|(?:magpie-|velenpublicweb)crawler|startpageprivateimageproxy|webzio-extended|(?:chatglm-|line|screaming frog seo |yisou)spider)\/?([\w\.]*)/i
        ],

        [NAME, VERSION, [TYPE, CRAWLER]],

        [
            // Google Bots
            /((?:adsbot|apis|mediapartners)-google(?:-mobile)?|google-?(?:other|cloudvertexbot|extended|safety))/i,

            // AI2Bot - https://allenai.org/crawler
            // Bytespider
            // DataForSeoBot - https://dataforseo.com/dataforseo-bot
            // Huawei AspiegelBot / PetalBot https://aspiegel.com/petalbot
            // ImagesiftBot - https://imagesift.com/about
            // Qihoo 360Spider
            // TurnitinBot - https://www.turnitin.com/robot/crawlerinfo.html
            // Yahoo! Slurp - http://help.yahoo.com/help/us/ysearch/slurp
            /\b(360spider-?(?:image|video)?|bytespider|(?:ai2|aspiegel|dataforseo|imagesift|petal|turnitin)bot|teoma|yahoo! slurp)/i
        ], 
        [NAME, [TYPE, CRAWLER]]
    ]
});

//////////////////
// EXTRA DEVICES
/////////////////

const ExtraDevices = Object.freeze({
    device : [[    
        /(nook)[\w ]+build\/(\w+)/i,                                        // Nook
        /(dell) (strea[kpr\d ]*[\dko])/i,                                   // Dell Streak
        /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,                                  // Le Pan Tablets
        /(trinity)[- ]*(t\d{3}) bui/i,                                      // Trinity Tablets
        /(gigaset)[- ]+(q\w{1,9}) bui/i,                                    // Gigaset Tablets
        /(vodafone) ([\w ]+)(?:\)| bui)/i                                   // Vodafone
        ], [VENDOR, MODEL, [TYPE, TABLET]], [

        /(u304aa)/i                                                         // AT&T
        ], [MODEL, [VENDOR, 'AT&T'], [TYPE, MOBILE]], [

        /\bsie-(\w*)/i                                                      // Siemens
        ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [

        /\b(rct\w+) b/i                                                     // RCA Tablets
        ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [

        /\b(venue[\d ]{2,7}) b/i                                            // Dell Venue Tablets
        ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [

        /\b(q(?:mv|ta)\w+) b/i                                              // Verizon Tablet
        ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [

        /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i                       // Barnes & Noble Tablet
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

        /^((zeki)?tb.*\b) b/i                                               // Zeki Tablets
        ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [

        /\b([yr]\d{2}) b/i,
        /\b(?:dragon[- ]+touch |dt)(\w{5}) b/i                              // Dragon Touch Tablet
        ], [MODEL, [VENDOR, 'Dragon Touch'], [TYPE, TABLET]], [

        /\b(ns-?\w{0,9}) b/i                                                // Insignia Tablets
        ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [

        /\b((nxa|next)-?\w{0,9}) b/i                                        // NextBook Tablets
        ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [

        /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i                  // Voice Xtreme Phones
        ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [

        /\b(lvtel\-)?(v1[12]) b/i                                           // LvTel Phones
        ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [

        /\b(ph-1) /i                                                        // Essential PH-1
        ], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [

        /\b(v(100md|700na|7011|917g).*\b) b/i                               // Envizen Tablets
        ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [

        /\b(trio[-\w\. ]+) b/i                                              // MachSpeed Tablets
        ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [

        /\btu_(1491) b/i                                                    // Rotor Tablets
        ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]]
    ]
});

///////////////
// EMAIL APPS
//////////////

const Emails = Object.freeze({
    browser : [
        [
        // Evolution / Kontact/KMail / [Microsoft/Mac] Outlook / Thunderbird
        /(airmail|bluemail|emclient|evolution|foxmail|kmail2?|kontact|(?:microsoft |mac)?outlook(?:-express)?|navermailapp|(?!chrom.+)sparrow|thunderbird|yahoo)(?:m.+ail; |[\/ ])([\w\.]+)/i
        ], [NAME, VERSION, [TYPE, EMAIL]]
    ]
});

///////////////////////
// ON-DEMAND SCRAPERS
//////////////////////

const Fetchers = Object.freeze({
    browser : [
        [
            // AhrefsSiteAudit - https://ahrefs.com/robot/site-audit
            // ChatGPT-User - https://platform.openai.com/docs/plugins/bot
            // DuckAssistBot - https://duckduckgo.com/duckassistbot/
            // Better Uptime / BingPreview / Mastodon / MicrosoftPreview / Pinterestbot / Redditbot / Rogerbot / SiteAuditBot / Telegrambot / Twitterbot / UptimeRobot
            // Google Site Verifier / Meta / Yahoo! Japan
            // Iframely - https://iframely.com/docs/about
            // Perplexity-User - https://docs.perplexity.ai/guides/bots
            // MistralAI-User - https://docs.mistral.ai/robots/
            // Yandex Bots - https://yandex.com/bots
            /(ahrefssiteaudit|(?:bing|microsoft)preview|(?:chatgpt|mistralai|perplexity)-user|mastodon|(?:discord|duckassist|linkedin|pinterest|reddit|roger|siteaudit|twitter|uptimero)bot|google-site-verification|iframely|meta-externalfetcher|y!?j-dlc|yandex(?:calendar|direct(?:dyn)?|searchshop)|yadirectfetcher)\/([\w\.]+)/i,

            // Bluesky
            /(bluesky) cardyb\/([\w\.]+)/i,

            // Skype
            /(skypeuripreview) preview\/([\w\.]+)/i,

            // Slackbot - https://api.slack.com/robots
            /(slack(?:bot)?(?:-imgproxy|-linkexpanding)?) ([\w\.]+)/i,
            
            // WhatsApp
            /(whatsapp)\/([\w\.]+)/i
        ], 
        [NAME, VERSION, [TYPE, FETCHER]],

        [
            // Google Bots / Cohere / Snapchat / Vercelbot / Yandex Bots
            /((?:better uptime |telegram|vercel)bot|cohere-ai|feedfetcher-google|google(?:imageproxy|-read-aloud|-pagerenderer|producer)|snap url preview|yandex(?:sitelinks|userproxy))/i
        ], 
        [NAME, [TYPE, FETCHER]],
    ],

    os : [
        [/whatsapp\/[\d\.]+ (a|i)/i],
        [[NAME, os => os == 'A' ? 'Android' : 'iOS' ]]
    ]
});

////////////////////
// IN-APP BROWSERS
///////////////////

const InApps = Object.freeze({
    browser : [
        // Slack
        [/(?:slack(?=.+electron|.+ios)|chatlyio)\/([\d\.]+)/i], 
        [VERSION, [NAME, 'Slack'], [TYPE, INAPP]],

        // Yahoo! Japan
        [/jp\.co\.yahoo\.(?:android\.yjtop|ipn\.appli)\/([\d\.]+)/i], 
        [VERSION, [NAME, 'Yahoo! Japan'], [TYPE, INAPP]]
    ]
});

//////////////////////
// MEDIA PLAYER APPS
/////////////////////

const MediaPlayers = Object.freeze({
    browser : [[
        /(apple(?:coremedia|tv))\/([\w\._]+)/i,                             // Generic Apple CoreMedia
        /(coremedia) v([\w\._]+)/i,         
                                                                            // Ares/Nexplayer/OSSProxy
        /(ares|clementine|music player daemon|nexplayer|ossproxy) ([\w\.-]+)/i, 
                                                                            // Aqualung/Lyssna/BSPlayer/Clementine/MPD
                                                                            // Audacious/AudiMusicStream/Amarok/BASS/OpenCORE/GnomeMplayer/MoC
                                                                            // NSPlayer/PSP-InternetRadioPlayer/Videos
                                                                            // Nero Home/Nero Scout/Nokia
                                                                            // QuickTime/RealMedia/RadioApp/RadioClientApplication/
                                                                            // SoundTap/Totem/Stagefright/Streamium
                                                                            // XBMC/gvfs/Xine/XMMS/irapp
        /^(aqualung|audacious|audimusicstream|amarok|bass|bsplayer|core|gnomemplayer|gvfs|irapp|lyssna|music on console|nero (?:home|scout)|nokia\d+|nsplayer|psp-internetradioplayer|quicktime|rma|radioapp|radioclientapplication|soundtap|stagefright|streamium|totem|videos|xbmc|xine|xmms)\/([\w\.-]+)/i,
        /(lg player|nexplayer) ([\d\.]+)/i,
        /player\/(nexplayer|lg player) ([\w\.-]+)/i,                        // NexPlayer/LG Player
        /(gstreamer) souphttpsrc.+libsoup\/([\w\.-]+)/i,                    // Gstreamer
        /(htc streaming player) [\w_]+ \/ ([\d\.]+)/i,                      // HTC Streaming Player
        /(lavf)([\d\.]+)/i,                                                 // Lavf (FFMPEG)
                                                                            // MPlayer SVN
        /(mplayer)(?: |\/)(?:(?:sherpya-){0,1}svn)(?:-| )(r\d+(?:-\d+[\w\.-]+))/i,
        / (songbird)\/([\w\.-]+)/i,                                         // Songbird/Philips-Songbird
        /(winamp)(?:3 version|mpeg| ) ([\w\.-]+)/i,                         // Winamp
        /(vlc)(?:\/| media player - version )([\w\.-]+)/i,                  // VLC Videolan
        /^(foobar2000|itunes|smp)\/([\d\.]+)/i,                             // Foobar2000/iTunes/SMP
        /com\.(riseupradioalarm)\/([\d\.]*)/i,                              // RiseUP Radio Alarm
        /(mplayer)(?:\s|\/| unknown-)([\w\.\-]+)/i,                         // MPlayer
                                                                            // Windows Media Server
        /(windows)\/([\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ home media server/i
        ], [NAME, VERSION, [TYPE, MEDIAPLAYER]], [

        /(flrp)\/([\w\.-]+)/i                                               // Flip Player
        ], [[NAME, 'Flip Player'], VERSION, [TYPE, MEDIAPLAYER]], [
                                                                            // FStream/NativeHost/QuerySeekSpider
                                                                            // MPlayer (no other info)/Media Player Classic/Nero ShowTime
                                                                            // OCMS-bot/tap in radio/tunein/unknown/winamp (no other info)
                                                                            // inlight radio / YourMuze
        /(fstream|media player classic|inlight radio|mplayer|nativehost|nero showtime|ocms-bot|queryseekspider|tapinradio|tunein radio|winamp|yourmuze)/i                                                                          
        ], [NAME, [TYPE, MEDIAPLAYER]], [

        /(htc_one_s|windows-media-player|wmplayer)\/([\w\.-]+)/i,           // HTC One S / Windows Media Player
        ], [[NAME, /[_-]/g, ' '], VERSION, [TYPE, MEDIAPLAYER]], [

        /(rad.io|radio.(?:de|at|fr)) ([\d\.]+)/i                            // Rad.io
        ], [[NAME, 'rad.io'], VERSION, [TYPE, MEDIAPLAYER]]
    ]
});

/////////////
// LIBRARIES
//////////////

const Libraries = Object.freeze({
    browser : [
        // Apache-HttpClient/Axios/go-http-client/got/GuzzleHttp/Java[-HttpClient]/jsdom/libwww-perl/lua-resty-http/Needle/node-fetch/OkHttp/PHP-SOAP/PostmanRuntime/python-urllib/python-requests/Scrapy/superagent
        [
            /^(apache-httpclient|axios|(?:go|java)-http-client|got|guzzlehttp|java|libwww-perl|lua-resty-http|needle|node-(?:fetch|superagent)|okhttp|php-soap|postmanruntime|python-(?:urllib|requests)|scrapy)\/([\w\.]+)/i,
            /(jsdom)\/([\w\.]+)/i,
            /\((java)\/([\w\.]+)/i
        ], [NAME, VERSION, [TYPE, LIBRARY]]
    ]
});

/////////////
// VEHICLES
////////////

const Vehicles = Object.freeze({
    device : [
        [/aftlbt962e2/i],                                                   // BMW
        [[VENDOR, 'BMW']],

        [/dilink.+(byd) auto/i],                                            // BYD
        [VENDOR],

        [/aftlft962x3/i],                                                   // Jeep
        [[VENDOR, 'Jeep'], [MODEL, 'Wagooner']],
        
        [/(rivian) (r1t)/i],                                                // Rivian
        [VENDOR, MODEL],

        [/vcc.+netfront/i],                                                 // Volvo
        [[VENDOR, 'Volvo']]
    ]
});

//////////
// BOTS
/////////

const Bots = Object.freeze({
    browser : [
        ...CLIs.browser,
        ...Crawlers.browser,
        ...Fetchers.browser,
        ...Libraries.browser
    ],
    os : [
        ...Fetchers.os
    ]
});

module.exports = { 
    Bots,
    CLIs,
    Crawlers,
    ExtraDevices,
    Emails,
    Fetchers,
    InApps,
    Libraries,
    MediaPlayers,
    Vehicles
};