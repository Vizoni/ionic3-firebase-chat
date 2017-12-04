import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FirebaseListObservable } from 'angularfire2/database';

import { AuthService } from '../../providers/auth/auth.service';
import { Chat } from '../../models/chat.model';
import { ChatPage } from './../chat/chat';
import { ChatService } from '../../providers/chat/chat.service';
import { SignupPage } from '../signup/signup';
import { User } from '../../models/user.model';
import { UserService } from './../../providers/user/user.service';

import firebase from 'firebase';

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
    public chatService: ChatService
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

  onChatCreate(recipientUser: User): void {
    this.userService.currentUser  //tem q ter o subscribe por ser uma promise e a gente ficar 'ouvindo' as alteraçoes
      .first()
      .subscribe((currentUser: User) => { // o usuario atual é o current User
        this.chatService.getDeepChat(currentUser.$key,recipientUser.$key) //passa o UID dos usuarios  
          .first()  
          .subscribe((chat: Chat) => {  // recebe um chat SE JÁ HOUVER um criado
            
            if(chat.hasOwnProperty('$value')) { // chat tem uma propriedade própria chamada '$value' ? 
              // se tiver, é que não existe
              let timestamp: Object = firebase.database.ServerValue.TIMESTAMP; // pega o timestamp do servidor
              let chat1 = new Chat('',timestamp,recipientUser.name,''); // parametro ultima mensagem e foto vazia
              this.chatService.create(chat1,currentUser.$key,recipientUser.$key);
              
              let chat2 = new Chat('',timestamp,currentUser.name,'');
              this.chatService.create(chat2,recipientUser.$key,currentUser.$key);
            }

          })
      })


    this.navCtrl.push(ChatPage, {
      recipientUser: recipientUser  // envia o parametro que é o destinatário da mensagem pra pagina ChatPage
    });
  }

  

}
