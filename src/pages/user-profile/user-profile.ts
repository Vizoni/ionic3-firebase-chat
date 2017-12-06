import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../providers/auth/auth.service';
import { User } from '../../models/user.model';
import { UserService } from './../../providers/user/user.service';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  currentUser: User;
  canEdit: boolean = false;
  private filePhoto: File;  // armazena a foto MAIS ATUAL do user (que tá no formulario)

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService
  ) {}

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.userService.currentUser
      .subscribe((user: User) => {
        this.currentUser = user;
      })
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // não dá refresh na página
    this.editUser();  // chama a função privada
  }

  onPhoto(event): void { 
    this.filePhoto = event.target.files[0]; // como tá fazendo o upload de apenas 1 foto, usamos o índice 0
  }

  private editUser(photoUrl?: string): void {
    console.log("to enviando: ",this.currentUser)
    this.userService.edit({
      name: this.currentUser.name,
      username: this.currentUser.username,
      photo: photoUrl  || this.currentUser.photo || ''
      // se recebeu uma foto nova, põe a foto nova, se não, usa a antiga, se ainda não tiver, fica vazio
    }).then(() => {
      this.canEdit = false; // fecha o formulário
    });
  }

}
