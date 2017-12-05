import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseListObservable } from 'angularfire2';

import { AuthService } from './../../providers/auth/auth.service';
import { Message } from '../../models/message.model';
import { MessageService } from './../../providers/message/message.service';
import { User } from '../../models/user.model';
import { UserService } from './../../providers/user/user.service';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messages: FirebaseListObservable<Message[]>;
  pageTitle: string;
  sender: User;   // remetente
  recipient: User; //destinatário

  constructor(
    public authService: AuthService,
    public messageService: MessageService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService
  ) {}

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad(): void {
    this.recipient = this.navParams.get('recipientUser'); //recebe de parametro na home.ts
    this.pageTitle = this.recipient.name;
    this.userService.currentUser
      .first()
      .subscribe((currentUser: User)=> {
        this.sender = currentUser;

        //  busca de mensagens do chat: (tem q ver se a ordem do usuario está certa
        //  as vezes o remetente (id 1) na vdd é o destinatário (id 2) e vice-versa
        this.messages = this.messageService.getMessages(this.sender.$key, this.recipient.$key);
        //verifica se há alguma mensagem nesse tipo de chat
        this.messages
          .first()
          .subscribe((messageList: Message[]) => {

            if (messageList.length === 0) { // se não existir nenhuma mensagem assim
              //faz a busca com os ID's trocados de ordem
              this.messages = this.messageService.getMessages(this.recipient.$key, this.sender.$key);
            }
            
          })
    });
  }

  sendMessage(newMessage: string): void {
    this.messages.push(newMessage);
  }

}
