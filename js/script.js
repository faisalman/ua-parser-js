$(document)
  .ready(function() {
    var labels = ['browser.name', 'os.version', 'device.type', 'cpu.arch', 'device.model', 'browser.version', 'device.vendor', 'engine.name', 'engine.version'];
    var counter = 0;
    var rotateLabel = function () {
        $('h1 .label').transition('fly down', function () {
            $(this).text(labels[counter++]).transition('fade up', 100, function (){
            if(counter>=labels.length)counter=0;
            $(this).transition('jiggle');
            });
        });
    }
    rotateLabel();
    setInterval(rotateLabel, 3000);

    var updateDemo = function (ua) {
        var result = UAParser(ua);
        $('#ua-txt').transition('flip vertical', function () {
            $(this).text(result.ua);
            $(this).transition('flip vertical');
        });
        $('#demo-result').transition('fly up', function () {
            if (result.browser.name) {
                var version = result.browser.version!==undefined?result.browser.version:'-';
                $('#browser-txt').html('<span class="ui large label">' + result.browser.name + '</span><span class="ui large label">' + version + '</span>');
                $('#browser-img').attr('src', 'images/browsers/' + result.browser.name.toLowerCase() + '.png').on('error', function () {
                    $(this).attr('src', 'images/browsers/default.png');
                });
            } else {
                $('#browser-txt').text('-');
                $('#browser-img').attr('src', 'images/browsers/default.png');
            }
            if (result.engine.name) {
                var version = result.engine.version!==undefined?result.engine.version:'-';
                $('#engine-txt').html('<span class="ui large label">' + result.engine.name + '</span><span class="ui large label">' + version + '</span>');
                $('#engine-img').attr('src', 'images/engines/' + result.engine.name.toLowerCase() + '.png').on('error', function () {
                    $(this).attr('src', 'images/engines/default.png');
                });
            } else {
                $('#engine-txt').text('-');
                $('#engine-img').attr('src', 'images/engines/default.png');
            }
            if (result.os.name) {
                var version = result.os.version!==undefined?result.os.version:'-';
                $('#os-txt').html('<span class="ui large label">' + result.os.name + '</span><span class="ui large label">' + version + '</span>');
                $('#os-img').attr('src', 'images/os/' + result.os.name.toLowerCase() + '.png').on('error', function () {
                    $(this).attr('src', 'images/os/default.png');
                });
            } else {
                $('#os-txt').text('-');
                $('#os-img').attr('src', 'images/os/default.png');
            }
            if (result.cpu.architecture) {
                $('#cpu-txt').html('<span class="ui large label">' + result.cpu.architecture + '</span>');
                $('#cpu-img').attr('src', 'images/cpu/' + result.cpu.architecture.toLowerCase() + '.png').on('error', function () {
                    $(this).attr('src', 'images/cpu/default.png');
                });
            } else {
                $('#cpu-txt').text('-');
                $('#cpu-img').attr('src', 'images/cpu/default.png');
            }
            if (result.device.type) {
                $('#type-txt').html('<span class="ui large label">' + result.device.type + '</span>');
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
                $('#device-txt').html('<span class="ui large label">' + vendor + '</span><span class="ui large label">' + model + '</span>');
                $('#device-img').attr('src', 'images/companies/' + result.device.vendor.toLowerCase() + '.png').on('error', function () {
                    $(this).attr('src', 'images/companies/default.png');
                });
            } else {
                $('#device-txt').text('-');
                $('#device-img').attr('src', 'images/companies/default.png');
            }
            $(this).transition('fly up', function () {
                $(this).transition('pulse');
            });
        });
    }
    updateDemo();

    var i;
    var values = [];
    for(i = 0; i < uaExampleList.length; i++){
        values.push({ name: uaExampleList[i], value: uaExampleList[i]});
    }
    $('#demo-select').dropdown({
        values: values,
        onChange: function (val) {
            $('#ua-txt-info').text('Result for:');
            updateDemo(val);
        }
    });
    $('#demo-btn').click(function() {
        $('#ua-txt-info').text('Result for:');
        updateDemo($('input[name=custom-ua]').val());
    });
    $('input[name=custom-ua]').keypress(function (e) {
        if (e.which == 13) {
            $('#ua-txt-info').text('Result for:');
            updateDemo($(this).val());
            return false;
        }
    });

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

    var clipboard = new ClipboardJS('#btn-clipboard');
    clipboard.on('success', function(e) {
        $('.mini.modal').modal('setting', 'transition', 'vertical flip').modal('show');
        e.clearSelection();
    });
});