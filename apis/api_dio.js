var remoteDio = process.env.REMOTEDIO;
var exec = require('child_process').exec;


exports.deviceCommand = function(req, res){
    var deviceId = req.params.deviceId;
    var command = req.params.command;

    runDeviceCommand(deviceId,command,function() {
        res.send("OK");
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
            return "-1";
    }
}

function runDeviceCommand(deviceId,command,callback) {

    var commandCode = translateCommand(command);
    var commandLine = 'sudo send-dio 0 '+remoteDio+' '+deviceId+' '+commandCode;

    console.log(commandLine);
    /* exec(commandLine, function (error, stdout, stderr) {
      if(error) console.error(error);
          if (callback) callback();
      });
      */
    callback();
    
};