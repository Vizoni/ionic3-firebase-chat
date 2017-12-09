import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { AuthService } from './../../providers/auth/auth.service';
import { Chat } from '../../models/chat.model';
import { ChatService } from '../../providers/chat/chat.service';
import { Message } from '../../models/message.model';
import { MessageService } from './../../providers/message/message.service';
import { User } from '../../models/user.model';
import { UserService } from './../../providers/user/user.service';

import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content; // pega a instancia do ion-content da pagina (pra fazer o scroll)
  messages: FirebaseListObservable<Message[]>;
  pageTitle: string;
  sender: User;   // remetente
  recipient: User; //destinatário

  // os 2 atributos abaixo serão usados para atualizar o "last message" da view na home (usados no guard ionViewDidLoad)
  private chat1: FirebaseObjectObservable<Chat>;  //sender chat
  private chat2: FirebaseObjectObservable<Chat>;  //recipient chat


  constructor(
    public authService: AuthService,
    public chatService: ChatService,
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

        // pega os chats para o remetente e para o destinatário
        this.chat1 = this.chatService.getDeepChat(this.sender.$key, this.recipient.$key);
        this.chat2 = this.chatService.getDeepChat(this.recipient.$key,this.sender.$key);

        // atualizar a foto do usuário
        if (this.recipient.photo) {
          this.chat1
            .first()
            .subscribe((chat: Chat) => {
              this.chatService.updatePhoto(this.chat1, chat.photo, this.recipient.photo);
            })
        }
        

        let doSubscription = () => {
          this.messages.subscribe((messages: Message[]) => {
            this.scrollToBottom();
          })
        };

        let updateSenderReadMessage = () => {
          this.messages.subscribe((message: Message[]) => {
            message.filter((msg: Message) => {
              if ((msg.read == false || msg.read == undefined) && msg.userId != this.sender.$key) { // DEPOIS EXPLICO A GAMBIARRA
                this.messageService.setMessageRead(this.sender.$key, this.recipient.$key, msg.$key);
              }
            })
          });
        }

        let updateRecipientReadMessage = () => {
          this.messages.subscribe((message: Message[]) => {
            message.filter((msg: Message) => {
              if ((msg.read == false || msg.read == undefined) && msg.userId != this.sender.$key) { // DEPOIS EXPLICO A GAMBIARRA
                this.messageService.setMessageRead(this.recipient.$key, this.sender.$key, msg.$key);
              }
            })
          });
        }

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
              updateRecipientReadMessage();
            } else {
              // se o NÓ do chat é o ID do sender primeiro dps o do recipient
              updateSenderReadMessage();
            }
            doSubscription();
            
          })
    });
  }

  sendMessage(newMessage: string): void {
    if (newMessage) {
      let currentTimeStamp: Object = firebase.database.ServerValue.TIMESTAMP;
      this.messageService
      .create(  // parametros do metodo create
        new Message (this.sender.$key, newMessage, currentTimeStamp, false),
        this.messages
      ).then(() => {
        //atualiza lastMessage e timestamp dos 2 chats
        this.chat1
          .update({
            lastMessage: newMessage,
            timeStamp: currentTimeStamp
          });
        this.chat2
          .update({
            lastMessage: newMessage,
            timeStamp: currentTimeStamp
          });
      })
    
    }
  }

  // parametro opcional de duração da animação
  private scrollToBottom(duration?: number): void {
    setTimeout(() => {
      if (this.content) { // se já tiver carregado o this.content (não ser undefined)
        this.content.scrollToBottom(duration || 300);
      }
    }, 50)
    
  }

}
