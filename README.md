# ha-api
Home Automation API

## Installation

  npm install automation-api --save

## Usage

  var automation-api = require('automation-api')(router)

  REST API for dio device
  
  /dio/remote/<remoteDioCode>/device/<deviceId>/command/on
  
  /dio/remote/<remoteDioCode>/device/<deviceId>/command/up
  
  /dio/device/<deviceId>/command/off
  
  /dio/device/<deviceId>/command/down
  
  REST API for rf433 device
  
  /rf433/home/<homeCode>/device/<deviceId>/command/on
  
  /rf433/home/<homeCode>/device/<deviceId>/command/off
  
## Release History

* 0.1.0 Initial release
* 0.1.1 Remove dependencies
* 0.1.2 Apis path modify
* 0.1.3 Errors management