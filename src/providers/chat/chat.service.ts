import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseAuthState, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { BaseService } from '../base/base.service';
import { Chat } from '../../models/chat.model';

@Injectable()
export class ChatService extends BaseService {

  chats: FirebaseListObservable<Chat[]>

  constructor(
    public af: AngularFire,
    public http: Http
  ) {
    super();
    this.setChats();
  }
  
  private setChats(): void {
    this.af.auth
      .subscribe((authState: FirebaseAuthState) => {
        // se usuario estiver logado
        if(authState) {
          // auth é o NÓ do usuario (se houver)
          this.chat = <FirebaseListObservable<Chat[]>>this.af.database.list(`/chats/${authState.auth.uid}`, {
            query: {
              orderByChild: 'timeStamp' //retorna em ordem CRESCENTE (tem q ser decrescente, ou seja, a mensagem mais recente)
            }
          }).map((chats: Chat[]) => {
            return chats.reverse(); // inverte a ordem da array
          }).catch(this.handleObservableError);

        }
      })
  }

  create(chat: Chat, userId1: string, userId2: string): firebase.Promise<void> {
    return this.af.database.object(`/chats/${userId1}/${userId2}`)
      .set(chat)
      .catch(this.handlePromiseError);
    // os nós de chats são compostos pelo id dos 2 usuarios
  }

  getDeepChat(userId1: string, userId2: string): FirebaseObjectObservable<Chat>{
    return <FirebaseObjectObservable<Chat>> this.af.database.object(`/users/${userId1}/${userId2}`)
      .catch(this.handleObservableError);
  }

}
