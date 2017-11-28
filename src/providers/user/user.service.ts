import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { User } from '../../models/user.model'; // importa a classe de User que compõe o formulário
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserService extends BaseService{

  users: FirebaseListObservable<User[]>;  // atributo array de usuarios do tipo (model) User

  constructor(
    public af: AngularFire, // injeta o angular fire pra poder mexer com o real time
    public http: Http,
  ) {
    super(); // chama o construtor da classe mãe (baseService)
    this.users = this.af.database.list(`/users`);
  }

  create(user: User): firebase.Promise<void> { 
    // A função create tem o parametro user do tipo User (pasta models) e retorna uma firebase.promise VAZIA (void)
    // return this.users.push(user); // o atributo users é uma listagem do nó '/users'. O método push é pra adicionar

    // Se não existir o caminho (do parametro abaixo), ele vai setar (.set()) o usuário nesse caminho (pra não duplicar)
    return this.af.database.object(`/users/${user.uid}`)
      .set(user)
      .catch(this.handlePromiseError);

  }

  userExists(username: string): Observable<boolean> {
    return this.af.database.list(`/users`, {
      query: {
        orderByChild: 'username', // ordena pelo atributo 'username' de cada nó
        equalTo: username // que seja igual ao username passado
      }
    }).map((users: User[]) => { // o retorno é um array do tipo User
      return users.length > 0;  // se o array de users for maior q 0, retorna TRUE, se não, FALSE
    }).catch(this.handleObservableError); // tratamento de erro com o método handleObservableError do BaseService
    
    // return null;
  }



}
