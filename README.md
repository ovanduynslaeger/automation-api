# ha-api
Home Automation API

## Installation

  npm install ha-api --save

## Usage

  var ha-api = require('ha-api')(router)

  REST API for dio device
  
  /dio/device/<deviceId>/command/on
  /dio/device/<deviceId>/command/off
  
  REST API for rf433 device
  
  /rf433/home/<homeCode>/device/<deviceId>/command/on
  /rf433/home/<homeCode>/device/<deviceId>/command/off
  
## Release History

* 0.1.0 Initial release