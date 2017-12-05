import { Component, Input } from '@angular/core';

import { Message } from './../../models/message.model';

@Component({
  selector: 'message-box',
  templateUrl: 'message-box.component.html'
})
export class MessageBoxComponent {

  // o decorator Input permite passar valores da view pra cá
  @Input() message: Message;    
  @Input() isFromSender: boolean;  

  constructor() {}

}
