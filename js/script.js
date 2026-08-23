import { UAParser } from '../src/main/ua-parser.mjs';
import { CLIs, Crawlers, Emails, ExtraDevices, Fetchers, Libraries, InApps, Vehicles } from '../src/extensions/ua-parser-extensions.mjs';
import { isBot, isAICrawler } from '../src/bot-detection/bot-detection.mjs';
import { isChromeFamily } from '../src/browser-detection/browser-detection.mjs';

$(document)
  .ready(function() {

    var updateDemo = function (result) {
        if(!result) return;
        $('#hero-ua').text(result.ua);
        var heroCode = $('#hero-result').text(JSON.stringify(result, null, '  ')).get(0);
        if (window.hljs && heroCode) {
            heroCode.removeAttribute('data-highlighted');
            hljs.highlightElement(heroCode);
        }
        $('#ua-txt').transition('zoom', function () {
            $(this).text(result.ua);
            $(this).transition('zoom');
        });
        $('#ua-result').text(JSON.stringify(result, null, "  "));
        $('#demo-result').transition('zoom', function () {
            if (result.browser.name) {
                var version = result.browser.version!==undefined?result.browser.version:'-';
                $('#browser-txt').html('<span class="ui large basic violet label">' + result.browser.name + '</span><span class="ui large basic violet label">' + version + '</span>');
                $('#browser-img').attr('src', 'images/browsers/' + result.browser.name.toLowerCase() + '.png').on('error', function () {
                    $(this).attr('src', 'images/browsers/default.png');
                });
            } else {
                $('#browser-txt').text('-');
                $('#browser-img').attr('src', 'images/browsers/default.png');
            }
            if (result.engine.name) {
                var version = result.engine.version!==undefined?result.engine.version:'-';
                $('#engine-txt').html('<span class="ui large basic violet label">' + result.engine.name + '</span><span class="ui large basic violet label">' + version + '</span>');/*
                $('#engine-img').attr('src', 'images/engines/' + result.engine.name.toLowerCase() + '.png').on('error', function () {
                    $(this).attr('src', 'images/engines/default.png');
                });*/
            } else {
                $('#engine-txt').text('-');
                //$('#engine-img').attr('src', 'images/engines/default.png');
            }
            if (result.os.name) {
                var version = result.os.version!==undefined?result.os.version:'-';
                $('#os-txt').html('<span class="ui large basic violet label">' + result.os.name + '</span><span class="ui large basic violet label">' + version + '</span>');
                $('#os-img').attr('src', 'images/os/' + result.os.name.toLowerCase() + '.png').on('error', function () {
                    $(this).attr('src', 'images/os/default.png');
                });
            } else {
                $('#os-txt').text('-');
                $('#os-img').attr('src', 'images/os/default.png');
            }
            if (result.cpu.architecture) {
                $('#cpu-txt').html('<span class="ui large basic violet label">' + result.cpu.architecture + '</span>');
                $('#cpu-img').attr('src', 'images/cpu/' + result.cpu.architecture.toLowerCase() + '.png').on('error', function () {
                    $(this).attr('src', 'images/cpu/default.png');
                });
            } else {
                $('#cpu-txt').text('-');
                $('#cpu-img').attr('src', 'images/cpu/default.png');
            }
            if (result.device.type) {
                $('#type-txt').html('<span class="ui large basic violet label">' + result.device.type + '</span>');
                $('#type-img').attr('src', 'images/types/' + result.device.type.toLowerCase() + '.png').on('error', function () {
                    $(this).attr('src', 'images/types/default.png');
                });
            } else {
                $('#type-txt').text('-');
                $('#type-img').attr('src', 'images/types/default.png');
            }
            if (result.device.vendor || result.device.model) {
                var vendor = result.device.vendor!=undefined?result.device.vendor:'-';
                var model = result.device.model!==undefined?result.device.model:'-';
                $('#device-txt').html('<span class="ui large basic violet label">' + vendor + '</span><span class="ui large basic violet label">' + model + '</span>');
                if (result.device.vendor) {
                    $('#device-img').attr('src', 'images/companies/' + result.device.vendor.toLowerCase() + '.png').on('error', function () {
                        $(this).attr('src', 'images/companies/default.png');
                    });
                } else {
                    $('#device-img').attr('src', 'images/companies/default.png');
                }
            } else {
                $('#device-txt').text('-');
                $('#device-img').attr('src', 'images/companies/default.png');
            }
            if(result.browser.type) {
                $('#category-txt').html('<span class="ui large basic violet label">' + result.browser.type + '</span>');
            } else {
                if (result.engine.name) {
                    $('#category-txt').html('<span class="ui large basic violet label">browser</span>');
                } else {
                    $('#category-txt').text('-');
                }
            }
            if (isChromeFamily(result)) {
                $('#ischrome-txt').text('✅');
            } else {
                $('#ischrome-txt').text('❌')
            }
            if (isBot(result)) {
                $('#isbot-txt').text('✅');
            } else {
                $('#isbot-txt').text('❌')
            }
            if (isAICrawler(result)) {
                $('#isaibot-txt').text('✅');
            } else {
                $('#isaibot-txt').text('❌');
            }
/*            if (result.gpu.vendor) {
                var vendor = result.gpu.vendor!=undefined?result.gpu.vendor:'-';
                var model = result.gpu.model!==undefined?result.gpu.model:'-';
                $('#gpu-txt').html('<span class="ui large green label">' + vendor + '</span><span class="ui large green label">' + model + '</span>');
                $('#gpu-img').attr('src', 'images/companies/' + result.gpu.vendor.toLowerCase() + '.png').on('error', function () {
                    $(this).attr('src', 'images/companies/default.png');
                });
            } else {
                $('#gpu-txt').text('-');
            }*/
            $(this).transition('zoom', function () {
                $(this).transition('pulse', function () {
                    $(this).transition('jiggle');
                });
            });
        });
    }
    
    var qs;
    var extensions = [CLIs, Crawlers, Emails, ExtraDevices, Fetchers, Libraries, InApps, Vehicles];
    if (URLSearchParams) {
        qs = new URLSearchParams(window.location.search).get('ua');
    }
    if (qs) {
        $('#featured').get(0).scrollIntoView();
        updateDemo(UAParser(qs, extensions));
    } else {
        (UAParser(extensions).withFeatureCheck()).withClientHints().then(function(result) {
            updateDemo(result);
        });
    }

    var i;
    var values = [];
    var prevVal;
    for(i = 0; i < uaExampleList.length; i++){
        values.push({ name: uaExampleList[i], value: uaExampleList[i]});
    }
    $('#demo-select').dropdown({
        values: values,
        onChange: function (val) {
            if (val != prevVal)
            {
                prevVal = val;
                window.location.search = '?ua=' + val;
            }
        }
    });
    $('#demo-btn').click(function() {
        window.location.search = '?ua=' + $('input[name=custom-ua]').val();
    });
    $('input[name=custom-ua]').keypress(function (e) {
        if (e.which == 13) {
            window.location.search = '?ua=' + $(this).val();
            return false;
        }
    });
//    if (!uaparser.getGPU().vendor) {
        $('#gpu-divider,#gpu-segment').hide();
//    }

    $('.ui.rating').rating();

    const showcaseUseCases = {
        'https://github.com/microsoft/accessibility-insights-web': {
            category: 'Compatibility',
            description: 'Blocks unsupported browsers and selects the right extension adapter.'
        },
        'https://github.com/httptoolkit/httptoolkit-ui': {
            category: 'Traffic inspection',
            description: 'Identifies browsers, devices, and apps in intercepted requests.'
        },
        'https://github.com/gitpod-io/gitpod': {
            category: 'Adaptive UI',
            description: 'Links users to the right browser extension store.'
        },
        'https://github.com/aws/amazon-chime-sdk-js': {
            category: 'Analytics',
            description: 'Adds browser, OS, device, and engine data to SDK telemetry.'
        },
        'https://github.com/facebook/fbjs/tree/main/packages/fbjs': {
            category: 'Compatibility',
            description: 'Exposes browser, platform, engine, and device checks for feature gating.'
        },
        'https://github.com/pinterest/gestalt': {
            category: 'Adaptive UI',
            description: 'Renders the Gestalt docs for mobile or desktop.'
        },
        'https://github.com/Automattic/wp-calypso/tree/trunk/client': {
            category: 'Logging',
            description: 'Adds normalized browser details to request logs.'
        },
        'https://github.com/amplitude/Amplitude-JavaScript': {
            category: 'Analytics',
            description: 'Adds OS and browser data to analytics events.'
        },
        'https://github.com/optimizely/javascript-sdk': {
            category: 'Analytics',
            description: 'Adds OS and device data to Optimizely Data Platform events.'
        },
        'https://github.com/Shopify/quilt/tree/%40shopify/react-form%400.12.0/packages/browser': {
            category: 'Adaptive UI',
            description: 'Historically exposed browser and device helpers for adaptive UI.'
        },
        'https://github.com/Shopify/blockchain-components/tree/main/packages/connect-wallet': {
            category: 'Compatibility',
            description: 'Selects wallet links and Safari-specific navigation.'
        },
        'https://github.com/google/tachometer': {
            category: 'Testing',
            description: 'Labels benchmark results by browser and version.'
        },
        'https://github.com/vercel/next.js': {
            category: 'Framework API',
            description: 'Powers the userAgent API for Middleware and Edge requests.'
        },
        'https://github.com/ProtonMail/WebClients': {
            category: 'Compatibility',
            description: 'Adapts behavior by browser, OS, device, and desktop app.'
        },
        'https://github.com/mozilla/addons-frontend': {
            category: 'Compatibility',
            description: 'Gates add-on installs by Firefox platform and version.'
        },
        'https://github.com/livechat/emoji-keyboard': {
            category: 'Adaptive UI',
            description: 'Historically linked to OS-specific emoji guidance.'
        },
        'https://github.com/RocketChat/Rocket.Chat': {
            category: 'Security & UI',
            description: 'Supports compatibility checks, login alerts, and visitor details.'
        },
        'https://github.com/8thwall/8thwall': {
            category: 'Compatibility',
            description: 'Gates WebAR by device, browser, and in-app capabilities.'
        },
        'https://github.com/heremaps/harp.gl/tree/master/%40here/harp-test-utils': {
            category: 'Testing',
            description: 'Historically labeled visual baselines by browser and platform.'
        },
        'https://github.com/SalesforceCommerceCloud/pwa-kit/tree/v2.11.0': {
            category: 'Adaptive UI',
            description: 'Classifies devices for SSR rendering and cache keys.'
        }
    };
    const showcaseCategoryColors = {
        'Compatibility': 'orange',
        'Traffic inspection': 'red',
        'Adaptive UI': 'teal',
        'Analytics': 'violet',
        'Logging': 'grey',
        'Testing': 'blue',
        'Framework API': 'black',
        'Security & UI': 'red',
        'Attribution': 'olive',
        'Historical': 'grey'
    };
    const attributionPattern = /(acknowledgements|credits|dependenc|legal-notices|licenses|open-source|third.party|thanks)/i;

    $('#showcase .column').each(function () {
        const $column = $(this);
        const $image = $column.children('img');
        const $popup = $column.children('.ui.popup');

        if (!$image.length || !$popup.length) {
            return;
        }

        const company = $image.attr('alt').replace(/ logo$/i, '');
        const $list = $('<div class="ui relaxed divided list showcase-projects"></div>');

        $popup.find('a').each(function () {
            const $link = $(this);
            const href = $link.attr('href');
            const project = $link.text().replace(/\s+/g, ' ').trim();
            const useCase = showcaseUseCases[href] || (attributionPattern.test(href) ? {
                category: 'Attribution',
                description: 'Its open-source notices confirm UAParser.js usage.'
            } : {
                category: 'Undocumented',
                description: 'UAParser.js was found in this product.'
            });
            const color = showcaseCategoryColors[useCase.category] || '';
            const $icon = $link.find('i').first().detach().addClass('large middle aligned');
            const $content = $('<div class="content"></div>');
            const $header = $('<div class="header"></div>').text(project);
            const $description = $('<div class="description"></div>');
            const $label = $('<span class="ui mini label"></span>')
                .addClass(color)
                .text(useCase.category);

            if (useCase.category !== 'Attribution' && useCase.category !== 'Undocumented') {
                $header.append($label);
            }
            if (useCase.description) {
                $description.append(document.createTextNode(useCase.description));
            }
            $content.append($header, $description);
            $link
                .empty()
                .removeClass()
                .addClass('item')
                .attr('rel', 'noopener')
                .append($icon, $content);
            $list.append($link);
        });

        $popup
            .empty()
            .addClass('inverted')
            .append($('<div class="ui tiny header showcase-company"></div>').text(company))
            .append($list);
    });

    $('#showcase img').popup({
        inline: true,
        hoverable  : true,
        position   : 'top center',
        delay: {
          show: 100,
          hide: 300
        }
    });
    $(window).on('scroll', function () {
        if ($('#showcase img').offset().top < $(window).scrollTop() + $(window).height()) {
            $('#showcase img')
                .transition({
                    animation : 'jiggle',
                    duration  : 1000,
                    interval  : 500
            });
            $(window).off('scroll');
        }
    });

    var clipboard = new ClipboardJS('#btn-clipboard');
    clipboard.on('success', function(e) {
        $('.mini.modal').modal('setting', 'transition', 'vertical flip').modal('show');
        e.clearSelection();
    });
    hljs.highlightAll();

    $('.menu .item').tab();
});