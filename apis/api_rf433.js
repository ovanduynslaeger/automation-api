//var homeCodeRF433 = process.env.HOMECODERF433;
var exec = require('child_process').exec;

exports.deviceCommand = function(req, res){
    var homeCode = req.params.homeCode;
    var deviceId = req.params.deviceId;
    var command = req.params.command;

    runDeviceCommand(homeCode,deviceId,command,function() {
        res.send("OK");
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
    if (commandCode != null) {
        var commandLine = 'sudo send-rf433 0 '+homeCode+' '+deviceId+' '+commandCode;
    
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
