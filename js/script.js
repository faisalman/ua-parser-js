$(document)
  .ready(function() {

    var updateDemo = function (result) {
        if(!result) return;
        $('#ua-txt').transition('zoom', function () {
            $(this).text(result.ua);
            $(this).transition('zoom');
        });
        $('#ua-result').text(JSON.stringify(result, null, "  "));
        $('#demo-result').transition('zoom', function () {
            if (result.browser.name) {
                var version = result.browser.version!==undefined?result.browser.version:'-';
                $('#browser-txt').html('<span class="ui large black label">' + result.browser.name + '</span><span class="ui large black label">' + version + '</span>');
                $('#browser-img').attr('src', 'images/browsers/' + result.browser.name.toLowerCase() + '.png').on('error', function () {
                    $(this).attr('src', 'images/browsers/default.png');
                });
            } else {
                $('#browser-txt').text('-');
                $('#browser-img').attr('src', 'images/browsers/default.png');
            }
            if (result.engine.name) {
                var version = result.engine.version!==undefined?result.engine.version:'-';
                $('#engine-txt').html('<span class="ui large black label">' + result.engine.name + '</span><span class="ui large black label">' + version + '</span>');
                $('#engine-img').attr('src', 'images/engines/' + result.engine.name.toLowerCase() + '.png').on('error', function () {
                    $(this).attr('src', 'images/engines/default.png');
                });
            } else {
                $('#engine-txt').text('-');
                $('#engine-img').attr('src', 'images/engines/default.png');
            }
            if (result.os.name) {
                var version = result.os.version!==undefined?result.os.version:'-';
                $('#os-txt').html('<span class="ui large black label">' + result.os.name + '</span><span class="ui large black label">' + version + '</span>');
                $('#os-img').attr('src', 'images/os/' + result.os.name.toLowerCase() + '.png').on('error', function () {
                    $(this).attr('src', 'images/os/default.png');
                });
            } else {
                $('#os-txt').text('-');
                $('#os-img').attr('src', 'images/os/default.png');
            }
            if (result.cpu.architecture) {
                $('#cpu-txt').html('<span class="ui large black label">' + result.cpu.architecture + '</span>');
                $('#cpu-img').attr('src', 'images/cpu/' + result.cpu.architecture.toLowerCase() + '.png').on('error', function () {
                    $(this).attr('src', 'images/cpu/default.png');
                });
            } else {
                $('#cpu-txt').text('-');
                $('#cpu-img').attr('src', 'images/cpu/default.png');
            }
            if (result.device.type) {
                $('#type-txt').html('<span class="ui large black label">' + result.device.type + '</span>');
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
                $('#device-txt').html('<span class="ui large black label">' + vendor + '</span><span class="ui large black label">' + model + '</span>');
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
/*            if (result.gpu.vendor) {
                var vendor = result.gpu.vendor!=undefined?result.gpu.vendor:'-';
                var model = result.gpu.model!==undefined?result.gpu.model:'-';
                $('#gpu-txt').html('<span class="ui large black label">' + vendor + '</span><span class="ui large black label">' + model + '</span>');
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
    if (URLSearchParams) {
        qs = new URLSearchParams(window.location.search).get('ua');
    }
    if (qs) {
        $('#ua-txt-info').html('What your browser tells you = 😵‍💫💢 😭💸 <span class="ui mini red label">Complex</span> <span class="ui mini red label">Costly</span> <span class="ui mini red label">Expensive</span>');
        $('#demo-result').get(0).scrollIntoView();
        updateDemo(UAParser(qs));
    } else {
        (UAParser().withFeatureCheck()).withClientHints().then(function(result) {
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