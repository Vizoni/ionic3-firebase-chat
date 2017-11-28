import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FirebaseListObservable } from 'angularfire2/database';

import { SignupPage } from '../signup/signup';
import { User } from '../../models/user.model';
import { UserService } from './../../providers/user/user.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: FirebaseListObservable<User[]>;  // atributo users é uma array de Users do tipo Observable do FireBase

  constructor(
    public navCtrl: NavController,
    public userService: UserService,  // injeta o user service
  ) {

  }

  ionViewDidLoad() {
    this.users = this.userService.users;  // o atributo users dessa página é o mesmo q o atributo do user service   
    console.log("usuarios cadastrados LISTADOS!", this.users);
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  onChatCreate(user: User): void {
    console.log('user:',user);
  }

  

}
