import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FirebaseListObservable } from 'angularfire2/database';

import { AuthService } from '../../providers/auth/auth.service';
import { ChatPage } from './../chat/chat';
import { SignupPage } from '../signup/signup';
import { User } from '../../models/user.model';
import { UserService } from './../../providers/user/user.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: FirebaseListObservable<User[]>;  // atributo users é uma array de Users do tipo Observable do FireBase
  view: string = 'chats';

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public userService: UserService,  // injeta o user service
  ) {

  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.users = this.userService.users; 
    // o atributo users dessa página é o mesmo q o atributo do user service   
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  onChatCreate(user: User): void {
    console.log('user:',user);
    this.navCtrl.push(ChatPage, {
      recipientUser: user      
    });
  }

  

}
