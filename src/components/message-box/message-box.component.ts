import { Component, Input } from '@angular/core';

import { Message } from './../../models/message.model';

/* no host fica tipo assim
  <message-box [style.justify-content]="flex-start"> </message-box>
*/

@Component({
  selector: 'message-box',
  templateUrl: 'message-box.component.html',
  host: {   
    // pode pegar propriedades no elemento e fazer input property (colocando um estilo (classe) condicionalmente)
    '[style.justify-content]': '((!isFromSender) ? "flex-start" : "flex-end")',
    // Se NÃO for do remetente, fica na esquerda, se for, fica na direita 
    // '[style.text-align]': '((!isFromSender) ? "left" : "right")'
  }
})
export class MessageBoxComponent {

  // o decorator Input permite passar valores da view pra cá
  @Input() message: Message;    
  @Input() isFromSender: boolean;
  @Input() alreadyRead: boolean;

  constructor() {}

}
