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
            res.send('{ "data" : { "device": '+deviceId+', "command": '+command+'} }');
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
            res.send('{ "data" : { "device": '+deviceId+', "command": '+command+', "iterate": '+it+'} }');
        }
    });

};

function runDeviceCommand(deviceId,command,it,callback) {

    lirc_node.init();
    //console.log(lirc_node.remotes);

    if (command!=null) {
        var pi = Math.abs(parseInt(it));
        for (var i=0; i < pi; i++) {
                lirc_node.irsend.send_once(deviceId, command, function() {
                   console.log("Sent LIRC command " + command + " on device " + deviceId);
                })
        };
        callback(null);
    }
    else {
        callback( new Error("Invalid command " + command));
    }

};
