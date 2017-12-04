import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from './../../providers/auth/auth.service';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messages: string[] = [];

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  sendMessage(newMessage: string): void {
    this.messages.push(newMessage);
  }

}
