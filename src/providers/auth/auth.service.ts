import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth, FirebaseAuthState } from 'angularfire2/auth';
import { BaseService } from '../base/base.service';
// import { Promise } from 'firebase';
import * as firebase from 'firebase';

@Injectable()
export class AuthService extends BaseService{

  constructor(
    public auth: AngularFireAuth,
    public http: Http
  ) {
    super();  // chama o construtor da classe mãe (baseService)
  }

  createAuthUser(user: {email: string, password: string}): firebase.Promise<FirebaseAuthState> {
    // função com parametro objeto user, retorna uma firebase promise do tipo firebaseauthstate
    // cria um usuario de autenticação com o serviço Angular Fire Auth
    return this.auth.createUser(user)
      .catch(this.handlePromiseError);  //o erro do catch passa pra função handlePromiseError do BaseService
  }

  signInWithEmail(user: {email: string, password: string}): firebase.Promise<boolean> {
    return this.auth.login(user)
      .then((authState: FirebaseAuthState) => {
        return authState != null; // retorna true se o authState for diferente de nulo (ou seja, logou)
      })
      .catch(this.handlePromiseError);
  }

  logOut(): Promise<void>{
    return this.auth.logout();
  }

  get authenticated(): Promise<boolean> { //evento que ocorre ANTES de acessar esse método (qndo chama this.authService.isAuthenticated)
    return new Promise((resolve, reject) => {
      this.auth
      .first()  // pega apenas a primeira alteração
      .subscribe((authState: FirebaseAuthState) => {
        // (authState) ? resolve(true) : reject(false);  // se o authState for verdadeiro, retorna true
        (authState) ? resolve(true) : reject(Error);  // se o authState for verdadeiro, retorna true
      })
    })
  }

}
