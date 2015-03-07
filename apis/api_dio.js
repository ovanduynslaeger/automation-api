//var remoteDio = process.env.REMOTEDIO;
var exec = require('child_process').exec;


exports.deviceCommand = function(req, res){
    var remoteDio = req.params.remoteDio;
    var deviceId = req.params.deviceId;
    var command = req.params.command;

    runDeviceCommand(remoteDio, deviceId,command,function(error) {
        res.send(error);
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
        var commandLine = 'sudo send-dio 0 '+remoteDio+' '+deviceId+' '+commandCode;
    
        console.log(commandLine);
         exec(commandLine, function (error, stdout, stderr) {
          if(error) console.error(error);
          //return null if no error 
          callback(error);
        });
    } else {
        callback( new Error("Invalid command " + command));
    }

};