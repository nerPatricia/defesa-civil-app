import { LoadingService } from './../../service/loading.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html',
  styleUrls: ['app-header.scss']
})
export class AppHeaderComponent {
  @Input()
  showButtonBack: string = '';
  @Input()
  showButtonHelp: boolean = false;
  @Input()
  showButtonLogout: boolean = false;
  @Input()
  title: string;
  @Input()
  iconTitle: string = '';

  // TODO: Juntar os botões do mesmo lado em um só e usar função verificadora
  // diminuindo a qtd de flags

  @Output()
  public eventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    public navCtrl: NavController, 
    private router: Router,
    private authService: AuthService,
    public alertController: AlertController,
    private loading: LoadingService
  ) {}

  async helpModal() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ajuda',
      message: 'Primeiro, selecione um bairro para visualizar as notificações.<br>As notificações estão classificadas da seguinte forma:<br>'
        + '<b>Gravidade: </b>Alta (vermelho), Média (amarelo), Baixa (verde).<br>'
        + '<b>Categorias: </b>Acidente, Desastre, Aviso, Informativo.<br>'
        + '<b>Satus: </b>Encerrada ou Em Aberto.',
      buttons: ['OK']
    });

    await alert.present();
  }

  logout() {
    this.authService.deleteAuthData().then(() => {
      this.router.navigateByUrl('/');
    }, error => {
      console.log(error);
    });
  }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sair',
      message: 'Deseja mesmo sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }
}
