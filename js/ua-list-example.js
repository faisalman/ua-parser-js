// Only used for testing purpose, some of which are taken from:
// - http://www.zytrax.com/tech/web/browser_ids.htm
// - http://www.zytrax.com/tech/web/mobile_ids.html
// - http://user-agent-string.info/list-of-ua
// - http://www.useragentstring.com/pages/useragentstring.php

var uaExampleList = [

// AhrefsBot
"Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)",

// AirMail
"Airmail 1.0 rv:148 (Macintosh; Mac OS X 10.8.3; en_BE)",

// Apache-HttpClient
"Apache-HttpClient/4.5.14 (Java/17.0.12)",

// Avant
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; GTB5; Avant Browser; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",

// Buffer
"BufferLinkPreviewBot/1.0 (+https://scraper.buffer.com/about/bots/link-preview-bot)",

// Camino
"Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10.4; en; rv:1.9.0.19) Gecko/2011091218 Camino/2.0.9 (like Firefox/3.0.19)",

// ChatGPT
"Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.0; +https://openai.com/gptbot)",
"Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot",

// Chrome
    // Windows Vista
"Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.75 Safari/537.1",
    // Linux
"Mozilla/5.0 (X11; U; Linux i686; en-US) AppleWebKit/534.16 (KHTML, like Gecko) Chrome/10.0.648.127 Safari/534.16",
    // iOS
"Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3",
    // Android
"Mozilla/5.0 (Linux; U; Android-4.0.3; en-us; Galaxy Nexus Build/IML74K) AppleWebKit/535.7 (KHTML, like Gecko) CrMo/16.0.912.75 Mobile Safari/535.7",
    // Chromium OS
"Mozilla/5.0 (X11; U; CrOS i686 9.10.0; en-US) AppleWebKit/532.5 (KHTML, like Gecko) Chrome/4.0.253.0 Safari/532.5",

// Chromium
"Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.7 (KHTML, like Gecko) Ubuntu/11.10 Chromium/16.0.912.21 Chrome/16.0.912.21 Safari/535.7",

// Claudebot
"Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",

// Dillo
"Dillo/2.2",

// Discord
"Discord/52.0 (iPad; iOS 14.4; Scale/2.00)",

// Dolphin
"Mozilla/5.0 (Linux; U; Android 2.3.5; en-gb; HTC Desire HD A9191 Build/GRJ90) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",

// Epiphany
"Mozilla/5.0 (X11; U; FreeBSD i386; en-US; rv:1.7) Gecko/20040628 Epiphany/1.2.6",

// Firefox
    // OpenBSD
"Mozilla/5.0 (X11; U; OpenBSD i386; en-US; rv:1.8.1.14) Gecko/20080821 Firefox/2.0.0.14",
    // Solaris
"Mozilla/5.0 (X11; U; SunOS sun4u; en-US; rv:1.9b5) Gecko/2008032620 Firefox/3.0b5",

// IceWeasel
"Mozilla/5.0 (X11; U; Linux i686; de; rv:1.9.0.16) Gecko/2009121610 Iceweasel/3.0.6 (Debian-3.0.6-3)",

// iCab
"iCab/2.9.5 (Macintosh; U; PPC; Mac OS X)",

// IEMobile
"Mozilla/4.0 (compatible; MSIE 6.0; Windows CE; IEMobile 7.11) 320x240; VZW; Motorola-Q9c; Windows Mobile 6.1 Standard",

// K-Meleon
"Mozilla/5.0 (Windows; U; Win98; en-US; rv:1.5) Gecko/20031016 K-Meleon/0.8.2",

// Konqueror
"Mozilla/5.0 (compatible; Konqueror/3.5; Linux; X11; x86_64) KHTML/3.5.6 (like Gecko) (Kubuntu)",

// Lunascape
"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1.2) Gecko/20090804 Firefox/3.5.2 Lunascape/5.1.4.5",

// Lynx
"Lynx/2.8.5dev.16 libwww-FM/2.14 SSL-MM/1.4.1 OpenSSL/0.9.6b",

// Mattermost
"Mattermost/1.49.1 (iPad; iOS 15.3.1; Scale/2.00)",

// Maxthon
"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; SV1; Maxthon; .NET CLR 1.1.4322)",

// Midori
"Midori/0.2.2 (X11; Linux i686; U; en-us) WebKit/531.2+",

// Minimo
    // Nokia
"Mozilla/5.0 (X11; U; Linux armv6l; rv 1.8.1.5pre) Gecko/20070619 Minimo/0.020",
    // Windows CE
"Mozilla/5.0 (Windows; U; Windows CE 5.1; rv:1.8.1a3) Gecko/20060610 Minimo/0.016",

// Mozilla
"Mozilla/5.0 (X11; U; SunOS sun4u; en-US; rv:1.7) Gecko/20070606",

// MSIE
    // Windows
"Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)",
    // Mac
"Mozilla/4.0 (compatible; MSIE 5.0b1; Mac_PowerPC)",

// Netfront
"Mozilla/4.0 (PDA; Windows CE/1.0.1) NetFront/3.0",

// Netscape
    // Windows 2000
"Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.7.5) Gecko/20050519 Netscape/8.0.1",
    // Windows 98
"Mozilla/5.0 (Windows; U; Win98; en-US; rv:1.7.5) Gecko/20050603 Netscape/8.0.2",
    // Windows 95
"Mozilla/5.0 (Windows; U; Win95; de-DE; rv:0.9.2) Gecko/20010726 Netscape6/6.1",
    // Windows ME
"Mozilla/5.0 (Windows; U; Win 9x 4.90; en-US; rv:1.8.1.8pre) Gecko/20071015 Firefox/2.0.0.7 Navigator/9.0",
    // HP-UX
"Mozilla/5.0 (X11; U; HP-UX 9000/785; es-ES; rv:1.0.1) Gecko/20020827 Netscape/7.0",
    // AIX
"Mozilla/5.0 (X11; U; AIX 0048013C4C00; en-US; rv:1.0.1) Gecko/20021009 Netscape/7.0",

// Omniweb
"Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-US) AppleWebKit/85 (KHTML, like Gecko) OmniWeb/v558.48",

// Opera
    // Linux
"Opera/9.80 (X11; Linux x86_64; U; Linux Mint; en) Presto/2.2.15 Version/10.10",
    // Windows 95
"Mozilla/4.0 (compatible; MSIE 5.0; Windows 95) Opera 6.01 [en]",
    // OSX
"Opera/8.5 (Macintosh; PPC Mac OS X; U; en)",

// Opera Mobile
    // Android
"Opera/9.80 (Android 2.3.5; Linux; Opera Mobi/ADR-1111101157; U; de) Presto/2.9.201 Version/11.50",
    // Windows Mobile
"Opera/9.80 (Windows Mobile; WCE; Opera Mobi/WMD-50433; U; en) Presto/2.4.13 Version/10.00",

// Opera Mini
"Opera/9.80 (S60; SymbOS; Opera Mobi/499; U; ru) Presto/2.4.18 Version/10.00",

// Opera Webkit
"Mozilla/5.0 (Linux; Android 4.1.2; GT-N7000 Build/JZO54K) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.123 Mobile Safari/537.22 OPR/14.0.1025.52315",

// PerplexityBot
"Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)",

// Polaris
"LG-LX600 Polaris/6.0 MMP/2.0 Profile/MIDP-2.1 Configuration/CLDC-1.1",

// Safari
    // OSX
"Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_6; en-us) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27",
    // iPhone
"Mozilla/5.0 (iPhone; U; CPU iPhone OS 2_1 like Mac OS X; en-us) AppleWebKit/525.18.1 (KHTML, like Gecko) Version/3.1.1 Mobile/5F136 Safari/525.20",
    // iPod Touch
"Mozilla/5.0 (iPod; U; CPU iPhone OS 2_0 like Mac OS X; de-de) AppleWebKit/525.18.1 (KHTML, like Gecko) Version/3.1.1 Mobile/5A347 Safari/525.20",

// UC
"Mozilla/5.0 (Linux; U; Android 2.3.4; en-US; MT11i Build/4.0.2.A.0.62) AppleWebKit/534.31 (KHTML, like Gecko) UCBrowser/9.0.1.275 U3/0.8.0 Mobile Safari/534.31",

// Tizen
"Mozilla/5.0 (Linux; U; Tizen/1.0 like Android; en-us; AppleWebKit/534.46 (KHTML, like Gecko) Tizen Browser/1.0 Mobile",

// Apple
    // iPhone
"Mozilla/5.0 (iPhone; CPU iPhone OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B176 Safari/7534.48.3",
    // iPod
"Mozilla/5.0 (iPhone; CPU iPhone OS 5_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A405 Safari/7534.48.3",
    // iPad
"Mozilla/5.0 (iPad; U; CPU OS 4_3 like Mac OS X; de-de) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8F191 Safari/6533.18.5",

// BlackBerry
    // Playbook
"Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.0.1; en-US) AppleWebKit/535.8+ (KHTML, like Gecko) Version/7.2.0.1 Safari/535.8+",
    // Bold
"Mozilla/5.0 (BlackBerry; U; BlackBerry 9700; en-US) AppleWebKit/534.8+ (KHTML, like Gecko) Version/6.0.0.448 Mobile Safari/534.8+",

// Kindle
    // 2
"Mozilla/4.0 (compatible; Linux 2.6.22) NetFront/3.4 Kindle/2.0 (screen 600x800)",
    // Fire
"Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.1.0-84) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true",

// LG
    // Cookie
"LG-GS290/V100 Obigo/WAP2.0 Profile/MIDP-2.1 Configuration/CLDC-1.1",

// Motorola
    // RAZR2
"MOT-V9mm/00.62 UP.Browser/6.2.3.4.c.1.123 (GUI) MMP/2.0",

// Nintendo
    // 3DS
"Mozilla/5.0 (Nintendo 3DS; U; ; en) Version/1.7498.EU",
    // Wii
"Opera/9.30 (Nintendo Wii; U; ; 2047-7; en)",

// Nokia
    // 5800
"Mozilla/5.0 (SymbianOS/9.4; U; Series60/5.0 Nokia5800d-1b/20.2.014; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/413 (KHTML, like Gecko) Safari/413",
    // N70
"NokiaN70-1/5.0737.3.0.1 Series60/2.8 Profile/MIDP-2.0 Configuration/CLDC-1.1/UC Browser7.8.0.95/27/352",
    // N900
"Mozilla/5.0 (X11; U; Linux armv7l; en-GB; rv:1.9.2a1pre) Gecko/20090928 Firefox/3.5 Maemo Browser 1.4.1.22 RX-51 N900",
    // N-Gage
"NokiaN-Gage/1.0 SymbianOS/6.1 Series60/1.2 Profile/MIDP-1.0 Configuration/CLDC-1.0",

// Palm
    // Pre
"Mozilla/5.0 (webOS/1.4.5; U; en-US) AppleWebKit/532.2 (KHTML, like Gecko) Version/1.0 Safari/532.2 Pre/1.0",

// python-urllib3
"python-urllib3/1.26.18",

// Samsung
    // Galaxy Ace
"Mozilla/5.0 (Linux; U; Android 2.3.5; de-de; SAMSUNG GT-S5830/S5830BUKS2 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
    // Galaxy Tab 10
"Mozilla/5.0 (Linux; U; Android 3.0.1; de-de; GT-P7100 Build/HRI83) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 MobileSafari/534.13",

// Sony
    // PS3
"Mozilla/5.0 (PLAYSTATION 3; 1.00)",
    // PSP
"Mozilla/4.0 (PSP (PlayStation Portable); 2.00)",

// Thunderbird
"Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Thunderbird/78.13.0",

// WhatsApp
"WhatsApp/2.23.20.0",

// ZTE
"Mozilla/5.0 (ZTE-E_N72/N72V1.0.0B02;U;Windows Mobile/6.1;Profile/MIDP-2.0 Configuration/CLDC-1.1;320*240;CTC/2.0) IE/6.0 (compatible; MSIE 4.01; Windows CE; PPC)/UC Browser7.7.1.88"
];
