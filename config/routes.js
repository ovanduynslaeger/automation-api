///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

var api_dio = require('../apis/api_dio')
var api_rf433 = require('../apis/api_rf433')

module.exports = function (app) {
    app.get('/dio/device/:deviceId/command/:command', api_dio.deviceCommand);
    app.get('/rf433/home/:homeCode/device/:deviceId/command/:command', api_rf433.deviceCommand);
};