var assert = require("assert");
var UAParser = require("./ua-parser");

describe('getDevice', function () {
  it('should return the model', function () {
    var parser = new UAParser('Mozilla/5.0 (PlayBook; U; RIM Tablet OS 1.0.0; en-US) AppleWebKit/534.11 (KHTML, like Gecko) Version/7.1.0.7 Safari/534.11');
    var device = parser.getDevice();
    assert.equal(device.model, "PlayBook");
  });
});
