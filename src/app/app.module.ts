import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule, AuthMethods, AuthProviders, FirebaseAppConfig } from 'angularfire2'; //importa o firebase app config

import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';
import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from '../pages/signin/signin';

import { AuthService } from '../providers/auth/auth.service';
import { UserService } from '../providers/user/user.service';
// import { AuthMethods } from 'angularfire2/auth';

/* Salva as configurações do firebase (pega no painel do projeto no site do firebase) em uma constante */
const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyAltwD95zzGwltXs8QS98rU1izkuzwpS0Q",
  authDomain: "ionic2-firebase-chat-c582c.firebaseapp.com",
  databaseURL: "https://ionic2-firebase-chat-c582c.firebaseio.com",
  storageBucket: "ionic2-firebase-chat-c582c.appspot.com",
  messagingSenderId: "717491479259"
};


const firebaseAuthConfig = {
  provider: AuthProviders.Custom,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    HomePage,
    MyApp,
    SigninPage,
    SignupPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig),
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HomePage,
    MyApp,
    SigninPage,
    SignupPage
  ],
  providers: [
    AuthService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
  ]
})
export class AppModule {}
