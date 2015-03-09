#include "RCSwitchDio.h"


RCSwitchDio::RCSwitchDio() {
 this->pin=0;
}


/*
void RCSwitchDio::scheduler_realtime() {
  struct sched_param p;
  p.__sched_priority = sched_get_priority_max(SCHED_RR);
  if( sched_setscheduler( 0, SCHED_RR, &p ) == -1 ) {
    //perror("Failed to switch to realtime scheduler.");
    //ERROR
  }
}

void RCSwitchDio::scheduler_standard() {
 struct sched_param p;
 p.__sched_priority = 0;
 if( sched_setscheduler( 0, SCHED_OTHER, &p ) == -1 ) {
   //perror("Failed to switch to normal scheduler.");
   //ERROR
 }
}
*/


//Envois d'une pulsation (passage de l'etat haut a l'etat bas)
//1 = 310Âµs haut puis 1340Âµs bas
//0 = 310Âµs haut puis 310Âµs bas
void RCSwitchDio::sendBit(bool b) {
 if (b) {
   digitalWrite(pin, HIGH);
   delayMicroseconds(310);   //275 orinally, but tweaked.
   digitalWrite(pin, LOW);
   delayMicroseconds(1340);  //1225 orinally, but tweaked.
 }
 else {
   digitalWrite(pin, HIGH);
   delayMicroseconds(310);   //275 orinally, but tweaked.
   digitalWrite(pin, LOW);
   delayMicroseconds(310);   //275 orinally, but tweaked.
 }
}

//Calcul le nombre 2^chiffre indiquÃ©, fonction utilisÃ© par itob pour la conversion decimal/binaire
unsigned long RCSwitchDio::power2(int power){
 unsigned long integer=1;
 for (int i=0; i<power; i++){
   integer*=2;
 }
 return integer;
} 

//Convertis un nombre en binaire, nÃ©cessite le nombre, et le nombre de bits souhaitÃ© en sortie (ici 26)
// Stocke le rÃ©sultat dans le tableau global "bit2"
void RCSwitchDio::itob(unsigned long integer, int length)
{
	for (int i=0; i<length; i++){
	  if ((integer / power2(length-1-i))==1){
		integer-=power2(length-1-i);
		bit2[i]=1;
	  }
	  else bit2[i]=0;
	}
}

void RCSwitchDio::itobInterruptor(unsigned long integer, int length)
{
	for (int i=0; i<length; i++){
	  if ((integer / power2(length-1-i))==1){
		integer-=power2(length-1-i);
		bit2Interruptor[i]=1;
	  }
	  else bit2Interruptor[i]=0;
	}
}




//Envoie d'une paire de pulsation radio qui definissent 1 bit rÃ©el : 0 =01 et 1 =10
//c'est le codage de manchester qui necessite ce petit bouzin, ceci permet entre autres de dissocier les donnÃ©es des parasites
void RCSwitchDio::sendPair(bool b) {
 if(b)
 {
   sendBit(true);
   sendBit(false);
 }
 else
 {
   sendBit(false);
   sendBit(true);
 }
}


//Fonction d'envois du signal
//recoit en parametre un booleen dÃ©finissant l'arret ou la marche du matos (true = on, false = off)
void RCSwitchDio::transmit(int blnOn)
{
 int i;

 // Sequence de verrou anoncant le dÃ©part du signal au recepeteur
 digitalWrite(pin, HIGH);
 delayMicroseconds(275);     // un bit de bruit avant de commencer pour remettre les delais du recepteur a 0
 digitalWrite(pin, LOW);
 delayMicroseconds(9900);     // premier verrou de 9900Âµs
 digitalWrite(pin, HIGH);   // high again
 delayMicroseconds(275);      // attente de 275Âµs entre les deux verrous
 digitalWrite(pin, LOW);    // second verrou de 2675Âµs
 delayMicroseconds(2675);
 digitalWrite(pin, HIGH);  // On reviens en Ã©tat haut pour bien couper les verrous des donnÃ©es

 // Envoie du code emetteur (272946 = 1000010101000110010  en binaire)
 for(i=0; i<26;i++)
 {
   sendPair(bit2[i]);
 }

 // Envoie du bit dÃ©finissant si c'est une commande de groupe ou non (26em bit)
 sendPair(false);

 // Envoie du bit dÃ©finissant si c'est allumÃ© ou eteint 27em bit)
 sendPair(blnOn);

 // Envoie des 4 derniers bits, qui reprÃ©sentent le code interrupteur, ici 0 (encode sur 4 bit donc 0000)
 // nb: sur  les tÃ©lÃ©commandes officielle chacon, les interrupteurs sont logiquement nommÃ©s de 0 Ã  x
 // interrupteur 1 = 0 (donc 0000) , interrupteur 2 = 1 (1000) , interrupteur 3 = 2 (0100) etc...
  for(i=0; i<4;i++)
 {
 if(bit2Interruptor[i]==0){
	sendPair(false);
 }else{
	sendPair(true);
 }
}
 
 digitalWrite(pin, HIGH);   // coupure donnÃ©es, verrou
 delayMicroseconds(275);      // attendre 275Âµs
 digitalWrite(pin, LOW);    // verrou 2 de 2675Âµs pour signaler la fermeture du signal

}


/** PUBLIC **/


/**
 * Switch a remote switch on
 *
 * @param nDevice  Device Code
 */
void RCSwitchDio::switchOn(int nDevice) {
 //scheduler_realtime();
 itobInterruptor(nDevice,4);
 for(int i=0;i<5;i++){
		 transmit(true);            // envoyer ON
		 delay(10);                 // attendre 10 ms (sinon le socket nous ignore)
 }
	//scheduler_standard();
}
 

/**
 * Switch a remote switch off
 *
 * @param nDevice  Device Code
 */
void RCSwitchDio::switchOff(int nDevice) {
	//scheduler_realtime();
 itobInterruptor(nDevice,4);
 for(int i=0;i<5;i++){
		 transmit(false);            // envoyer OFF
		 delay(10);                 // attendre 10 ms (sinon le socket nous ignore)
 }
	//scheduler_standard();
}


/**
 * Enable transmissions
 *
 * @param nTransmitterPin    Arduino Pin to which the sender is connected to
 */
void RCSwitchDio::enableTransmit(int nTransmitterPin) {
    if(wiringPiSetup() == -1)
    {
        //ERROR
    }
    this->pin = nTransmitterPin;
    pinMode(nTransmitterPin, OUTPUT);
}

/**
 * Set Remote Code
 *
 * @param senderCode   Remote Code
 */
void RCSwitchDio::setRemoteCode(int senderCode) {
  this->sender = senderCode;
  itob(this->sender,26);            
}

