import { Component, Input } from '@angular/core';
import { baseComponent } from '../base.component';
import { AlertController, App, MenuController  } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.component.html'
})
export class CustomLoggedHeaderComponent extends baseComponent{

  @Input() title: string;
  @Input() user: User;
  // @input é uma propriedade visivel para os outros components

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public app: App,
    public menuCtrl: MenuController
  ) {
    super(alertCtrl,authService,app,menuCtrl);
  }



}
