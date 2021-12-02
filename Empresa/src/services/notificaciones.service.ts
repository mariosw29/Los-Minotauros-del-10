import { /* inject, */ BindingScope, injectable} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
  */
  MensajesEmpleados() { //nombre: string,apellido:string
    console.log('Mensaje de prueba twilio para el solitario Minotauro')

    const accountSid = 'AC22edb49a4358ae83c2830999c3debb7e'; // Your Account SID from www.twilio.com/console
    const authToken = '1d02b44cda79ea096448c0bbab7edd79'; // Your Auth Token from www.twilio.com/console

    const twilio = require('twilio');
    const client = new twilio(accountSid, authToken);

    client.messages
      .create({
        body: 'Mensaje de prueba twilio para Minotauros del 10', //nombre + apellido,
        to: '+573122907454', // Text this number
        from: '+14706194559', // From a valid Twilio number
      })
      .then((message: any) => console.log(message.sid));

  }
}
