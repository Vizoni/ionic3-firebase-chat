import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseApp } from 'angularfire2';
import { FirebaseAuthState } from 'angularfire2/auth';
import { User } from '../../models/user.model'; // importa a classe de User que compõe o formulário
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs';
// import { FirebaseApp } from 'angularfire2/tokens';
// import { FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class UserService extends BaseService{

  users: FirebaseListObservable<User[]>;  // atributo array de usuarios do tipo (model) User
  currentUser: FirebaseObjectObservable<User>;

  constructor(
    public af: AngularFire, // injeta o angular fire pra poder mexer com o real time
    // @Inject(FirebaseApp) public firebaseApp: FirebaseApp,  // o firebaseApp é do tipo any mas o tipo da instancia é pra buscar na dependencia do FirebaseApp
    @Inject(FirebaseApp) public firebaseApp: any,  // o firebaseApp é do tipo any mas o tipo da instancia é pra buscar na dependencia do FirebaseApp
    public http: Http,
  ) {
    super(); // chama o construtor da classe mãe (baseService)
    // this.users = this.af.database.list(`/users`);
    this.listenAuthState();
  }

  private listenAuthState(): void { // método privado
    this.af.auth.subscribe((authState: FirebaseAuthState) => {
      if(authState) { // se existir um usuário logado
        this.currentUser = this.af.database.object(`/users/${authState.auth.uid}`);
        this.setUsers(authState.auth.uid)
        // atribui o usuario logado ao current user
      }
    });
  }

  private setUsers(uidToExclude: string): void {
    this.users = <FirebaseListObservable<User[]>> this.af.database.list(`/users`, {
      query: {
        orderByChild: 'name'    //orderna pelo nome
      }
    }).map((users: User[]) => { //filtra
      return users.filter((user: User) => user.$key !== uidToExclude);
      // só vai pegar os usuários que NÃO tem o mesmo id do usuario atual (uid to exclude0)
    })
  }

  create(user: User, userUniqueId: string): firebase.Promise<void> { 
    // A função create tem o parametro user do tipo User (pasta models) e retorna uma firebase.promise VAZIA (void)
    // return this.users.push(user); // o atributo users é uma listagem do nó '/users'. O método push é pra adicionar

    // Se não existir o caminho (do parametro abaixo), ele vai setar (.set()) o usuário nesse caminho (pra não duplicar)
    return this.af.database.object(`/users/${userUniqueId}`)
      .set(user)
      .catch(this.handlePromiseError);

  }

  edit(user: {name: string, username: string, photo: string}): firebase.Promise<void> {
    return this.currentUser
      .update(user)
      .catch(this.handlePromiseError)
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

  getUser(userId: string): FirebaseObjectObservable<User> {
    return <FirebaseObjectObservable<User>>this.af.database.object(`/users/${userId}`)
      .catch(this.handleObservableError);
  }

  uploadPhoto(photoFile: File, userId: string): firebase.storage.UploadTask {
    // dava pra pegar o userId pelo this.currentUser.$key
    return this.firebaseApp
      .storage()
      .ref()    // se deixasse aqui ia armazenar no root
      .child(`/users/${userId}`)  // armazena no nó users com a chave userId
      .put(photoFile); // o parametro é o arquivo q vai ser armazenado
  }


}
