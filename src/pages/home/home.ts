import { Component } from '@angular/core';
import { MenuController, NavController, Loading, LoadingController } from 'ionic-angular';

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
  chats: FirebaseListObservable<Chat[]>;
  view: string = 'chats';

  constructor(
    public authService: AuthService,
    public chatService: ChatService,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public userService: UserService,  // injeta o user service
  ) {

  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {

    this.showLoading();

    this.chats = this.chatService.chats;
    this.users = this.userService.users;
    // o atributo users dessa página é o mesmo q o atributo do user service
    this.menuCtrl.enable(true, 'user-menu'); // habilitar o menu qndo entrar na página home
    
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
              let timestamp: Object = firebase.database.ServerValue.TIMESTAMP; // pega o timestamp do servido
              
              let chat1 = new Chat('',timestamp,recipientUser.name, (recipientUser.photo || '')); // parametro ultima mensagem e foto vazia
              this.chatService.create(chat1,currentUser.$key,recipientUser.$key);
              
              let chat2 = new Chat('',timestamp,currentUser.name,(currentUser.photo || ''));
              this.chatService.create(chat2,recipientUser.$key,currentUser.$key);
            }

          });
          
      })
      this.navCtrl.push(ChatPage, {
        recipientUser: recipientUser  // envia o parametro que é o destinatário da mensagem pra pagina ChatPage
      });
  }

  onChatOpen(chat: Chat): void {
    let recipientUserId: string = chat.$key; // recebe o ID do usuario destinatário
    this.userService.getUser(recipientUserId)
      .first()
      .subscribe((user: User) => {
        this.navCtrl.push(ChatPage, {
          recipientUser: user  // envia o parametro que é o destinatário da mensagem pra pagina ChatPage
        });
      });
  }
  
  filterItems(event: any): void {
    let searchTerm: string = event.target.value;
    this.chats = this.chatService.chats;
    this.users = this.userService.users;

    if (searchTerm) {
      switch(this.view) {

        case 'chats':
          this.chats = <FirebaseListObservable<Chat[]>>this.chats
            .map((chats: Chat[]) => {
              return chats.filter((chat: Chat) => {
                //  joga em minusculo pra não ter erro na comparação
                //  se retornar -1 é q não existe o termo pesquisado
                return (chat.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
              })
          })
          break;

        case 'users':
          this.users = <FirebaseListObservable<User[]>>this.users
            .map((users: User[]) => {
              return users.filter((user: User) => {
                //  joga em minusculo pra não ter erro na comparação
                //  se retornar -1 é q não existe o termo pesquisado
                return (user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
              })
          })
          break;
      }
    }
  }  

  
  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 200
    });

    loading.present();

    return loading;
  }

}
