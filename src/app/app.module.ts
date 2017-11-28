import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2'; //importa o firebase app config

import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';
import { SignupPage } from '../pages/signup/signup';
import { UserService } from '../providers/user/user.service';
import { AuthService } from '../providers/auth/auth.service';

/* Salva as configurações do firebase (pega no painel do projeto no site do firebase) em uma constante */
const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyAltwD95zzGwltXs8QS98rU1izkuzwpS0Q",
  authDomain: "ionic2-firebase-chat-c582c.firebaseapp.com",
  databaseURL: "https://ionic2-firebase-chat-c582c.firebaseio.com",
  storageBucket: "ionic2-firebase-chat-c582c.appspot.com",
  messagingSenderId: "717491479259"
};

@NgModule({
  declarations: [
    HomePage,
    MyApp,
    SignupPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HomePage,
    MyApp,
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
