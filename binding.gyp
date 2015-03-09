{
  'targets': [
    {
      'target_name': 'rcswitchdio',
      'sources': [ 'apis/dio/src/RCSwitchDioNode.cpp', 'apis/dio/externals/rcswitch-dio/RCSwitchDio.cpp' ],
      'include_dirs': [ '/usr/local/include' ],
      'ldflags': [ '-lwiringPi' ]
    }
  ]
}
