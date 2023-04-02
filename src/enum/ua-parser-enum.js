///////////////////////////////////////////////
/*  Enums for UAParser.js v2.0.0-alpha.2
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    MIT License */
//////////////////////////////////////////////

const BrowserName = Object.freeze({
    CHROME          : 'Chrome',
    EDGE            : 'Edge',
    SAFARI          : 'Safari',
    FIREFOX         : 'Firefox',
    OPERA           : 'Opera',
    MOBILE_CHROME   : 'Mobile Chrome',
    MOBILE_SAFARI   : 'Mobile Safari',
    MOBILE_FIREFOX  : 'Mobile Firefox',
    ANDROID_BROWSER : 'Android Browser'

    // TODO : test!
});

const CPUArch = Object.freeze({
    IA32    : 'ia32',
    AMD64   : 'amd64',
    IA64    : 'ia64',
    ARM     : 'arm',
    ARM64   : 'arm64',
    ARMHF   : 'armhf',
    _68K    : '68k',
    AVR     : 'avr',
    IRIX    : 'irix',
    IRIX64  : 'irix64',
    MIPS    : 'mips',
    MIPS64  : 'mips64',
    PPC     : 'ppc',
    SPARC   : 'sparc',
    SPARC64 : 'sparc64'
});

const DeviceType = Object.freeze({
    MOBILE  : 'mobile',
    TABLET  : 'tablet',
    SMARTTV : 'smarttv',
    CONSOLE : 'console',
    WEARABLE: 'wearable',
    EMBEDDED: 'embedded'
});

const DeviceVendor = Object.freeze({
    APPLE   : 'Apple',
    SAMSUNG : 'Samsung',
    HUAWEI  : 'Huawei',
    XIAOMI  : 'Xiaomi',
    OPPO    : 'OPPO',
    VIVO    : 'Vivo',
    REALME  : 'Realme',
    LENOVO  : 'Lenovo',
    LG      : 'LG'

    // TODO : test!
});

const EngineName = Object.freeze({
    AMAYA   : 'Amaya',
    BLINK   : 'Blink',
    EDGEHTML: 'EdgeHTML',
    FLOW    : 'Flow',
    GECKO   : 'Gecko',
    GOANNA  : 'Goanna',
    ICAB    : 'iCab',
    LIBWEB  : 'LibWeb',
    KHTML   : 'KHTML',
    LINKS   : 'Links',
    LYNX    : 'Lynx',
    NETFRONT: 'NetFront',
    NETSURF : 'NetSurf',
    PRESTO  : 'Presto',
    TASMAN  : 'Tasman',
    TRIDENT : 'Trident',
    W3M     : 'w3m',
    WEBKIT  : 'WebKit'
});

const OSName = Object.freeze({
    WINDOWS : 'Windows',
    LINUX   : 'Linux',
    MACOS   : 'macOS',
    IOS     : 'iOS',
    ANDROID : 'Android'

    // TODO : test!
});

module.exports = { 
    BrowserName, 
    CPUArch, 
    DeviceType, 
    DeviceVendor,
    EngineName,
    OSName
}