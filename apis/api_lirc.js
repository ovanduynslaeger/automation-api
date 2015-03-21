//var exec = require('child_process').exec;
var lirc_node = require('lirc_node');


exports.deviceOneCommand = function(req, res){
    var deviceId = req.params.deviceId;
    var command = req.params.command;

    runDeviceCommand(deviceId,command,1,function(error) {
        if (error!=null) { 
            res.send (error);
        }
        else {
            res.send('{ "data" : { "device": '+deviceId+', "command: '+command+'} }');
        }
    });
}    

exports.deviceCommand = function(req, res){
    var deviceId = req.params.deviceId;
    var command = req.params.command;
    var it = req.params.iterate;

    runDeviceCommand(deviceId,command,it,function(error) {
        if (error!=null) { 
            res.send (error);
        }
        else {
            res.send('{ "data" : { "device": '+deviceId+', "command: '+command+', "iterate: '+it+'} }');
        }
    });

};

function translateCommand(word,iterate){
    var it = Math.abs(parseInt(iterate));
    switch (word) {
        case "on":
            return "SYSTEM_POWER";
        case "off":
            return "STANDBY";
        case "mute":
            return "MUTE";
        case "vol":
            var v="";
            var i;
            for (i=0; i < it; i++) {
                if (iterate.charAt(0) == "-")
                  v = v + "VOL- ";
                else
                  v = v + "VOL+ ";
            }
            return v;
        case "modetv":
            return "DTV/CBL";
        case "modemovie":
            return "DVD";
        default :
            return null;
    }
}


function runDeviceCommand(deviceId,command,it,callback) {

    lirc_node.init();
    console.log(lirc_node.remotes);

    var commandCode = translateCommand(command,it);

    if (commandCode!=null) {
        lirc_node.irsend.send_once(deviceId, commandCode, function() {
          console.log("Sent LIRC command!");
          callback(null);
        });
    }
    else {
        callback( new Error("Invalid command " + command));
    }

};