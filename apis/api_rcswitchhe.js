//var exec = require('child_process').exec;
var rcswitchhe = require('rc-switch-he'); 

exports.deviceCommand = function(req, res){
    var remoteDio = req.params.remote;
    var deviceId = req.params.deviceId;
    var command = req.params.command;

    runDeviceCommand(remoteDio, deviceId,command,function(error) {
        if (error!=null) { 
            res.send (error);
        }
        else {
            res.send('{ "data" : { "device": '+deviceId+', "command: '+command+'} }');
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
        //var commandLine = 'sudo send-dio 0 '+remoteDio+' '+deviceId+' '+commandCode;
    
        //console.log(commandLine);
        switch (commandCode) {
            case "1":
                rcswitchhe.switchOn(remoteDio, deviceId); 
                callback(null);
            case "0":
                rcswitchhe.switchOff(remoteDio, deviceId);
                callback(null);
            default:
                callback( new Error("Invalid command " + command));
        }        
        /*
         exec(commandLine, function (error, stdout, stderr) {
          if(error) console.error(error);
          //return null if no error 
          callback(error);
        });
        */
    } else {
        callback( new Error("Invalid command " + command));
    }

};