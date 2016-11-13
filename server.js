var iot = require("droopy-iot").register("piRemote");
var universalRemote = require("./universalRemote");

var togglePower = function() {
    universalRemote.executeMacro(universalRemote.macros.togglePower);
};

var volumeUp = function() {
    universalRemote.executeMacro(universalRemote.macros.turnUp);
};

var volumeDown = function() {
    universalRemote.executeMacro(universalRemote.macros.turnDown);
};

iot.subscribe("togglePower", togglePower);
iot.subscribe("volumeUp", volumeUp);
iot.subscribe("volumeDown", volumeDown);