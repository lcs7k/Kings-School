import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import {UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.page.html',
  styleUrls: ['./user-add.page.scss'],
})
export class UserAddPage implements OnInit {

  user : User = new User();

  constructor(
    private storage: Storage,
    public alertController: AlertController,
    public userService: UserServiceService
    ) { }

  ngOnInit() {

  }

  buscaCEP(){
    this.userService.pegaCep(this.user.cep)
  }

  salvar() {
    try {
    console.log('Dados Salvos...',this.user)
    this.storage.set('name', this.user.nome);
    this.storage.set('email', this.user.email);
    this.storage.set('senha', this.user.senha);
    this.presentAlert()
}catch (error){
 console.error("erro ao salvar.",error);
}

}

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      //subHeader: 'Subtitle',
      message: 'Usuario Cadastrado Com Sucesso!!!.',
      buttons: ['OK']
    });

}
}