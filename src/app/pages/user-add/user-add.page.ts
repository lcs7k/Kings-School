import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { UserServiceService } from '../../services/user-service.service';
import { runInThisContext } from 'vm';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.page.html',
  styleUrls: ['./user-add.page.scss'],
  
})

export class UserAddPage implements OnInit {

  user: User = new User();

  constructor(
    public toastController: ToastController,
    private storage: Storage,
    public alertController: AlertController,
    private userService: UserServiceService
  ) { }
  
  async presentToast(texto:string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 4000
    });
    toast.present();
  }


  ngOnInit() {
  }

  buscaCEP() {
    this.userService.pegaCep(this.user.cep).subscribe(
      (res: User) => {
        console.log(res);
        if(res.erro){
          this.presentToast("CEP não localizado!")
        }else

        //this.user = res; 
        //this.user.cep = res.cep;
        this.user.logradouro = res.logradouro;
        this.user.cidade = res.cidade;
        this.user.bairro = res.bairro;
        this.user.uf = res.uf; 
      },
         error => {
        console.error(error)
      }
    )
  }

  salvar() {
    try {
      this.storage.set('nome', this.user.nome);
      this.storage.set('email', this.user.email);
      this.storage.set('senha', this.user.senha);
      console.log('Dados Salvos...', this.user);
      this.presentAlert();
    } catch (error) {
      console.error("Erro ao salvar.", error);
    }

  }


  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      //subHeader: 'Subtitle',
      message: 'Usuário cadastrado.',
      buttons: ['OK']
    });

    await alert.present();
  }


}