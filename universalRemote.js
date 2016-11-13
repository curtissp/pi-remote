var util = require("util");
var exec = require('child_process').exec;

var soundbarButtons = {
    power: "KEY_POWER",
    volumeUp: "KEY_VOLUMEUP",
    volumeDown: "KEY_VOLUMEDOWN"
};

var uverseButtons = {
    power: "KEY_POWER"
};

var tvButtons = {
    power: "KEY_POWER"
};

var remotes = {
    tv: {
        name: "tv",
        buttons: tvButtons
    },
    soundbar: {
        name: "soundbar",
        buttons: soundbarButtons
    },
    uverse: {
        name: "uverse",
        buttons: uverseButtons
    }
};

var repeatButtonPresses= function(remoteName, button, count) {
    var commands = [];
    for(var i = 0; i < count; i++) {
        commands.push({ remote: remoteName, button: button });
    }
    return commands;
};

var macros = {
    turnUp: repeatButtonPresses(remotes.soundbar.name, soundbarButtons.volumeUp, 6),
    turnDown: repeatButtonPresses(remotes.soundbar.name, soundbarButtons.volumeDown, 6),
    togglePower: [{
        remote: remotes.tv.name,
        button: tvButtons.power
    },
    {
        remote: remotes.uverse.name,
        button: uverseButtons.power
    },
    {
        remote: remotes.soundbar.name,
        button: soundbarButtons.power,
    }]
};

var executeMacro = function(cmds) {
    var delay = 500;
    cmds.forEach(function(cmd, i) {
        setTimeout(function(){
            sendCommand(cmd.remote, cmd.button);
        }, delay * i)
    });
};

var sendCommand = function(remoteName, buttonName) {
    var command = util.format("irsend SEND_ONCE %s %s", remoteName, buttonName );
    exec(command, function(err, stdout, stderr){
        if (err) console.log(err)
        else if (stderr) console.log(stderr)
        else console.log("Success: %s %s", remoteName, buttonName)
    }) 
};

module.exports = {
    macros: macros,
    remotes: remotes,
    sendCommand: sendCommand,
    executeMacro: executeMacro
};