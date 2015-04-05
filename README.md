# automation-api
Home Automation API

## Requirements

  * [WiringPi must be installed](https://projects.drogon.net/raspberry-pi/wiringpi/download-and-install/) in order to compile.
  * [LIRC must be installed](http://www.lirc.org/)
  * RCSwitch module must be installed https://www.npmjs.com/package/rcswitch (dependencies)
  * RCSwitchHE module must be installed https://github.com/ovanduynslaeger/rc-switch-he (dependencies)
  * lirc-node module must be installed https://www.npmjs.com/package/lirc_node(dependencies)

  
## Installation

  npm install automation-api --save

## Usage

  require('automation-api')(router)

  REST API for Home Easy device (DIO, Chacon)
  
  /rcswitchhe/remote/<remoteDioCode>/device/<deviceId>/command/on
  
  /rcswitchhe/remote/<remoteDioCode>/device/<deviceId>/command/up
  
  /rcswitchhe/remote/<remoteDioCode>/device/<deviceId>/command/off
  
  /rcswitchhe/remote/<remoteDioCode>/device/<deviceId>/command/down

  
  REST API for RCSwitch device
  
  /rcswitch/group/<group>/device/<deviceId>/command/on
  
  /rcswitch/group/<group>/device/<deviceId>/command/off


  LIRC API for Infrared Remote
  
  /lirc/device/<deviceId>/command/<command>
  
  /lirc/device/<deviceId>/command/<command>/iterate/<number>
  
  
## Release History

* 0.1.0 Initial release
* 0.1.1 Remove dependencies
* 0.1.2 Apis path modify
* 0.1.3 Errors management
* 0.1.4 Include rcsiwtch module and create .cpp for dio
* 0.1.5 Compilation correction
* 0.1.6 Add dependencies
* 0.1.7 Externalize HE module
* 0.1.8 Change dependencies
* 0.1.9 Change dependencies
* 0.1.10 Raspberry validation
* 0.1.11 Add lirc api
* 0.1.12 lirc command correction
* 0.1.13 lirc command vol iterate correction