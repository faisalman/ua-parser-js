///////////////////////////////////////////////
/*  Extensions for UAParser.js v2.0.0-beta.3
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
const MODULE    = 'module';

//////////////////////
// COMMAND LINE APPS
/////////////////////

const CLIs = Object.freeze({
    browser : [
        // wget / curl / lynx
        [/(wget|curl|lynx)[\/ ]([\w\.]+)/i], [NAME, VERSION, [TYPE, CLI]]
    ]
});

////////////////////////
// CRAWLERS / SPIDERS
///////////////////////

const Crawlers = Object.freeze({
    browser : [
        [
            // Amazonbot - https://developer.amazon.com/amazonbot
            // Applebot - http://apple.com/go/applebot
            // Bingbot - http://www.bing.com/bingbot.htm
            // DuckDuckBot - http://duckduckgo.com/duckduckbot.html
            // FacebookBot - https://developers.facebook.com/docs/sharing/bot/
            // GPTBot - https://platform.openai.com/docs/gptbot
            // MJ12bot - https://mj12bot.com/
            // SemrushBot - http://www.semrush.com/bot.html
            /((?:amazon|apple|bing|duckduck|facebook|gpt|mj12|semrush)bot)\/([\w\.]+)/i,

            // Baiduspider https://help.baidu.com/question?prod_id=99&class=0&id=3001
            /(baiduspider)[-imagevdonsfcpr]{0,6}\/([\w\.]+)/i,

            // ClaudeBot
            /(claude(?:bot|-web))\/([\w\.]+)/i, 

            // Googlebot - http://www.google.com/bot.html
            /(google(?:bot|other)(?:-image|-video|-news|-extended)?|(?:storebot-)?google(?:-inspectiontool)?)\/?([\w\.]*)/i, 

            // Sogou Spider
            /(sogou (?:pic|head|web|orion|news) spider)\/([\w\.]+)/i, 

            // Yahoo! Japan - https://support.yahoo-net.jp/PccSearch/s/article/H000007955
            /(y!?j-(?:asr|br[uw]|dscv|mmp|vsidx|wsc))\/([\w\.]+)/i, 

            // Yandex Bots - https://yandex.com/bots
            /(yandex(?:(?:mobile)?(?:accessibility|additional|renderresources|screenshot|sprav)?bot|image(?:s|resizer)|video(?:parser)?|blogs|adnet|favicons|fordomain|market|media|metrika|news|ontodb(?:api)?|pagechecker|partner|rca|tracker|turbo|vertis|webmaster|antivirus))\/([\w\.]+)/i 
        ],

        [NAME, VERSION, [TYPE, CRAWLER]],

        // Bytespider
        // Yahoo! Slurp - http://help.yahoo.com/help/us/ysearch/slurp
        [/((?:bytespider|(?=yahoo! )slurp))/i], 
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

        /\b((zeki)?tb.*\b) b/i                                              // Zeki Tablets
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
        // Microsoft Outlook / Thunderbird
        [/(microsoft outlook|thunderbird)[\s\/]([\w\.]+)/i], [NAME, VERSION, [TYPE, EMAIL]]
    ]
});

///////////////////////
// ON-DEMAND SCRAPERS
//////////////////////

const Fetchers = Object.freeze({
    browser : [
        [
            // ChatGPT-User - https://platform.openai.com/docs/plugins/bot
            // BingPreview / Mastodon / Pinterestbot / Redditbot / Telegrambot / Twitterbot
            /(bingpreview|chatgpt-user|mastodon|(?:discord|linkedin|pinterest|reddit|telegram|twitter)bot)\/([\w\.]+)/i,

            // Slackbot - https://api.slack.com/robots
            /(slack(?:bot)?(?:-imgproxy|-linkexpanding)?) ([\w\.]+)/i,
            
            // WhatsApp
            /(whatsapp)\/([\w\.]+)[\/ ][ianw]/i,

            // Yahoo! Japan
            /(y!?j-dlc)\/([\w\.]+)/i,

            // Yandex Bots - https://yandex.com/bots
            /(yandex(?:calendar|direct(?:dyn)?|searchshop)|yadirectfetcher)\/([\w\.]+)/i,
            /(yandex(?:sitelinks|userproxy))/i
        ], 
        [NAME, VERSION, [TYPE, FETCHER]],

        // Google Bots / Snapchat
        [/(feedfetcher-google|google-read-aloud|(?=bot; )snapchat)/i], 
        [NAME, [TYPE, FETCHER]],
    ]
});

////////////////////
// IN-APP BROWSERS
///////////////////

const InApps = Object.freeze({
    browser : [
        // Slack
        [/chatlyio\/([\d\.]+)/i], [VERSION, 'Slack', [TYPE, INAPP]],

        // Yahoo! Japan
        [/jp\.co\.yahoo\.android\.yjtop\/([\d\.]+)/i], [VERSION, 'Yahoo! Japan', [TYPE, INAPP]]
    ]
});

//////////////////////
// MEDIA PLAYER APPS
/////////////////////

const MediaPlayers = Object.freeze({
    browser : [[

        /(apple(?:coremedia|))\/([\w\._]+)/i,                               // Generic Apple CoreMedia
        /(coremedia) v([\w\._]+)/i
        ], [NAME, VERSION, [TYPE, MEDIAPLAYER]], [

        /(aqualung|lyssna|bsplayer)\/([\w\.-]+)/i                           // Aqualung/Lyssna/BSPlayer
        ], [NAME, VERSION, [TYPE, MEDIAPLAYER]], [

        /(ares|ossproxy)\s([\w\.-]+)/i                                      // Ares/OSSProxy
        ], [NAME, VERSION, [TYPE, MEDIAPLAYER]], [

        /(audacious|audimusicstream|amarok|bass|core|dalvik|gnomemplayer|music on console|nsplayer|psp-internetradioplayer|videos)\/([\w\.-]+)/i,
                                                                            // Audacious/AudiMusicStream/Amarok/BASS/OpenCORE/Dalvik/GnomeMplayer/MoC
                                                                            // NSPlayer/PSP-InternetRadioPlayer/Videos
        /(clementine|music player daemon)\s([\w\.-]+)/i,                    // Clementine/MPD
        /(lg player|nexplayer)\s([\d\.]+)/i,
        /player\/(nexplayer|lg player)\s([\w\.-]+)/i                        // NexPlayer/LG Player
        ], [NAME, VERSION, [TYPE, MEDIAPLAYER]], [
        /(nexplayer)\s([\w\.-]+)/i                                          // Nexplayer
        ], [NAME, VERSION, [TYPE, MEDIAPLAYER]], [

        /(flrp)\/([\w\.-]+)/i                                               // Flip Player
        ], [[NAME, 'Flip Player'], VERSION, [TYPE, MEDIAPLAYER]], [

        /(fstream|nativehost|queryseekspider|ia-archiver|facebookexternalhit)/i
                                                                            // FStream/NativeHost/QuerySeekSpider/IA Archiver/facebookexternalhit
        ], [NAME, [TYPE, MEDIAPLAYER]], [

        /(gstreamer) souphttpsrc.+libsoup\/([\w\.-]+)/i
                                                                            // Gstreamer
        ], [NAME, VERSION, [TYPE, MEDIAPLAYER]], [

        /(htc streaming player)\s[\w_]+\s\/\s([\d\.]+)/i,                   // HTC Streaming Player
        /(java|python-urllib|python-requests|wget|libcurl)\/([\w\.-_]+)/i,
                                                                            // Java/urllib/requests/wget/cURL
        /(lavf)([\d\.]+)/i                                                  // Lavf (FFMPEG)
        ], [NAME, VERSION, [TYPE, MEDIAPLAYER]], [

        /(htc_one_s)\/([\d\.]+)/i,                                          // HTC One S
        ], [[NAME, /_/g, ' '], VERSION, [TYPE, MEDIAPLAYER]], [

        /(mplayer)(?:\s|\/)(?:(?:sherpya-){0,1}svn)(?:-|\s)(r\d+(?:-\d+[\w\.-]+))/i,
                                                                            // MPlayer SVN
        ], [NAME, VERSION, [TYPE, MEDIAPLAYER]], [

        /(mplayer)(?:\s|\/)([\w\.-]+)/i,                                    // MPlayer
        /(mplayer) unknown-([\w\.\-]+)/i                                    // MPlayer UNKNOWN
        ], [NAME, VERSION, [TYPE, MEDIAPLAYER]], [

        /(mplayer)/i,                                                       // MPlayer (no other info)
        /(yourmuze)/i,                                                      // YourMuze
        /(media player classic|nero showtime)/i                             // Media Player Classic/Nero ShowTime
        ], [NAME, [TYPE, MEDIAPLAYER]], [

        /(nero (?:home|scout))\/([\w\.-]+)/i                                // Nero Home/Nero Scout
        ], [NAME, VERSION, [TYPE, MEDIAPLAYER]], [

        /(nokia\d+)\/([\w\.-]+)/i                                           // Nokia
        ], [NAME, VERSION, [TYPE, MEDIAPLAYER]], [

        /\s(songbird)\/([\w\.-]+)/i                                         // Songbird/Philips-Songbird
        ], [NAME, VERSION, [TYPE, MEDIAPLAYER]], [

        /(winamp)3 version ([\w\.-]+)/i,                                    // Winamp
        /(winamp)\s([\w\.-]+)/i,
        /(winamp)mpeg\/([\w\.-]+)/i
        ], [NAME, VERSION, [TYPE, MEDIAPLAYER]], [

        /(ocms-bot|tapinradio|tunein radio|unknown|winamp|inlight radio)/i  // OCMS-bot/tap in radio/tunein/unknown/winamp (no other info)
                                                                            // inlight radio
        ], [NAME, [TYPE, MEDIAPLAYER]], [

        /(quicktime|rma|radioapp|radioclientapplication|soundtap|totem|stagefright|streamium)\/([\w\.-]+)/i
                                                                            // QuickTime/RealMedia/RadioApp/RadioClientApplication/
                                                                            // SoundTap/Totem/Stagefright/Streamium
        ], [NAME, VERSION, [TYPE, MEDIAPLAYER]], [

        /(smp)([\d\.]+)/i                                                   // SMP
        ], [NAME, VERSION, [TYPE, MEDIAPLAYER]], [

        /(vlc) media player - version ([\w\.]+)/i,                          // VLC Videolan
        /(vlc)\/([\w\.-]+)/i,
        /(xbmc|gvfs|xine|xmms|irapp)\/([\w\.-]+)/i,                         // XBMC/gvfs/Xine/XMMS/irapp
        /(foobar2000)\/([\d\.]+)/i,                                         // Foobar2000
        /(itunes)\/([\d\.]+)/i                                              // iTunes
        ], [NAME, VERSION, [TYPE, MEDIAPLAYER]], [

        /(wmplayer)\/([\w\.-]+)/i,                                          // Windows Media Player
        /(windows-media-player)\/([\w\.-]+)/i
        ], [[NAME, /-/g, ' '], VERSION, [TYPE, MEDIAPLAYER]], [

        /windows\/([\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ (home media server)/i,
                                                                            // Windows Media Server
        ], [VERSION, [NAME, 'Windows'], [TYPE, MEDIAPLAYER]], [

        /(com\.riseupradioalarm)\/([\d\.]*)/i                               // RiseUP Radio Alarm
        ], [NAME, VERSION, [TYPE, MEDIAPLAYER]], [

        /(rad.io)\s([\d\.]+)/i,                                             // Rad.io
        /(radio.(?:de|at|fr))\s([\d\.]+)/i
        ], [[NAME, 'rad.io'], VERSION, [TYPE, MEDIAPLAYER]]
    ]
});

////////////////////////
// MODULES / LIBRARIES
///////////////////////

const Modules = Object.freeze({
    browser : [
        // Axios/jsdom/Scrapy
        [/\b(axios|jsdom|scrapy)\/([\w\.]+)/i], [NAME, VERSION, [TYPE, MODULE]]
    ]
});

module.exports = { 
    CLIs,
    Crawlers,
    ExtraDevices,
    Emails,
    Fetchers,
    InApps,
    MediaPlayers,
    Modules
};