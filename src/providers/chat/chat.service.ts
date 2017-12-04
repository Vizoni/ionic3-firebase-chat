import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';
import { BaseService } from '../base/base.service';
import { Chat } from '../../models/chat.model';

@Injectable()
export class ChatService extends BaseService {

  constructor(
    public af: AngularFire,
    public http: Http
  ) {
    super();
  }

  create(chat: Chat, userId1: string, userId2: string): firebase.Promise<void> {
    return this.af.database.object(`/chats/${userId1}/${userId2}`)
      .set(chat);
      .catch(this.handlePromiseError);
    // os nós de chats são compostos pelo id dos 2 usuarios
  }

}
