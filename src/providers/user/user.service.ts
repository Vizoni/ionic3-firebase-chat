import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';
import { User } from '../../models/user.model'; // importa a classe de User que compõe o formulário

@Injectable()
export class UserService {

  constructor(
    public af: AngularFire, // injeta o angular fire pra poder mexer com o real time
    public http: Http,
  ) {}

  create(user: User): firebase.Promise<void> { 
    // A função create tem o parametro user do tipo User (pasta models) e retorna uma firebase.promise VAZIA (void)
    return this.af.database.list(`/users`)  // lista os usuarios (tabela users)
      .push(user);  // adiciona o parametro passado (objeto do formulario) na lista /users
  }



}
