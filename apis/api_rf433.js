//var homeCodeRF433 = process.env.HOMECODERF433;
var exec = require('child_process').exec;
var rcswitch = require('rcswitch'); // Might throw an error if wiring pi init failed (no root)


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

    //var commandCode = translateCommand(command);
    //if (commandCode != null) {
/*        var commandLine = 'sudo send-rf433 0 '+homeCode+' '+deviceId+' '+commandCode;
    
    console.log(commandLine);
         exec(commandLine, function (error, stdout, stderr) {
              if(error) console.error(error);
              //return null if no error 
              callback(error);
          });
*/

    rcswitch.enableTransmit(0); // Use data Pin 0
    var noDevice = deviceId.charCodeAt(0) - 'A' + 1;
    console.log("Device id = "+noDevice);
    switch (command) {
        case "1":
            rcswitch.switchOn(homeCode, noDevice); 
            callback(null);
        case "0":
            rcswitch.switchOff(homeCode, noDevice);
            callback(null);
        default:
            callback( new Error("Invalid command " + command));
    }
    
};
