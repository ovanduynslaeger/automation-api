#ifndef _RCSwitchDio_h
#define _RCSwitchDio_h

#if defined(ARDUINO) && ARDUINO >= 100
    #include "Arduino.h"
#else
    #include <wiringPi.h>
    #include <stdint.h>

    #define CHANGE 1
#ifdef __cplusplus
extern "C"{
#endif
typedef uint8_t boolean;
typedef uint8_t byte;

#ifdef __cplusplus
}
#endif
#endif


class RCSwitchDio {

  public:
    RCSwitchDio();
    
    void switchOn(int nDevice);
    void switchOff(int nDevice);
    void enableTransmit(int nTransmitterPin);
    void setRemoteCode(int senderCode);
    
  private:
    void scheduler_realtime();
    void scheduler_standard();
    void sendBit(bool b);
    unsigned long power2(int power);
    void itob(unsigned long integer, int length);
    void itobInterruptor(unsigned long integer, int length);
    void sendPair(bool b);
    void transmit(int blnOn);
    
    int pin;
    //bool bit2[26]={};              // 26 bit Identifiant emetteur
    //bool bit2Interruptor[4]={}; 
    bool bit2[26];
    bool bit2Interruptor[4];
    int interruptor;
    int sender;
    
    
};

#endif
