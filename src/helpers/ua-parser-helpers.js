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

const unfreezeUA = async () => {
    if (!navigator) {
        throw new Error('Currently only support browser environment');
    } else {
        let ua = navigator.userAgent;
        if (navigator.userAgentData && isFrozenUA(ua)) {        
            const ch = await navigator.userAgentData.getHighEntropyValues(['architecture', 'bitness', 'fullVersionList', 'model', 'platform', 'platformVersion', 'wow64']);
            switch (ch.platform) {
                case 'Windows':
                    let [major, minor] = ch.platformVersion?.split('.').map(i => parseInt(i, 10));
                    let osReplacer = (major < 1) ? 
                                        `$<OS> 6.${minor}` : 
                                        (major >= 13) ? 
                                            `$<OS> 11.${minor}` : 
                                            `$<OS> 10.${minor}`;   
                    let archReplacer = (ch.architecture == 'arm') ? 
                                        '; ARM' : 
                                        (ch.wow64) ? 
                                            '; WOW64' : 
                                            (ch.architecture == 'x86' && ch.bitness == '64') ? 
                                                '; $<ARCH>' : '';
                    ua = ua.replace(/(?<OS>Windows NT) 10\.0/, osReplacer)
                            .replace(/; (?<ARCH>Win64; x64)/, archReplacer);
                    break;
                case 'Android':
                    ua = ua.replace(/(?<OS>Android) 10; K/, `$<OS> ${ch.platformVersion}; ${ch.model}`);
                    break;
                case 'Linux':
                case 'Chrome OS':
                    archReplacer = (ch.architecture == 'arm') ? 
                                     ((ch.bitness == '64') ? 'arm64' : 'arm') :
                                        (ch.architecture == 'x86' && ch.bitness == '64') ?
                                            '$<ARCH>' : 'x86';
                    
                    ua = ua.replace(/(?<ARCH>x86_64)/, archReplacer);
                    break;
                case 'macOS':
                    ua = ua.replace(/(?<OS>Mac OS X) 10_15_7/, `$<OS> ${ch.platformVersion.replace(/\./, '_')}`);
                    break;
            }
            let browserReplacer = '';
            ch.fullVersionList?.forEach((browser) => {
                if (!/not.a.brand/i.test(browser.brand)) {
                    browserReplacer += `${browser.brand}/${browser.version} `; 
                }
            });
            if (browserReplacer) {
                ua = ua.replace(/Chrome\/\d+\.0\.0\.0 /, browserReplacer);
            }
        }
        return ua;
    }
};

module.exports = { 
    isFrozenUA,
    unfreezeUA
};