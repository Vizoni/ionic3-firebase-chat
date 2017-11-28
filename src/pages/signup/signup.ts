import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../providers/user/user.service';
import { AuthService } from '../../providers/auth/auth.service';
import { User } from '../../models/user.model';
import { FirebaseAuthState } from 'angularfire2';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup; // atributo signUpForm ($scope.signUpForm no angular 1) do tipo FormGroup;

  constructor( 
    public authService: AuthService,
    public formBuilder: FormBuilder,    // para trabalhar com formulário
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService
    ) {
      // variavel com a expressão regular de validação de e-mail
      let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;    

      this.signupForm = this.formBuilder.group({  // definindo os atributos do signupForm (campos)
        // o primeiro item do array é o valor inicial, o segundo é o array de validators
        name: ['', [Validators.required, Validators.minLength(3)] ], // o campo name é obrigatório (required) e precisa ter no minimo 3 caracteres
        username: ['', [Validators.required, Validators.minLength(3)] ],
        email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])], // validator tem q ser obrigatório E seguir a expressão regular do emailRegex
        password: ['', [Validators.required, Validators.minLength(6)] ],
      });
    }

  onSubmit(): void {

    // para pegar os atributos do formulario: this.signupForm.value (retorna o objeto inteiro)
    // let user: User = this.signupForm.value; não é mais do tipo User pq tirou a senha do model

    let formUser = this.signupForm.value;

    this.authService.createAuthUser( {
      // cria o objeto de usuario para criar um usuário de autenticação no service Auth
      email: formUser.email,
      password: formUser.password,
    }).then((authState: FirebaseAuthState) => {
        //depois de cadastrar o usuário de autenticação:
        // pra não ter que passar o atributo PASSWORD do objeto formUser, tem q deletar este atributo
        delete formUser.password;

        // tem q adicionar o uid (id Único) criado na criação de usuário de autenticação (funçao createAuthUser)
        formUser.uid = authState.auth.uid;

        this.userService.create(formUser)
        .then( () => {  // o método retorna uma promise vazia
          console.log("Usuario Cadastrado");        
        });

    })

  }

}
