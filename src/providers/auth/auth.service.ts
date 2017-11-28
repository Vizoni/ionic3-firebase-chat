import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth, FirebaseAuthState } from 'angularfire2/auth';
import { BaseService } from '../base/base.service';

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

}
