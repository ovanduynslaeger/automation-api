///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

var api_rcswitchhe = require('./apis/api_rcswitchhe')
var api_rcswitch = require('./apis/api_rcswitch')

module.exports = function (app) {
    app.get('/rcswitchhe/remote/:remote/device/:deviceId/command/:command', api_rcswitchhe.deviceCommand);
    app.get('/rcswitch/group/:group/device/:deviceId/command/:command', api_rcswitch.deviceCommand);
};