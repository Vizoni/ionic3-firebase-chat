import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth, FirebaseAuthState } from 'angularfire2/auth';

@Injectable()
export class AuthService{

  constructor(
    public auth: AngularFireAuth,
    public http: Http
  ) {
    console.log('Hello AuthProvider Provider');
  }

  createAuthUser(user: {email: string, password: string}): firebase.Promise<FirebaseAuthState> {
    // função com parametro objeto user, retorna uma firebase promise do tipo firebaseauthstate
    // cria um usuario de autenticação com o serviço Angular Fire Auth
    return this.auth.createUser(user);
  }

}
