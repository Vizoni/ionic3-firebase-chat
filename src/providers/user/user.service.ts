import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { User } from '../../models/user.model'; // importa a classe de User que compõe o formulário

@Injectable()
export class UserService {

  users: FirebaseListObservable<User[]>;  // atributo array de usuarios do tipo (model) User

  constructor(
    public af: AngularFire, // injeta o angular fire pra poder mexer com o real time
    public http: Http,
  ) {
    this.users = this.af.database.list(`/users`);
  }

  create(user: User): firebase.Promise<void> { 
    // A função create tem o parametro user do tipo User (pasta models) e retorna uma firebase.promise VAZIA (void)
    // return this.users.push(user); // o atributo users é uma listagem do nó '/users'. O método push é pra adicionar

    // Se não existir o caminho (do parametro abaixo), ele vai setar (.set()) o usuário nesse caminho (pra não duplicar)
    return this.af.database.object(`/users/${user.uid}`)
      .set(user);

  }



}
