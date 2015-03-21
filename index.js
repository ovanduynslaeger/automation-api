///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

var api_rcswitchhe = require('./apis/api_rcswitchhe')
var api_rcswitch = require('./apis/api_rcswitch')
var api_lirc = require('./apis/api_lirc')

module.exports = function (app) {
    app.get('/rcswitchhe/remote/:remote/device/:deviceId/command/:command', api_rcswitchhe.deviceCommand);
    
    app.get('/rcswitch/group/:group/device/:deviceId/command/:command', api_rcswitch.deviceCommand);
    
    app.get('/lirc/device/:deviceId/command/:command/iterate/:iterate', api_lirc.deviceCommand);
    app.get('/lirc/device/:deviceId/command/:command', api_lirc.deviceOneCommand);
};