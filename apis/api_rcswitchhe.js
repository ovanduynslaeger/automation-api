var rcswitchhe = require('rc-switch-he'); 

exports.deviceCommand = function(req, res){
    var remoteDio = parseInt(req.params.remote);
    var deviceId = parseInt(req.params.deviceId);
    var command = req.params.command;

    runDeviceCommand(remoteDio, deviceId,command,function(error) {
        if (error!=null) { 
            res.send (error);
        }
        else {
            res.send('{ "data" : { "remote": '+remoteDio+', "device": '+deviceId+', "command": '+command+'} }');
        }
    });

};

function translateCommand(word){
    switch (word) {
        case "on":
        case "up":
            return "1";
        case "off":
        case "down":
            return "0";
        default :
            return null;
    }
}

function runDeviceCommand(remoteDio, deviceId,command,callback) {

    var commandCode = translateCommand(command);
    if (commandCode != null) {
        rcswitchhe.enableTransmit(0);
        switch (commandCode) {
            case "1":
                rcswitchhe.switchOn(remoteDio,deviceId); 
                callback(null);
                break;
            case "0":
                rcswitchhe.switchOff(remoteDio,deviceId);
                callback(null);
                break;
        }        
    } else {
        callback( new Error("Invalid command " + command));
    }

};