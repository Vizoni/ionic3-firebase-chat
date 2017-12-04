import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from './../../providers/auth/auth.service';
import { User } from '../../models/user.model';
import { UserService } from './../../providers/user/user.service';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messages: string[] = [];
  pageTitle: string;
  sender: User;   // remetente
  recipient: User; //destinatário

  constructor(
    public authService: AuthService,
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
      .first().subscribe((currentUser: User)=> {
        this.sender = currentUser;
    });
  }

  sendMessage(newMessage: string): void {
    this.messages.push(newMessage);
  }

}
