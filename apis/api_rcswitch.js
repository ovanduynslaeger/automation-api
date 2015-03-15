var rcswitch = require('rcswitch'); // Might throw an error if wiring pi init failed (no root)


exports.deviceCommand = function(req, res){
    var homeCode = req.params.group;
    var deviceId = req.params.deviceId;
    var command = req.params.command;

    runDeviceCommand(homeCode,deviceId,command,function(error) {
        if (error!=null) { 
            res.send (error);
        }
        else {
            res.send('{ "data" : { "group" : '+homeCode+' , "device": '+deviceId+', "command: '+command+'} }');        
        }
    });

};

function translateCommand(word){
    switch (word) {
        case "on":  
            return "1";
        case "off":
            return "0";
        default :
            return null;
    }
}


function runDeviceCommand(homeCode,deviceId,command,callback) {

    var commandCode = translateCommand(command);
    //transcode A=1 B=2 etc...
    var noDevice = deviceId.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
    rcswitch.enableTransmit(0); // Use data Pin 0
    switch (commandCode) {
        case "1":
            rcswitch.switchOn(homeCode, noDevice); 
            callback(null);
            break;
        case "0":
            rcswitch.switchOff(homeCode, noDevice);
            callback(null);
            break;
        default:
            callback( new Error("Invalid command " + command));
    }
    
};
