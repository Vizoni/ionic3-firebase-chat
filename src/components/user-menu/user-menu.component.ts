import { Component, Input } from '@angular/core';
import { AlertController, App, MenuController } from 'ionic-angular';

import { AuthService } from '../../providers/auth/auth.service';
import { baseComponent } from '../base.component';
import { User } from '../../models/user.model';

@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.component.html'
})
export class UserMenuComponent extends baseComponent {

  // dentro do .ts se referencia à ele como currentUser, mas lá no HTML chama de user
  @Input('user') currentUser: User;  

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public app: App,
    public menuCtrl: MenuController
  ) {
    super(alertCtrl, authService, app, menuCtrl);
  }

  onProfile(): void {
    
  }

}
