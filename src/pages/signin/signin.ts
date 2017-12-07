import { Component } from '@angular/core';
import { AlertController, IonicPage, Loading, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../providers/auth/auth.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

import { HomePage } from './../home/home';
import { SignupPage } from './../signup/signup';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;    

    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });
  }

  onSignUp(): void {
    this.navCtrl.push(SignupPage);
  }

  onSubmit(): void {
    let loading: Loading = this.showLoading();  // retorna o loading
    let user = this.signinForm.value;

    this.authService.signInWithEmail(user)
      .then((isLogged: boolean) => {
        if (isLogged) {
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        }
      })
      .catch((er: any) => {
        loading.dismiss();
        this.showAlert(er)
      })

  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: "Please wait..."
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
