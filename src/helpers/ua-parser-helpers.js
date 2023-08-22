///////////////////////////////////////////////
/*  A collection of utility methods for UAParser.js
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    MIT License */
//////////////////////////////////////////////

/*jshint esversion: 11 */ 

/*
    # Reference:
    https://www.chromium.org/updates/ua-reduction/

    # Desktop
    ---
    Format:
    Mozilla/5.0 (<unifiedPlatform>) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/<majorVersion>.0.0.0 Safari/537.36

    Possible <unifiedPlatform> values:
    - Windows NT 10.0; Win64; x64
    - Macintosh; Intel Mac OS X 10_15_7
    - X11; Linux x86_64
    - X11; CrOS x86_64 14541.0.0
    - Fuchsia 

    # Mobile & Tablet: (except iOS/Android WebView)
    ---
    Format:
    Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/<majorVersion>.0.0.0 <deviceCompat> Safari/537.36
    
    Possible <deviceCompat> values:
    - "Mobile"
    - "" (empty string for Tablets & Desktop)
*/

const isFrozenUA = ua => /^Mozilla\/5\.0 \((Windows NT 10\.0; Win64; x64|Macintosh; Intel Mac OS X 10_15_7|X11; Linux x86_64|X11; CrOS x86_64 14541\.0\.0|Fuchsia|Linux; Android 10; K)\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) Chrome\/\d+\.0\.0\.0 (Mobile )?Safari\/537\.36$/.test(ua);

const unfreezeUA = async (ua, ch) => {
    const env = typeof navigator == 'undefined' ? 'node' : 'browser';
    if (env == 'node') {
        if (!ua['user-agent']) {
            throw new Error('User-Agent header not found');
        }
        ch = UACHParser(ua);
        ua = ua['user-agent'];
    } else {
        ua = ua || navigator.userAgent;
        ch = ch || await navigator.userAgentData?.getHighEntropyValues(['arch', 'bitness', 'fullVersionList', 'model', 'platform', 'platformVersion', 'wow64']);
    }
    if (isFrozenUA(ua) && ch) {
        switch (ch.platform) {
            case 'Windows':
                let [major, minor] = ch.platformVersion
                                        .split('.')
                                        .map(num => parseInt(num, 10));
                major = (major < 1) ? '6' : (major >= 13) ? '11' : '10';
                ua = ua .replace(/(?<OS>Windows NT) 10\.0/, `$<OS> ${major}.${minor}`)
                        .replace(/; (?<ARCH>Win64; x64)/, 
                            (ch.architecture == 'arm') ? 
                                '; ARM' : 
                                (ch.wow64) ? 
                                    '; WOW64' : 
                                    (ch.architecture == 'x86' && ch.bitness != '64') ? 
                                        '' : '; $<ARCH>');
                break;
            case 'Android':
                ua = ua.replace(/(?<OS>Android) 10; K/, `$<OS> ${ch.platformVersion}; ${ch.model}`);
                break;
            case 'Linux':
            case 'Chrome OS':
                ua = ua.replace(/(?<ARCH>x86_64)/,
                        (ch.architecture == 'arm') ? 
                            ((ch.bitness == '64') ? 'arm64' : 'arm') :
                                (ch.architecture == 'x86' && ch.bitness != '64') ?
                                    'x86' : '$<ARCH>');
                break;
            case 'macOS':
                ua = ua.replace(/(?<OS>Mac OS X) 10_15_7/, `$<OS> ${ch.platformVersion.replace(/\./, '_')}`);
                break;
        }
        if (ch.fullVersionList) {
            ua = ua.replace(/Chrome\/\d+\.0\.0\.0 /, 
                        ch.fullVersionList
                            .filter(browser => !/not.a.brand/i.test(browser.brand))
                            .map(browser => `${browser.brand.replace(/^google /i,'')}/${browser.version} `)
                            .join(''));
        }
    }
    return ua;
};

const UACHMap = {
    'sec-ch-ua-arch' : {
        prop    : 'architecture', 
        type    : 'sf-string'
    },
    'sec-ch-ua-bitness' : {
        prop    : 'bitness', 
        type    : 'sf-string'
    },
    'sec-ch-ua' : {
        prop    : 'brands', 
        type    : 'sf-list'
    },
    'sec-ch-ua-form-factor' : {
        prop    : 'formFactor', 
        type    : 'sf-string'
    },
    'sec-ch-ua-full-version-list' : {
        prop    : 'fullVersionList', 
        type    : 'sf-list'
    },
    'sec-ch-ua-mobile' : {
        prop    : 'mobile', 
        type    : 'sf-boolean',
    },
    'sec-ch-ua-model' : {
        prop    : 'model', 
        type    : 'sf-string',
    },
    'sec-ch-ua-platform' : {
        prop    : 'platform',
        type    : 'sf-string'
    }, 
    'sec-ch-ua-platform-version' : {
        prop    : 'platformVersion', 
        type    : 'sf-string'
    },
    'sec-ch-ua-wow64' : {
        prop    : 'wow64',
        type    : 'sf-boolean'
    }
};

const UACHParser = (headers) => {
    const parse = (str, type) => {
        if (!str) {
            return '';
        }
        switch (type) {
            case 'sf-boolean':
                return /\?1/.test(str);
            case 'sf-list':
                return str.replace(/\\?\"/g, '')
                    .split(', ')
                    .map(brands => {
                        const [brand, version] = brands.split(';v=');
                        return { 
                            brand : brand, 
                            version : version
                        };
                });
            case 'sf-string':
            default:
                return str.replace(/\\?\"/g, '');
        }
    };
    let ch = {};
    Object.keys(UACHMap).forEach(field => {
        if (headers.hasOwnProperty(field)) {
            const { prop, type } = UACHMap[field];
            ch[prop] = parse(headers[field], type);
        }
    });
    return ch;
};

module.exports = { 
    isFrozenUA,
    unfreezeUA,
    UACHParser
};