// import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AlertController, App, MenuController, NavController } from 'ionic-angular';
import { AuthService } from '../providers/auth/auth.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SigninPage } from './../pages/signin/signin';
// import { App } from 'ionic-angular/components/app/app';
// import { MenuController } from 'ionic-angular/components/app/menu-controller';

export abstract class baseComponent implements OnInit{

    protected navCtrl: NavController;

    /*  Pode utilizar este component dentro de um menu ou header da página
        Pois pega a navegação atual (ngOnInit) */

    constructor(
        public alertCtrl: AlertController,
        public authService: AuthService,
        public app: App,
        public menuCtrl: MenuController
    ) {}

    ngOnInit(): void {
        // this.navCtrl = this.app.getActiveNav(); // recebe o navController usado
        this.navCtrl = this.app.getActiveNavs()[0];
    }

    onLogOut(): void {
        this.alertCtrl.create({
            message: "Do you wanna quit?",
            buttons: [
                {
                    text: "Yes",
                    handler: () => {                // se clicar no YES (deseja sair)
                        this.authService.logOut()
                            .then( () => {
                                this.navCtrl.setRoot(SigninPage);
                            })
                    }
                },
                {text: "No"}
            ]
        }).present(); // apresenta o alert
    }

}